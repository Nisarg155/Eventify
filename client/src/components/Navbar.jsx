import {Avatar, Button, Dropdown, Modal, Navbar} from "flowbite-react";
import {Link, useNavigate} from "react-router-dom";
import {getAuth, signInWithPopup, GoogleAuthProvider, signOut, getAdditionalUserInfo} from "firebase/auth";
import app from "../firebaseconfig.jsx";
import {useDispatch} from "react-redux";
import {AddUser, RemoveUser, UpdateUser} from "../redux/reducers/UserSlice.jsx";
import EventifyLOGO from '../assets/backgroundRemoved.png'
import UserLogo from '../assets/user.png'
import {useSelector} from "react-redux";
import {toast} from "react-toastify"
import {useState} from "react";
import {UserDetailsPopup} from "./popup-modal/UserDetailsPopup.jsx";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();


export default function Nav_Bar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user)
    const [openModal, setOpenModal] = useState(false)

    const get_user = async (email, photo) => {
        try {
            const res = await fetch(`https://eventify-backend-beryl.vercel.app/api/login/signin/${email}`);
            if (res.status === 200) {
                const data = await res.json();
                dispatch(UpdateUser({
                    name: data.name,
                    email: data.email,
                    branch: data.branch,
                    collageid: data.collageid,
                    photo,
                    token: data.token,
                    access_level: data.access_level,
                }));
            }
        } catch (e) {
            toast.error(e.message);
            handleSignOut();
        }
    };

    const org_find = async (email, photo) => {
        try {
            const res = await fetch(`https://eventify-backend-beryl.vercel.app/api/login/check/organization/${email}`);
            if (res.status === 200) {
                const value = await res.json();
                dispatch(UpdateUser({
                    name: value.name,
                    email: value.email,
                    photo,
                    token: value.token,
                    access_level: value.access_level,
                }));
                return true;
            } else if (res.status === 204) {
                return false;
            } else throw new Error("Organization check failed");
        } catch (e) {
            toast.error(e.message);
            handleSignOut();
            return false;
        }
    };

    // function to make a request to create a new user
    const set_user = async (data) => {
        const res = await fetch(`https://eventify-backend-beryl.vercel.app/api/login/signup`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,
                name: data.name,
                branch: data.branch,
                collageid: data.collageid,
            })
        })
        if (!res.ok) {
            toast.error(res.statusText);
            handleSignOut();
            return;
        }
        res.json().then(
            (data) => {
                setOpenModal(false)
                const tempuser = {
                    email: data.email,
                    name: data.name,
                    collageid: data.collageid,
                    branch: data.branch,
                    token: data.token,
                    photo: user.photo,
                    access_level: data.access_level,
                }
                dispatch(UpdateUser(tempuser));
            }
        )
    }

    const handleSignOut = async () => {
        await signOut(auth).then(() => {
            navigate('/')
            dispatch(RemoveUser(null))
        });
    }
    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const basicUser = {
                name: result.user.displayName,
                photo: result.user.photoURL,
                email: result.user.email,
            };
            dispatch(AddUser(basicUser));

            const additionalInfo = getAdditionalUserInfo(result);
            const isNewUser = additionalInfo?.isNewUser;

            // Make org and user fetch in parallel
            const [orgRes, userRes] = await Promise.all([
                org_find(basicUser.email, basicUser.photo),
                isNewUser ? Promise.resolve(null) : get_user(basicUser.email, basicUser.photo),
            ]);

            if (!orgRes && isNewUser) {
                setOpenModal(true);
            }

            // Set auto-logout timer
            setTimeout(handleSignOut, 500000);
        } catch (error) {
            toast.error(error.code || "Google Sign-In Failed", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };



    return (
        <div>
            {/*UserDetails Modal*/}
            {
                user ?
                    <Modal show={openModal} size="md" popup>
                        <Modal.Header/>
                        <Modal.Body>
                            <form onSubmit={(event) => {
                                event.preventDefault()
                                const formData = new FormData(event.target)
                                const data = {
                                    email: user.email,
                                    name: formData.get('name'),
                                    branch: formData.get('branch'),
                                    collageid: formData.get('collageid'),
                                }
                                if (formData.get('branch') === 'none') {
                                    toast.error("Please Select Branch", {
                                        autoClose: 3000
                                    });
                                    return;
                                }
                                set_user(data)
                            }}>
                                <UserDetailsPopup
                                    name={user.name}
                                />
                            </form>

                        </Modal.Body>
                    </Modal> : null
            }


            <Navbar fluid rounded>
                <Navbar.Brand as={Link} to='/'>
                    <img src={EventifyLOGO} className="mr-3 h-12 xl:h-12" alt="Eventify"/>
                    <span className="self-center whitespace-nowrap text-5xl font-semibold dark:text-white">Eventify</span>
                </Navbar.Brand>

                {
                    user ? (
                        <div className="flex md:order-2">
                            <Dropdown
                                arrowIcon={false}
                                inline
                                label={<Avatar alt={"img"} img={user.photo}

                                               style={{backgroundImage: `url(${UserLogo})`}} rounded/>}
                            >
                                <Dropdown.Header>
                                    <span className="block text-lg">{user.name}</span> <span
                                    className="block truncate text-lg font-medium">{user.email}</span>
                                </Dropdown.Header>

                                <Dropdown.Divider/>
                                <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
                            </Dropdown>
                            <Navbar.Toggle/>
                        </div>
                    ) : (
                        <Button className={'flex md:order-2'} onClick={handleGoogleSignIn} gradientMonochrome="info"
                                size={'sm'} pill>Sign in</Button>
                    )
                }

                {
                    user ? (
                        <Navbar.Collapse>
                            <Link to='/'>
                                <span className="text-lg text-cyan-600  ">Home</span>
                            </Link>
                            <Link to='/events'>
                                <span className="text-lg text-cyan-600">Events</span>
                            </Link>
                            {
                                user.access_level === 'Administrator' ? <Link to='/user'>
                                    <span className="text-lg text-cyan-600">Users</span>
                                </Link> : null
                            }
                        </Navbar.Collapse>
                    ) : null
                }
            </Navbar>

        </div>

    );
}

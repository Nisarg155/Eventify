import {Avatar, Button, Dropdown, Modal, Navbar} from "flowbite-react";
import {Link} from "react-router-dom";
import {getAuth, signInWithPopup, GoogleAuthProvider, signOut, getAdditionalUserInfo} from "firebase/auth";
import app from "../firebaseconfig.jsx";
import {useDispatch} from "react-redux";
import {AddUser, RemoveUser} from "../redux/reducers/UserSlice.jsx";
import CSILOGO from '../assets/logo.png'
import UserLogo from '../assets/user.png'
import {useSelector} from "react-redux";
import {toast, ToastContainer} from "react-toastify"
import {useState} from "react";
import {UserDetailsPopup} from "./popup-modal/UserDetailsPopup.jsx";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function Nav_Bar() {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user)
    const [openModal, setOpenModal] = useState(false)

    const get_user = async (email) => {
        const res = await fetch(`http://localhost:5000/api/login/signin`, {
            method: "GET",
            body: JSON.stringify({
                email: email,
            })
        }).then((res) => {
            console.log(res)
        })

    }
    const handleSignOut = async () => {
        await signOut(auth).then(() => {
            dispatch(RemoveUser(null))
        });
    }
    const handleGoogleSignIn = async () => {
        await signInWithPopup(auth, provider)
            .then((result) => {
                const user = {
                    name: result.user.displayName,
                    number: result.user.phoneNumber,
                    photo: result.user.photoURL,
                    email: result.user.email
                }

                const additionalUserInfo = getAdditionalUserInfo(result);
                const isNewUser = additionalUserInfo.isNewUser;
                if (isNewUser) {
                    setOpenModal(true)
                } else {
                    get_user(result.user.email)
                }


                dispatch(AddUser(user))
                toast.success(
                    `Welcome Back , ${result.user.displayName}`
                    ,
                    {
                        position: "top-right",
                        draggable: true,
                        autoClose: 3000
                    }
                )
                const timeout = setTimeout(() => {
                    handleSignOut();
                }, 300000);

                return () => clearTimeout(timeout);
            })
            .catch((error) => {
                toast.error(error.code,
                    {
                        position: "top-right",
                        draggable: true,
                        autoClose: 3000
                    });
            });
    }


    return (
        <div>
            {/*UserDetails Modal*/}
            {
                <Modal show={openModal} size="md" popup>
                    <Modal.Header/>
                    <Modal.Body>
                        <form onSubmit={(event) => {
                            event.preventDefault()
                            const data = new FormData(event.target)
                            if (data.get('branch') === 'none') {
                                toast.error("Please Select Branch", {
                                    autoClose: 3000
                                });
                                return;
                            }
                        }}>
                            <UserDetailsPopup
                                name={'nisarg'}
                            />
                        </form>

                    </Modal.Body>
                </Modal>
            }


            <Navbar fluid rounded>
                <Navbar.Brand as={Link} to='/'>
                    <img src={CSILOGO} className="mr-3 h-12 xl:h-12" alt="CSI"/>
                    <span className="self-center whitespace-nowrap text-5xl font-semibold dark:text-white">CSI</span>
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
                                <Dropdown.Item as={Link} to='/dashboard'>Dashboard</Dropdown.Item>
                                <Dropdown.Item as={Link} to='/settings'>Settings</Dropdown.Item>
                                <Dropdown.Item as={Link} to='/earnings'>Earnings</Dropdown.Item>
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
                                <span className="text-lg text-blue-600">Home</span>
                            </Link>
                            <Link to='/events'>
                                <span className="text-lg text-blue-600">Events</span>
                            </Link>
                            <Link to='/Profile'>
                                <span className="text-lg text-blue-600">Profile</span>
                            </Link>
                        </Navbar.Collapse>
                    ) : null
                }
            </Navbar>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="light"
                transition: Bounce
            />
        </div>

    );
}

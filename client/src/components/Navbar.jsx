import {Avatar, Button, Dropdown, Navbar} from "flowbite-react";
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import app from "../firebaseconfig.jsx";
import { useDispatch } from "react-redux";
import { AddUser, RemoveUser } from "../redux/reducers/UserSlice.jsx";
import CSILOGO from '../assets/logo.png'
import UserLogo from '../assets/user.png'
import { useSelector } from "react-redux";
import {toast, ToastContainer} from "react-toastify"
import * as url from "node:url";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function Nav_Bar() {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user)
    console.log(user)

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

                dispatch(AddUser(user))
                toast.success(
                    `Welcome Back , ${result.user.displayName }`
                    ,
                    {
                        position:"top-center",
                        draggable:true,
                        autoClose:4000
                    }
                )
                const timeout = setTimeout(() => {
                    handleSignOut();
                }, 300000);

                return () => clearTimeout(timeout);
            })
            .catch((error) => {
                toast.error(error.code ,
                    {
                        position:"top-center",
                        draggable:true,
                        autoClose:5000
                    });
            });
    }



    return (
        <div>

        <Navbar fluid rounded >
            <Navbar.Brand as={Link} to='/'>
                <img src={CSILOGO} className="mr-3 h-12 xl:h-12" alt="CSI" />
                <span className="self-center whitespace-nowrap text-5xl font-semibold dark:text-white">CSI</span>
            </Navbar.Brand>

            {
                user ? (
                    <div className="flex md:order-2">
                        <Dropdown
                            arrowIcon={false}
                            inline
                            label={<Avatar alt={"img"} img={user.photo}

                                    style={{ backgroundImage:`url(${UserLogo})` }}       rounded />}
                        >
                            <Dropdown.Header>
                                <span className="block text-lg">{user.name}</span> <span className="block truncate text-lg font-medium">{user.email}</span>
                            </Dropdown.Header>
                            <Dropdown.Item as={Link} to='/dashboard'>Dashboard</Dropdown.Item>
                            <Dropdown.Item as={Link} to='/settings'>Settings</Dropdown.Item>
                            <Dropdown.Item as={Link} to='/earnings'>Earnings</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
                        </Dropdown>
                        <Navbar.Toggle />
                    </div>
                ) : (
                    <Button className={'flex md:order-2'} onClick={handleGoogleSignIn} gradientMonochrome="info" size={'sm'} pill>Sign in</Button>
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
            <ToastContainer/>
        </div>

    );
}

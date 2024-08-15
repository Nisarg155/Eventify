import {useState, useEffect} from "react";
import {useSelector} from "react-redux";
// import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { qrcodeGenerator } from "react-easy-qrcode-generator";
import CSILogo from '../assets/logo.png';
import GradualSpacing from "../components/magicui/gradual-spacing.jsx";

export default function Home() {
    const user = useSelector((state) => state.user);
    const [qrGenerated, setQrGenerated] = useState(false);


    useEffect(() => {
        if (!qrGenerated) {
            setQrGenerated(true)
        }
    }, []);

    return (
        <div className="text-center pb-12 md:pb-16 flex flex-col justify-center items-center min-h-screen">
            {user  ? (
                <>


                    {/* Your user welcome back section */}
                    {/*<img alt={"img"} style={{ backgroundImage : 'url(/src/assets/user.png)'}} src={user.photo} className={'h-36 mb-4 rounded-full'} />*/}

                    <h1 className="text-5xl md:text-8xl font-extrabold leading-tighter tracking-tighter mb-4"
                        data-aos="zoom-y-out"><span
                        className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-400"> <br/>{user.name}</span>
                    </h1>
                </>
            ) : (
                <>
                    {/* Your sign in section */}
                    <img src={CSILogo} alt={'CSI LOGO'} className={'mb-4 -mt-40'}/>
                    <GradualSpacing
                        className="text-5xl md:text-8xl font-extrabold leading-tighter tracking-tighter mb-3"
                        text="CSI DDU,"
                        duration={1}
                    />
                    <h1 className="text-5xl md:text-8xl font-extrabold leading-tighter tracking-tighter mb-4"
                        data-aos="zoom-y-out"><span
                        className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-400"> Welcomes You</span>
                    </h1>
                    <h3 className="text-5xl md:text-8xl font-extrabold leading-tighter tracking-tighter mb-4">Please
                        Sign in
                        to Continue</h3>


                </>
            )}
        </div>
    );
}
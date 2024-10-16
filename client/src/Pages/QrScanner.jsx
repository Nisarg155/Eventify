import {useEffect, useRef, useState} from "react";
import "./QrStyle.css";
import QrScanner from "qr-scanner";
import QrFrame from '../assets/qr-frame.svg'
import {Button} from "flowbite-react";
import { FaRegStopCircle } from "react-icons/fa";
import { BsQrCodeScan } from "react-icons/bs";
import { ImExit } from "react-icons/im";


const QrReader = (props) => {
    const scanner = useRef(null);
    const videoEl = useRef(null);
    const qrBoxEl = useRef(null);
    const [qrOn, setQrOn] = useState(true);
    const [qrError, setQrError] = useState(null)

    const onScanSuccess = (result) => {

        setQrError(null)
        // eslint-disable-next-line react/prop-types
        props.setQrData(result.data)
        scanner.current?.stop();
        // eslint-disable-next-line react/prop-types
        props.setScanEnabled(false);
        // eslint-disable-next-line react/prop-types
        props.setOpenModal(true)
    };

    const onScanFail = (err) => {
        if (qrError === null) {
            console.log(err);
            setQrError(err)
        }

    };

    useEffect(() => {
        if (videoEl.current && !scanner.current) {
            scanner.current = new QrScanner(videoEl.current, onScanSuccess, {
                onDecodeError: onScanFail,
                preferredCamera: "environment",
                highlightScanRegion: true,
                highlightCodeOutline: true,
                overlay: qrBoxEl.current || undefined,
            });

            scanner.current
                .start()
                .then(() => setQrOn(true))
                .catch((err) => {
                    console.error(err);
                    setQrOn(false);
                });
        }

        return () => {
            scanner.current?.stop();
        };
    }, []);

    useEffect(() => {
        if (!qrOn) {
            alert("Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload.");
        }
    }, [qrOn]);

    return (
        <div  >
            <video ref={videoEl}></video>

            <div ref={qrBoxEl} className="qr-box">
                <img src={QrFrame} alt="Qr Frame" width={300} height={300} className="qr-frame"/>
            </div>
            <div className={'justify-center mb-2 mt-2'}>
                {qrError && (
                    <p style={{color: "red"}}>
                        {qrError}
                    </p>
                )}
            </div>
            <div className={'flex flex-wrap justify-evenly'}>
                <Button className={'shadow'} style={{ borderRadius:10 }} onClick={() => {
                    scanner.current?.start()
                }} >
                    <BsQrCodeScan className={'mr-2 h-4 w-4'}/>
                    Scan
                </Button>
                <Button color={'failure'} className={'shadow'} style={{ borderRadius:10 }} onClick={() => {
                    scanner.current?.stop()
                }}>
                    <FaRegStopCircle className={'mr-2 h-5 w-5'} />
                    Stop
                </Button>
                <Button color={'failure'} className={'shadow'} style={{ borderRadius:10 }} onClick={() => {
                    scanner.current?.stop()
                    // eslint-disable-next-line react/prop-types
                    props.setScanEnabled(false)
                }}>
                    <ImExit className={'mr-2 h-5 w-5'} />
                    Exit
                </Button>
            </div>
        </div>
    );
};

export default QrReader;

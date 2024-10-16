import {useEffect, useRef, useState} from "react";
import "./QrStyle.css";
import QrScanner from "qr-scanner";
import QrFrame from '../assets/qr-frame.svg'

const QrReader = (props) => {
    const scanner = useRef(null);
    const videoEl = useRef(null);
    const qrBoxEl = useRef(null);
    const [qrOn, setQrOn] = useState(true);
    const [qrError, setQrError] = useState(null)

    const onScanSuccess = (result) => {
        console.log(result);
        // eslint-disable-next-line react/prop-types
        props.setQrData(result.data)
        scanner.current?.stop();
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
        <div className="qr-reader">
            <video ref={videoEl}></video>
            <div ref={qrBoxEl} className="qr-box">
                <img src={QrFrame} alt="Qr Frame" width={256} height={256} className="qr-frame"/>
            </div>
            <div>
                {qrError && (
                    <p style={{color: "red"}}>
                        {qrError}
                    </p>
                )}
            </div>
        </div>
    );
};

export default QrReader;

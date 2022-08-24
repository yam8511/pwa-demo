import { useState, useEffect, useCallback, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import Webcam from "react-webcam";
import { isMobile } from 'react-device-detect';
import { useWindowSize } from '@react-hook/window-size'


const MyOCR = () => {
    const webcamRef = useRef(null);
    const [pic, setPic] = useState()
    const [deviceId, setDeviceId] = useState();
    const [devices, setDevices] = useState([]);
    const [width, height] = useWindowSize()

    const handleDevices = useCallback(
        mediaDevices => {
            const videos = mediaDevices.filter(({ kind }) => kind === "videoinput")
            // const videos = mediaDevices
            setDevices(videos)
            // console.log(videos)
        },
        [setDevices]
    );

    useEffect(
        () => {
            navigator.mediaDevices.enumerateDevices().then(handleDevices);
        },
        [handleDevices]
    );

    const capture = useCallback(
        async () => {
            // console.log(webcamRef.current)
            const imageSrc = webcamRef.current.getScreenshot();
            setPic(imageSrc)
            const res = await fetch('/api/ocr', {
                method: 'POST',
                body: imageSrc
            })
            // console.log('res => ', res)

            const resultSrc = await res.text()
            setPic(resultSrc)
            // console.log('resultSrc => ', resultSrc)
        },
        [webcamRef]
    );

    // 如果橫豎，使用高度
    // 如果直立，使用寬度
    let cameraStyle = {}
    if (isMobile) {
        if (width < height) { // 直立
            cameraStyle = { width }
        } else {
            cameraStyle = { height: height - 36 }
        }
    } else {
        cameraStyle = {
            width: "-webkit-fill-available",
            maxHeight: height - 36
        }
    }

    return (
        <div className="">
            {
                deviceId ?
                    <div>
                        {
                            pic ?
                                // 結果圖
                                <div className="w3-display-container w3-center" onClick={() => setPic()}>
                                    <img src={pic}
                                        alt="Result"
                                        style={cameraStyle}
                                    />
                                    <div className="w3-padding w3-display-middle w3-display-hover">
                                        <FontAwesomeIcon className="icon w3-xxxlarge w3-text-yellow" icon={faRotateLeft} />
                                    </div>
                                </div>
                                :
                                // 開鏡頭
                                <div className="w3-display-container w3-center" onClick={capture}>
                                    <Webcam
                                        style={cameraStyle}
                                        ref={webcamRef}
                                        screenshotQuality={1}
                                        screenshotFormat="image/jpeg"
                                        videoConstraints={deviceId}
                                    />
                                    <div className="w3-padding w3-display-middle w3-display-hover">
                                        <FontAwesomeIcon className="icon w3-xxxlarge w3-text-yellow" icon={faCamera} />
                                    </div>
                                </div>
                        }
                    </div> : ''
            }

            {
                /* 偵測可用鏡頭 */
                <div className="w3-margin" >
                    {devices.map((dev, i) => (
                        <div key={`device_${i + 1}`} onClick={() => setDeviceId(dev)}>
                            <input key={dev.deviceId}
                                className="w3-radio"
                                type="radio"
                                name="device"
                                value={dev.deviceId}
                                defaultChecked={deviceId && dev.deviceId === deviceId.deviceId}
                            />
                            <label> {dev.label} </label>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}


export default MyOCR

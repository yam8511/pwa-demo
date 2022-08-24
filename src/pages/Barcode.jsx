import React, { useState } from 'react';
import {
    Barcode,
    BarcodePicker,
    Camera,
    ScanSettings,
    SingleImageModeSettings,
} from "scandit-sdk";
import ScanditBarcodeScanner from "scandit-sdk-react";
import licenseKey from '../license'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons'

const getScanSettings = () => {
    return new ScanSettings({
        enabledSymbologies: [
            Barcode.Symbology.QR,
            Barcode.Symbology.EAN8,
            Barcode.Symbology.EAN13,
            Barcode.Symbology.CODE128,
        ],
        maxNumberOfCodesPerFrame: 10
    });
};

const getSingleImageModeSettings = () => {
    return {
        desktop: {
            usageStrategy: SingleImageModeSettings.UsageStrategy.FALLBACK,
        },
        mobile: {
            usageStrategy: SingleImageModeSettings.UsageStrategy.FALLBACK,
        },
    };
};


const MyBarcode = () => {
    const [scannerReady, setScannerReady] = useState(false);
    const [scannerPause, setScannerPause] = useState(true);
    const [scannerError, setScannerError] = useState();
    const [codeData, setCodeData] = useState();

    const saveCodeData = scanResult => {
        console.log(scanResult)
        setCodeData(scanResult.barcodes)
        const req = []
        for (const code of scanResult.barcodes) {
            req.push({
                'data': code.data,
                'kind': code.symbology,
            })
        }

        fetch('/api/barcode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        })
    }

    return (
        <div className="">
            {codeData ? (
                <div className="w3-margin-bottom">
                    <ul className="w3-ul">
                        {codeData.map((item, i) => (
                            <li key={`code_${i + 1}`}>{item.data}  ({item.symbology})</li>
                        ))}
                    </ul>
                </div>
            ) : ''}

            {
                scannerError ?
                    <h2 className="w3-red"> {scannerError} </h2>
                    :
                    (
                        <div>
                            {!scannerReady ? <h2>Loading ...</h2> : ''}
                            {
                                <div className="w3-display-container" onClick={() => setScannerPause(!scannerPause)}>
                                    <ScanditBarcodeScanner
                                        licenseKey={licenseKey}
                                        engineLocation="https://cdn.jsdelivr.net/npm/scandit-sdk@5.x/build"
                                        preloadBlurryRecognition={true}
                                        preloadEngine={true}
                                        onReady={() => setScannerReady(true)}
                                        onScan={saveCodeData}
                                        onScanError={(e) => {
                                            console.warn('onScanError ==> ', e)
                                            setScannerError(e)
                                        }}
                                        // onSubmitFrame={(e) => console.log('onSubmitFrame ==> ', e)}
                                        // onProcessFrame={(e) => console.log('onProcessFrame ==> ', e)}
                                        scanSettings={getScanSettings()}
                                        paused={scannerPause}
                                        accessCamera={!scannerPause}
                                        camera={undefined}
                                        cameraSettings={undefined}
                                        enableCameraSwitcher={true}
                                        enablePinchToZoom={true}
                                        enableTapToFocus={true}
                                        enableTorchToggle={true}
                                        guiStyle={BarcodePicker.GuiStyle.VIEWFINDER}
                                        laserArea={{ x: 0, y: 0, width: 1, height: 1 }}
                                        playSoundOnScan={true}
                                        targetScanningFPS={30}
                                        vibrateOnScan={false}
                                        videoFit={BarcodePicker.ObjectFit.CONTAIN}
                                        visible={true}
                                        viewfinderArea={{ x: 0, y: 0, width: 1, height: 1 }}
                                        zoom={0}
                                        // only set on component creation, can not be changed afterwards
                                        cameraType={Camera.Type.BACK}
                                        singleImageModeSettings={getSingleImageModeSettings()}
                                    />
                                    <div className="w3-padding w3-display-middle w3-display-hover">
                                        {
                                            scannerPause ?
                                                <FontAwesomeIcon className="icon w3-xxxlarge w3-text-yellow" icon={faPlay} />
                                                :
                                                <FontAwesomeIcon className="icon w3-xxxlarge w3-text-yellow" icon={faPause} />
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                    )
            }
        </div>
    );
}


export default MyBarcode

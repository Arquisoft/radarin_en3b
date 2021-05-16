/* eslint-disable react/prop-types */
import keypair from "keypair";
import QRCode from "react-qr-code";
import { useSession } from "@inrupt/solid-ui-react";
import "../css/QRPage.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { manageKeys, setPair } from "../redux/slices/keysSlice";
import { Button, Typography } from "@material-ui/core";
import Mobile from "../img/mobile.png";
const NodeRSA = require("node-rsa");

export default function QRPage(props) {
    let { session } = useSession();
    if (typeof props.sess !== "undefined") { session = props.sess; }

    const { webId } = session.info;
    const dispatch = useDispatch();
    const status = useSelector((state) => state.keys.status);
    const error = useSelector((state) => state.keys.error);
    const lePair = useSelector((state) => state.keys.pair);
    const [showQR, setShowQR] = useState(false);

    const show = () => {
        setShowQR(true);
    };

    let content;

    useEffect(() => {
        if (status === "idle") {
            dispatch(setPair(keypair({ bits: 2048 })));
            dispatch(manageKeys(session));
        }
    });

    if (!showQR) {

        content = (
            <div className="alignTitle">
                <Typography variant="h3" component="h3" className="text-white">
                    Scan the next QR from the mobile application to get started!
            </Typography>
                <Typography className="mt-4 text-white">
                    Once you open the mobile application, press on scan and the camera will pop up. Point it to the QR for logging into the mobile application.
            </Typography>
                <img src={Mobile} alt="qr login step 1" className="image" />
                <div className="button">
                    <Button color="primary" variant="contained" onClick={show}>Show QR</Button>
                </div>
            </div>
        );
    } else {
        if (status === "loading" || status === "idle") {
            content = (
                <div className="spinner-border centerSpinner" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            );

        } else if (status === "succeeded") {
            const k = new NodeRSA(lePair.private);
            const privateKey = k.exportKey("pkcs8-private-pem");
            const vvalue = JSON.stringify({ webId, privateKey });
            content = <div className="centerMe"><QRCode
                level="L"
                size={700}
                value={vvalue}
            /></div>;

        } else if (status === "failed") {
            content = <div className="centerMe">{error}</div>;
        }
    }

    return <div>{content}</div>;
}
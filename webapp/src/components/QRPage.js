import keypair from 'keypair';
import QRCode from 'react-qr-code';
import React, { useState } from 'react';
import { useSession } from "@inrupt/solid-ui-react";
import {
    getSolidDataset,
    getThing,
    setStringNoLocale,
    setThing,
    saveSolidDatasetAt,
} from "@inrupt/solid-client";
import { fetch } from "@inrupt/solid-client-authn-browser";
import { VCARD } from "@inrupt/vocab-common-rdf";
import { Button } from "@material-ui/core";
import "../css/QRPage.css";

export default function QRPage() {
    const { session } = useSession();
    const { webId } = session.info;
    const [showQR, setShowQR] = useState(false);


    const [pair] = useState(() => {
        const pair = keypair({ bits: 1024 });
        return pair;
    });

    const privateKey = pair.private;
    const publicKey = pair.public;



    function logKey() {
        getSolidDataset(webId.split("#")[0], { fetch: fetch }).then((response) => {
            const profile = getThing(response, webId);
            let updatedProfile = setStringNoLocale(profile, VCARD.key, publicKey);
            console.log(publicKey);
            const myChangedDataset = setThing(response, updatedProfile);
            saveSolidDatasetAt(webId.split("#")[0], myChangedDataset, { fetch: fetch }).then(() => {
                setShowQR(true);
            });
        });
    }


    if (showQR) {
        return (<div className="centerMe"><QRCode
            level="Q"
            size={512}
            value={JSON.stringify({
                webId,
                privateKey
            })}
        /></div>);
    }

    return (<div className="centerMe"><Button color="primary" variant="contained" onClick={logKey}>Press me</Button></div>);
}
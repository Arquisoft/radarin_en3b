import keypair from 'keypair';
import forge from 'node-forge';
import QRCode from 'react-qr-code';
import React, { useEffect, useState } from 'react';
import { useSession } from "@inrupt/solid-ui-react";
import {
    getSolidDataset,
    getThing,
    setStringNoLocale,
    addStringNoLocale,
    setThing,
    saveSolidDatasetAt,
} from "@inrupt/solid-client";
import { fetch } from "@inrupt/solid-client-authn-browser";
import { FOAF, VCARD } from "@inrupt/vocab-common-rdf";

export default function QRPage() {
    const { session } = useSession();
    const { webId } = session.info;


    const [pair, setPair] = useState(() => {
        const pair = keypair({ bits: 1024 });
        console.log("done1");
        return pair;
    });





    const privateKey = pair.private;
    const publicKey = pair.public;

    getSolidDataset(webId.split("#")[0], { fetch: fetch }).then((response) => {
        const profile = getThing(response, webId);
        let updatedProfile = setStringNoLocale(profile, VCARD.key, publicKey);
        console.log(publicKey);
        const myChangedDataset = setThing(response, updatedProfile);
        const savedDataset = saveSolidDatasetAt(webId.split("#")[0], myChangedDataset, { fetch: fetch });
    });


    return <QRCode className="ml-5"
        level="Q"
        style={{ width: 256 }}
        value={JSON.stringify({
            webId,
            privateKey
        })}
    />;
}
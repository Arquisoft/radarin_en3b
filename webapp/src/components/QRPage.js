import keypair from 'keypair';
import forge from 'node-forge';
import QRCode from 'react-qr-code';
import React, { useEffect, useState } from 'react';
import { useSession } from "@inrupt/solid-ui-react";

export default function QRPage() {
    const { session } = useSession();
    const { webId } = session.info;
    const [privateKey, setPrivateKey] = useState(()=>{
        const pair = keypair({ bits: 1024 });
        return pair.private;
    });
    return <QRCode
        level="Q"
        style={{ width: 256 }}
        value={JSON.stringify({
            webId,
            privateKey
        })}
    />;
}
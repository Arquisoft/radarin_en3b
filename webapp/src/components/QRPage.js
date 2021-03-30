import keypair from 'keypair';
import QRCode from 'react-qr-code';
import { useSession } from "@inrupt/solid-ui-react";
import "../css/QRPage.css";
import { getSolidDataset, getThing, getUrlAll, getSourceUrl, setStringNoLocale, setThing, saveSolidDatasetAt } from "@inrupt/solid-client";
import React, { useEffect, useState } from "react";
import getOrCreatePublicFilePod from "../utils/GetOrCreatePublicFilePod";
import getOrCreatePrivateFilePod from "../utils/getOrCreatePrivateFilePod";
import { Button } from "@material-ui/core";

export default function QRPage() {
    const { session } = useSession();
    const { webId } = session.info;
    const [showQR, setShowQR] = useState(false);
    const [pKeyFile, setPKeyFile] = useState();
    const [prKeyFile, setPrKeyFile] = useState();


    const [pair] = useState(() => {
        const pair = keypair({ bits: 1024 });
        return pair;
    });

    const privateKey = pair.private;
    const publicKey = pair.public;

  useEffect(() => {
    if (!session) return;
    (async () => {
      const profileDataset = await getSolidDataset(session.info.webId, {
        fetch: session.fetch,
      });
      const profileThing = getThing(profileDataset, session.info.webId);
      const podsUrls = getUrlAll(
        profileThing,
        "http://www.w3.org/ns/pim/space#storage"
      );
      const pod = podsUrls[0];
      const containerUri = `${pod}public/RadarinPKey/`;
      const dataset = await getOrCreatePublicFilePod(containerUri, session.fetch);
      setPKeyFile(dataset);

      const privateContainerUri = `${pod}private/RadarinPrKey/`;
      const dataset2 = await getOrCreatePrivateFilePod(privateContainerUri, session.fetch);
      setPrKeyFile(dataset2);
    })();
  }, [session]);


  const addPublicKey = async () => {
    const pKeyUrl = getSourceUrl(pKeyFile);
    const publicDataset = await getSolidDataset(pKeyUrl.split("publicKey")[0], { fetch: session.fetch });
    const existing = getThing(publicDataset, pKeyUrl);
    console.log(existing);

    const pkField = setStringNoLocale(existing, "https://www.w3.org/ns/auth/cert#RSAPublicKey", publicKey);

    const updatedPKeyFile = setThing(pKeyFile, pkField);
    const updatedDataset = await saveSolidDatasetAt(pKeyUrl, updatedPKeyFile, { fetch: session.fetch });

    setPKeyFile(updatedDataset);
  };

  const addPrivateKey = async () => {
    const prKeyUrl = getSourceUrl(prKeyFile);
    const publicDataset = await getSolidDataset(prKeyUrl.split("privateKey")[0], { fetch: session.fetch });
    const existing = getThing(publicDataset, prKeyUrl);
    console.log(existing);

    const prKField = setStringNoLocale(existing, "https://www.w3.org/ns/auth/cert#PrivateKey", privateKey);
    const updatedPrKeyFile = setThing(prKeyFile, prKField);
    const updatedDataset = await saveSolidDatasetAt(prKeyUrl, updatedPrKeyFile, { fetch: session.fetch });

    setPrKeyFile(updatedDataset);
  };


  const handleOnClick = async (event) => {
      event.preventDefault();
      addPublicKey();
      addPrivateKey();
      //We should wait until prKeyUrl and pKeyUrl are not null
      setShowQR(true);
  };


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

  return <div className="centerMe"><Button color="primary" variant="contained" onClick={handleOnClick}>Show QR</Button></div>;
}
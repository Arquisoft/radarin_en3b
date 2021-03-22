import { getSolidDataset, getThing, getUrlAll, getSourceUrl, createThing, addStringNoLocale, setThing, saveSolidDatasetAt } from "@inrupt/solid-client";
import { useSession } from "@inrupt/solid-ui-react";
import React, { useEffect, useState } from "react";
import getOrCreatePublicFilePod from "../utils/GetOrCreatePublicFilePod";
import getOrCreatePrivateFilePod from "../utils/getOrCreatePrivateFilePod";
import { Button } from "@material-ui/core";

export default function AddKeyFiles({pKey}, {prKey}) {
  const { session } = useSession();
  const [pKeyFile, setPKeyFile] = useState();
  const [prKeyFile, setPrKeyFile] = useState();

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
      const containerUri = `${pod}RadarinPKey/`;
      const dataset = await getOrCreatePublicFilePod(containerUri, session.fetch);
      setPKeyFile(dataset);

      const privateContainerUri = `${pod}private/RadarinPrKey/`;
      const dataset2 = await getOrCreatePrivateFilePod(privateContainerUri, session.fetch);
      setPrKeyFile(dataset2);
    })();
  }, [session]);


  const addPublicKey = async () => {
    const pKeyUrl = getSourceUrl(pKeyFile);
    const pkField = addStringNoLocale(createThing(), "https://www.w3.org/ns/auth/cert#RSAPublicKey", pKey);

    const updatedPKeyFile = setThing(pKeyFile, pkField);
    const updatedDataset = await saveSolidDatasetAt(pKeyUrl, updatedPKeyFile, { fetch: session.fetch });

    setPKeyFile(updatedDataset);
  };

  const addPrivateKey = async () => {
      console.log(prKey);
    const prKeyUrl = getSourceUrl(prKeyFile);
    const prKField = addStringNoLocale(createThing(), "https://www.w3.org/ns/auth/cert#PrivateKey", prKey);

    const updatedPrKeyFile = setThing(prKeyFile, prKField);
    const updatedDataset = await saveSolidDatasetAt(prKeyUrl, updatedPrKeyFile, { fetch: session.fetch });

    setPrKeyFile(updatedDataset);
  };


  const handleOnClick = async (event) => {
      event.preventDefault();
      addPublicKey();
      addPrivateKey();
  };

  return <div className="centerMe"><Button color="primary" variant="contained" onClick={handleOnClick}>Show QR</Button></div>;
}
import { getSolidDataset, getThing, getUrlAll, getSourceUrl, setStringNoLocale, setThing, saveSolidDatasetAt } from "@inrupt/solid-client";
import getOrCreatePublicFilePod from "../utils/GetOrCreatePublicFilePod";
import getOrCreatePrivateFilePod from "../utils/getOrCreatePrivateFilePod";

let privateKey;
let publicKey;
let session;
let pair;

export default async function keyManagement(sessionP, pairP) {
    session = sessionP;
    pair = pairP;
    publicKey = pair.public;
    privateKey = pair.private;
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
    let dataset = await getOrCreatePublicFilePod(containerUri, session.fetch, "publicKey.ttl");

    if(dataset?.error === "error")
    {dataset = dataset.res;}

    const privateContainerUri = `${pod}private/RadarinPrKey/`;
    let dataset2 = await getOrCreatePrivateFilePod(privateContainerUri, session.fetch);

    if(dataset2?.error === "error")
    {dataset2 = dataset2.res;}

    addPublicKey(dataset);
    addPrivateKey(dataset2);
}

async function addPublicKey(pKeyFile) {
    const pKeyUrl = getSourceUrl(pKeyFile);
    const publicDataset = await getSolidDataset(pKeyUrl.split("publicKey")[0], { fetch: session.fetch });
    const existing = getThing(publicDataset, pKeyUrl);

    const pkField = setStringNoLocale(existing, "https://www.w3.org/ns/auth/cert#RSAPublicKey", publicKey);

    const updatedPKeyFile = setThing(pKeyFile, pkField);
    await saveSolidDatasetAt(pKeyUrl, updatedPKeyFile, { fetch: session.fetch });
}

async function addPrivateKey(prKeyFile) {
    const prKeyUrl = getSourceUrl(prKeyFile);
    const publicDataset = await getSolidDataset(prKeyUrl.split("privateKey")[0], { fetch: session.fetch });
    const existing = getThing(publicDataset, prKeyUrl);

    const prKField = setStringNoLocale(existing, "https://www.w3.org/ns/auth/cert#PrivateKey", privateKey);
    const updatedPrKeyFile = setThing(prKeyFile, prKField);
    await saveSolidDatasetAt(prKeyUrl, updatedPrKeyFile, { fetch: session.fetch });
}
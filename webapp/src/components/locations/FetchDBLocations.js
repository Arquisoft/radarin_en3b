import Api from '../../api/API';
import getOrCreatePrivateFilePod from "../../utils/getOrCreatePrivateFilePod";
import { getSolidDataset, getThing, getUrlAll, getSourceUrl, getStringNoLocale } from "@inrupt/solid-client";

export default async function fetchDBLocations(session) {
    const { webId } = session.info;

    const profileDataset = await getSolidDataset(session.info.webId, {
        fetch: session.fetch,
    });
    const profileThing = getThing(profileDataset, session.info.webId);
    const podsUrls = getUrlAll(
        profileThing,
        "http://www.w3.org/ns/pim/space#storage"
    );
    const pod = podsUrls[0];
    const privateContainerUri = `${pod}private/RadarinPrKey/`;
    const prKeyFile = await getOrCreatePrivateFilePod(privateContainerUri, session.fetch);
    const prKeyUrl = getSourceUrl(prKeyFile);
    const publicDataset = await getSolidDataset(prKeyUrl, { fetch: session.fetch });
    const existing = getThing(publicDataset, prKeyUrl);

    //const prKField = setStringNoLocale(existing, "https://www.w3.org/ns/auth/cert#PrivateKey", privateKey);

    const aux = getStringNoLocale(existing, "https://www.w3.org/ns/auth/cert#PrivateKey");
    Api.setIdentity(webId, aux);
    const l = await Api.getLocations();

    return l;
}
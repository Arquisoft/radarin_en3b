import { getSolidDataset, getThing, getUrlAll, getSourceUrl, getThingAll, getStringNoLocaleAll, removeThing, saveSolidDatasetAt, isThing } from "@inrupt/solid-client";
import getOrCreatePublicFilePod from "../../utils/GetOrCreatePublicFilePod";

export default async function removeLocation(session, title, description) {
    const profileDataset = await getSolidDataset(session.info.webId, {
        fetch: session.fetch,
    });
    const profileThing = getThing(profileDataset, session.info.webId);
    const podsUrls = getUrlAll(
        profileThing,
        "http://www.w3.org/ns/pim/space#storage"
    );
    const pod = podsUrls[0];
    const containerUri = `${pod}public/RadarinLocations_/`;
    const dataset = await getOrCreatePublicFilePod(containerUri, session.fetch, "savedLocations.ttl");

    if(dataset?.error === "error")
        return [];

    const locationsUrl = getSourceUrl(dataset);
    const existing = getThingAll(dataset, locationsUrl);

    let updatedDataset;
    let flag = true;

    existing.forEach(location => {
        const text = getStringNoLocaleAll(location, "http://schema.org/text");

        const name = text[1];
        const details = text[0];

        if(name === title && description === details && flag) {
            updatedDataset = removeThing(dataset, location);
            flag = false;
        }
    }); 
    
    await saveSolidDatasetAt(locationsUrl, updatedDataset, { fetch: session.fetch });
}
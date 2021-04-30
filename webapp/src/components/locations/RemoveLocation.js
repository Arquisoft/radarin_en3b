import { getSolidDataset, getThing, getUrlAll, getSourceUrl, getThingAll, getStringNoLocaleAll, removeThing, saveSolidDatasetAt, deleteFile } from "@inrupt/solid-client";
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
    let photoName = "";

    existing.forEach(location => {
        const text = getStringNoLocaleAll(location, "http://schema.org/text");

        const name = text.filter(t => t.includes("Title:"))[0].split("Title:")[1];
        const details = text.filter(t => t.includes("Desc:"))[0].split("Desc:")[1];

        if(name === title && description === details && flag) {
            photoName = text.filter(t => t.includes("Photo:"))[0].split("Photo:")[1];
            updatedDataset = removeThing(dataset, location);
            flag = false;
        }
    }); 

    if(photoName !== "") {
        await deleteFile(
            `${containerUri}/${photoName}`,
            { fetch: session.fetch },
        );
    }        
    
    await saveSolidDatasetAt(locationsUrl, updatedDataset, { fetch: session.fetch });
}
import { getSolidDataset, getThing, getUrlAll, getSourceUrl, getThingAll } from "@inrupt/solid-client";
import getOrCreatePublicFilePod from "../../utils/GetOrCreatePublicFilePod";

let session;

export default async function FetchPodCreatedLocations(sessionP) {
    session = sessionP;
    const profileDataset = await getSolidDataset(session.info.webId, {
        fetch: session.fetch,
    });
    const profileThing = getThing(profileDataset, session.info.webId);
    const podsUrls = getUrlAll(
        profileThing,
        "http://www.w3.org/ns/pim/space#storage"
    );
    const pod = podsUrls[0];
    const containerUri = `${pod}public/RadarinLocations/`;
    const dataset = await getOrCreatePublicFilePod(containerUri, session.fetch, "savedLocations.ttl");

    if(dataset === "error")
        return [];

    const locationsUrl = getSourceUrl(dataset);
   
    
    const existing = getThingAll(dataset, locationsUrl);

    //console.log(existing);

    return existing;
}
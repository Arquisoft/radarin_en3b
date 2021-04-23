import { getSolidDataset, getThing, getUrlAll, getSourceUrl, getThingAll, getStringNoLocale } from "@inrupt/solid-client";
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

    const photo = getStringNoLocale(existing[3], "http://xmlns.com/foaf/spec/#term_Image");

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const base64Photo = await toBase64(new Blob([JSON.stringify(photo)],{ type: 'application/json'}));
    
    console.log(base64Photo);

    if(existing.length > 0)
        return [];
    else {
        console.log("oops");
        return existing;
    }
}
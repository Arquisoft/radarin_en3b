import {
    getUrlAll,
    getSolidDataset,
    getThing,
    getFile
} from "@inrupt/solid-client";

export default async function fetchPhoto(session, photoId, webId) {
    const profileDataset = await getSolidDataset(webId, {
        fetch: session.fetch,
    });
    const profileThing = getThing(profileDataset, webId);
    const podsUrls = getUrlAll(
        profileThing,
        "http://www.w3.org/ns/pim/space#storage"
    );
    const pod = podsUrls[0];
    const containerUri = `${pod}public/RadarinLocations_/`;
    
    const photo = await getFile(
        `${containerUri}${photoId}`,
        { fetch: session.fetch }
    );

    return photo;
}
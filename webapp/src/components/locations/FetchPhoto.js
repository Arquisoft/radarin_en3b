import {
    getUrlAll,
    getSolidDataset,
    getThing,
<<<<<<< HEAD
    getFile
=======
    getFile,
    getContentType
>>>>>>> 355fe9f8fc0c138c70dbcd1658bb1ec4dd5fccf5
} from "@inrupt/solid-client";

export default async function FetchPhoto(session, photoId) {
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
    
    const photo = await getFile(
        `${containerUri}${photoId}`,
        { fetch: session.fetch }
    )

    return photo;
}
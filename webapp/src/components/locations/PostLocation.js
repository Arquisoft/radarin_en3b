import getOrCreatePublicFilePod from "../../utils/GetOrCreatePublicFilePod";
import {
    getSolidDataset,
    getThing,
    getUrlAll,
    getSourceUrl,
    addDatetime,
    addStringNoLocale,
    createThing,
    setThing,
    saveSolidDatasetAt,
    overwriteFile
} from "@inrupt/solid-client";

export default async function postLocation(session, title, description, photo, coords) {

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

    const photoName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    await overwriteFile(
        `${containerUri}/${photoName}`,
        photo,
        { type: photo.type, fetch: session.fetch },
    );


    const locationsUrl = getSourceUrl(dataset);

    const locationWithDescription = addStringNoLocale(
        createThing(),
        "http://schema.org/text",
        description
    );


    const locationWithTitle = addStringNoLocale(
        locationWithDescription,
        "http://schema.org/text",
        title
    );

    const locationWithPhoto = addStringNoLocale(
        locationWithTitle,
        "http://schema.org/text",
        photoName
    );

    const locationWithCords = addStringNoLocale(
        locationWithPhoto,
        "http://schema.org/text",
        coords
    );

    const locationWithTimestamp = addDatetime(
        locationWithCords,
        "http://www.w3.org/2002/12/cal/ical#created",
        new Date()
    );

    const updatedLocationsList = setThing(dataset, locationWithTimestamp);

    await saveSolidDatasetAt(locationsUrl, updatedLocationsList, { fetch: session.fetch });
}
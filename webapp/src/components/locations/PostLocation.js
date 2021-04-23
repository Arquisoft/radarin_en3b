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
    saveSolidDatasetAt
} from "@inrupt/solid-client";

export default async function postLocation(session, title, description, photo) {
    const reader = new FileReader();
    reader.readAsDataURL(photo);

    reader.onloadend = async function () {
        const base64Photo = reader.result;

        console.log(base64Photo);


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
            base64Photo
        );

        const locationWithTimestamp = addDatetime(
            locationWithPhoto,
            "http://www.w3.org/2002/12/cal/ical#created",
            new Date()
        );

        const updatedLocationsList = setThing(dataset, locationWithTimestamp);

        await saveSolidDatasetAt(locationsUrl, updatedLocationsList, { fetch: session.fetch });

        console.log("done");
    }
}
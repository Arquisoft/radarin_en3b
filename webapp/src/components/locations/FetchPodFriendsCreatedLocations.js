import {
    getSolidDataset,
    getThing,
    getUrlAll,
    getSourceUrl,
    getThingAll,
    getStringNoLocaleAll,
    getDatetime
} from "@inrupt/solid-client";
import getOrCreatePublicFilePod from "../../utils/GetOrCreatePublicFilePod";

async function isMutual(friendId, session) {
    const profileDataset = await getSolidDataset(friendId, {
        fetch: session.fetch,
    });
    const profileThing = getThing(profileDataset, friendId);

    const podsUrls = getUrlAll(
        profileThing,
        "http://xmlns.com/foaf/0.1/knows"
    );

    return podsUrls.includes(session.info.webId);

}

async function fetchFriendLocations(friendId, session, lastId) {
    let createdLocations = [];

    if (await isMutual(friendId, session)) {

        const profileDataset = await getSolidDataset(friendId, {
            fetch: session.fetch,
        });

        const profileThing = getThing(profileDataset, friendId);
        const podsUrls = getUrlAll(
            profileThing,
            "http://www.w3.org/ns/pim/space#storage"
        );
        const pod = podsUrls[0];

        const containerUri = `${pod}public/RadarinLocations_/`;
        const dataset = await getOrCreatePublicFilePod(containerUri, session.fetch, "savedLocations.ttl");

        if (dataset?.error === "error") {
            return [];
        }

        const locationsUrl = getSourceUrl(dataset);
        const existing = getThingAll(dataset, locationsUrl);

        let counter = lastId + 1;
        const options = {year: "numeric", month: "numeric", day: "numeric"};

        existing.forEach((location) => {
            const text = getStringNoLocaleAll(location, "http://schema.org/text");

            const name = text.filter((t) => t.includes("Title:"))[0].split("Title:")[1];
            const details = text.filter((t) => t.includes("Desc:"))[0].split("Desc:")[1];
            const coords = text.filter((t) => t.includes("Coords:"))[0].split("Coords:")[1];
            const photo = text.filter((t) => t.includes("Photo:"))[0].split("Photo:")[1];

            const date = getDatetime(location, "http://www.w3.org/2002/12/cal/ical#created");

            createdLocations.push({
                type: "loc",
                id: counter++,
                name,
                details,
                coords: [JSON.parse(coords)],
                photo,
                date: new Date(date).toLocaleDateString("es-ES", options),
                webId: friendId
            });
        });
    }

    return createdLocations;
}

export default async function FetchPodFriendsCreatedLocations(session, lastId) {

    let createdLocations = [];

    const profileDataset = await getSolidDataset(session.info.webId, {
        fetch: session.fetch,
    });
    const profileThing = getThing(profileDataset, session.info.webId);

    const friends = getUrlAll(
        profileThing,
        "http://xmlns.com/foaf/0.1/knows"
    );

    for (let friend of friends) {

        let friendLocs = await fetchFriendLocations(friend, session, lastId);

        for (let loc of friendLocs) {
            createdLocations.push(loc);
        }
    }

    return createdLocations;
}




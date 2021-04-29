import { getSolidDataset, getThing, getUrlAll, getSourceUrl, getThingAll, getStringNoLocaleAll, getDatetime } from "@inrupt/solid-client";
import { isImmutableDefault } from "@reduxjs/toolkit";
import getOrCreatePublicFilePod from "../../utils/GetOrCreatePublicFilePod";

export default async function FetchPodFriendsCreatedLocations(session, lastId) {
    
    let createdLocations = [];
    
    const profileDataset = await getSolidDataset(session.info.webId, {
        fetch: session.fetch,
    });
    const profileThing = getThing(profileDataset, session.info.webId);

    const podsUrls = getUrlAll(
        profileThing,
        "http://xmlns.com/foaf/0.1/knows"
    );

    for (let friend of podsUrls){
        
        let friendLocs = await fetchFriendLocations(friend, session, lastId);

        for (let loc of friendLocs){
            createdLocations.push(loc);
        }
    }

    return createdLocations;  
}

async function fetchFriendLocations(friendId, session, lastId){
    let createdLocations = [];

    if (await isMutual(friendId, session)){

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

        if(dataset?.error === "error")
            return [];

        const locationsUrl = getSourceUrl(dataset);
        const existing = getThingAll(dataset, locationsUrl);

        let counter = lastId;
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

        existing.forEach(async location => {
            const text = getStringNoLocaleAll(location, "http://schema.org/text");

            const date = getDatetime(location, "http://www.w3.org/2002/12/cal/ical#created");

            createdLocations.push({ type: "loc", id: counter++, name: text[1], details: text[0], coords: [JSON.parse(text[2])], photo: text[3], date: new Date(date).toLocaleDateString("es-ES", options), webId: friendId })
        });
    }

    return createdLocations;  
}

async function isMutual(friendId, session){
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
import Api from "../../api/API";
import getOrCreatePrivateFilePod from "../../utils/getOrCreatePrivateFilePod";
import { getSolidDataset, getThing, getUrlAll, getSourceUrl, getStringNoLocale } from "@inrupt/solid-client";

export default async function fetchDBLocations(session) {
    const { webId } = session.info;

    const profileDataset = await getSolidDataset(session.info.webId, {
        fetch: session.fetch,
    });
    const profileThing = getThing(profileDataset, session.info.webId);
    const podsUrls = getUrlAll(
        profileThing,
        "http://www.w3.org/ns/pim/space#storage"
    );
    const pod = podsUrls[0];
    const privateContainerUri = `${pod}private/RadarinPrKey/`;
    const prKeyFile = await getOrCreatePrivateFilePod(privateContainerUri, session.fetch);

    if (prKeyFile?.error === "error") { return []; }

    const prKeyUrl = getSourceUrl(prKeyFile);


    const publicDataset = await getSolidDataset(prKeyUrl, { fetch: session.fetch });

    const existing = getThing(publicDataset, prKeyUrl);

    if (existing === null) {
        return [];
    }

    const aux = getStringNoLocale(existing, "https://www.w3.org/ns/auth/cert#PrivateKey");


    let l;

    try {
        Api.setIdentity(webId, aux);

        l = await Api.getLocations();
    } catch (err) {
        return [];
    }

    const withPolyline = getLines(l);

    return withPolyline;
}

async function getLines(locations) {
    const locationsWithDate = locations.map((element) => ({
        coords: [element.coords.latitude, element.coords.longitude],
        timestamp: new Date(element.timestamp).setHours(0, 0, 0, 0)
    }));

    let polylines = [];

    let currentPolyline;

    let previousTimestamp = new Date(8640000000000000);

    let firstFlag = true;

    let counter = 0;

    const options = { year: "numeric", month: "numeric", day: "numeric" };

    locationsWithDate.forEach((element) => {
        if (element.timestamp < previousTimestamp) {
            if (!firstFlag) {
                polylines.push(currentPolyline);
            } else {
                firstFlag = false;
            }

            currentPolyline = { type: "poly", id: counter++, name: new Date(element.timestamp).toLocaleDateString("es-ES", options), details: "Route taken on this day", coords: [] };
            currentPolyline.coords.push(element.coords);
            previousTimestamp = element.timestamp;
        } else if (element.timestamp === previousTimestamp) {
            currentPolyline.coords.push(element.coords);
        }
    });

    if (typeof currentPolyline !== "undefined") {
        polylines.push(currentPolyline);
    }

    return polylines;
}
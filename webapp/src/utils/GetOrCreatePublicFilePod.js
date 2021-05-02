import {
    createSolidDataset,
    getSolidDataset,
    saveSolidDatasetAt,
} from "@inrupt/solid-client";


export default async function getOrCreatePublicFilePod(containerUri, fetch, filename) {
    const pKeyFileUrl = `${containerUri}${filename}`;

    try {
        const pKeyFile = await getSolidDataset(pKeyFileUrl, {fetch});
        return pKeyFile;
    } catch(error) {
        if(error.statusCode === 404) {
            let res = await saveSolidDatasetAt(pKeyFileUrl, createSolidDataset(), {fetch});

            return { error: "error", res };
        }
    }
}
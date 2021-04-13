import {
    createSolidDataset,
    getSolidDataset,
    saveSolidDatasetAt,
} from "@inrupt/solid-client";


export default async function getOrCreatePrivateFilePod(containerUri, fetch) {
    const prKeyFileUrl = `${containerUri}privateKey.ttl`;
    try {
        const prKeyFile = await getSolidDataset(prKeyFileUrl, {fetch});
        return prKeyFile;
    } catch(error) {
        if(error.statusCode === 404) {
            const prKeyFile = await saveSolidDatasetAt(prKeyFileUrl, createSolidDataset(), {fetch});

            return prKeyFile;
        }
    }
}
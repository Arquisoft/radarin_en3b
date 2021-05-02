import Api from "../api/API";

export default async function UnblockUser(webId) {
    try {
        await Api.deleteBlacklist(webId);
    }
    catch(err) {
        console.log('No se desbloqueo');
    }
    
}
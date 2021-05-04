import Api from "../api/API";

export default async function BlockUser(webId) {
    try {
        await Api.postBlacklist({webId: webId});
    }
    catch(err) {
        console.log('No se bloqueó');
    }
    
}
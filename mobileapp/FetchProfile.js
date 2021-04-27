import rdfStore from "./utils/RDFStore";


export async function setProfile(webId) {
    try {
        const user = await rdfStore.getUser(webId);
        const userName = user.fn;
        /*
         a?.b --> if a is not null it access it's field b
         a ?? b --> if a is null returns b
         That way we are returning allways or the value of the userName or an empty String
         This is done as a user may or may not have it's username fullfilled, as it happened in my case, and can give raise a nullpointer exception
        */
        return { webId: webId, fn: userName ?? "" }; 
    } catch (e) {
        alert("Load failed: " + e);

    }
}
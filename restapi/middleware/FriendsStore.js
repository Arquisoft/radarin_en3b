const c = require("@thi.ng/cache");
const rdf = require("rdflib");

const REFRESH_INTERVAL = 300000; //5 min
const CACHE_LENGTH = 100;

class FriendsStore {
    constructor() {
        this._cache = new c.TLRUCache(null, { maxlen: CACHE_LENGTH, ttl: REFRESH_INTERVAL });
    }
    async areFriends(webId, friendWebId) {
        if (this._cache.has(webId))
            return this._cache.get(webId).includes(friendWebId);

        if (this._cache.has(friendWebId))
            return this._cache.get(friendWebId).includes(webId);
        
        const friends = await this.fetchFriends(webId);
        return this._cache.set(webId, friends).includes(friendWebId);
    }
    async fetchFriends(webId) {
        const store = rdf.graph();
        const FOAF = rdf.Namespace("http://xmlns.com/foaf/0.1/");
        const fetcher = new rdf.Fetcher(store);

        const me = store.sym(webId);
        await fetcher.load(webId);
        const names = store.each(me, FOAF("knows"));
        const namesDocs = names.map(name => name.doc());
        await fetcher.load(namesDocs);
        return store.each(null, FOAF("knows"), me)
            .map(webId => webId.value);
    }
}
const friendsStore = new FriendsStore();
module.exports = friendsStore;
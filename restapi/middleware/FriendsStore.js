const c = require("@thi.ng/cache");
const fetchFriends = require("../utils/fetchFriends");

const REFRESH_INTERVAL = 300000; //5 min
const CACHE_LENGTH = 100;

class FriendsStore {
    constructor() {
        this._cache = new c.TLRUCache(null, { maxlen: CACHE_LENGTH, ttl: REFRESH_INTERVAL });
    }
    async areFriends(webId, friendWebId) {
        if (this._cache.has(webId))
        {return this._cache.get(webId).includes(friendWebId);}

        if (this._cache.has(friendWebId))
        {return this._cache.get(friendWebId).includes(webId);}
        
        const friends = await fetchFriends(webId);
        return this._cache.set(webId, friends).includes(friendWebId);
    }
}
const friendsStore = new FriendsStore();
module.exports = friendsStore;
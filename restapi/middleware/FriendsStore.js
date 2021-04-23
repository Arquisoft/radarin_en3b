const QuickLRU = require("quick-lru");

class FriendsStore {
    constructor() {
        this.cache = new QuickLRU({ maxSize: 1000 });
        
    }
}
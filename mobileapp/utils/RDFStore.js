import {graph, Namespace, Fetcher} from "rdflib";

class User {
    constructor(webId, fn) {
        this.webId = webId;
        this.fn = fn;
    }
}

class RDFStore {
    constructor() {
        this._store = graph();
        this.VCARD = Namespace("http://www.w3.org/2006/vcard/ns#");
        this.FOAF = Namespace("http://xmlns.com/foaf/0.1/");
        this._fetcher = new Fetcher(this._store);
    }

    async getUser(webId) {
        const me = this._store.sym(webId);
        const profile = me.doc();
        await this._fetcher.load(profile);
        return new User(webId, this.getNameIfPossible(webId));
    }

    async getFriends(webId) {
        const me = this._store.sym(webId);
        await this._fetcher.load(webId);
        const names = this._store.each(me, this.FOAF("knows"));
        const namesDocs = Array.from(names.map(name => name.doc()));
        await this._fetcher.load(namesDocs);
        return this._store.each(null, this.FOAF("knows"), me)
            .map(webId => new User(webId.value, this.getNameIfPossible(webId)));
    }

    getNameIfPossible(webId) {
        return this._store.any(webId, this.VCARD("fn"))?.value;
    }
}

const rdfStore = new RDFStore();
export default rdfStore;
import { graph, Namespace, Fetcher } from "rdflib";

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
    const name = this.getNameIfPossible(me);
    return { webId, fn: name };
  }

  async getFriends(webId) {
    const me = this._store.sym(webId);
    await this._fetcher.load(webId);
    const names = this._store.each(me, this.FOAF("knows"));
    const namesDocs = names.map(name => name.doc());
    await this._fetcher.load(namesDocs);
    return this._store.each(null, this.FOAF("knows"), me)
      .map(webId => ({ webId: webId.value, fn: this.getNameIfPossible(webId) }));
  }

  getNameIfPossible(webId) {
    if (this._store.any(webId, this.VCARD("fn"))?.value !== undefined){
      let name = this._store.any(webId, this.VCARD("fn"))?.value;
      return name;
    } else
      return null;
  }
}

const rdfStore = new RDFStore();
export default rdfStore;
import jwt from "jsonwebtoken";
class API {
    constructor() {
        this.apiEndPoint = process.env.REACT_APP_API_URI || "https://radarinen3brestapi.herokuapp.com/api";
        this._webId = "";
        this.token = "";
    }

    setIdentity(webId, privateKey) {
        this._webId = webId;
        this._refreshToken(privateKey);
    }

    buildHeaders() {
        const headers = new Headers();
        headers.append("Authorization", "Bearer " + this.token);
        headers.append("Content-Type", "application/json");
        return headers;
    }

    _refreshToken(privateKey) {
        const payload = {
            sub: "test",
            webid: this._webId
        };
        this.token = jwt.sign(payload, privateKey, { algorithm: "RS256", noTimestamp: true });
    }

    async getLocations() {
        const encodedWebId = encodeURIComponent(this._webId);
        const response = await fetch(`${this.apiEndPoint}/locations?webId=${encodedWebId}`,
            { method: "GET", headers: this.buildHeaders() });
        return await response.json();
    }
}
const Api = new API();
// Object.freeze(Api);
export default Api;
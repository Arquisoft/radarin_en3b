import Api from '../api/API';

export default async function GetBlacklist() {
    let users;
    try {
        users = await Api.getBlacklist();
    }
    catch (err) {
        return [];
    }
    return users;
}
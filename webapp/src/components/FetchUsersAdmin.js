import Api from '../api/API';

export default async function FetchUsersAdmin() {
    let users;
    try {
        users = await Api.getUsers();
    }
    catch (err) {
        return [];
    }
    return users;
}
import Api from '../api/API';

export default async function FetchUsersAdmin() {
    let users;
    try {
        users = await Api.getUsers();
        console.log('aqui estan los users');
    }
    catch (err) {
        console.log('nada oye que no los acaba de coger los putos usuarios de mis cojones morenos')
        return [];
    }
    return users;
}
//For testing purposes, must be changed later
const userId = 'https://radarin.inrupt.net/profile/card#me';


const apiEndPoint = 'http://localhost:5000';

//In the future this will be changed and the userID will be passed
export async function sendLocation(/*userId,*/ coords, timestamp) {
let response = await fetch(apiEndPoint+'/locations/add', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
          'webId':userId, 
          'coords':coords, 
          'timestamp':timestamp})
});
Console.log('Position sent');
}
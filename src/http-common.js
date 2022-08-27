import axios from "axios";


export default axios.create({
  
  baseURL: "http://localhost:1337/api",
  headers: {
    "Content-type": "application/json",
    "x-access-token": usertoken()
  }
});

function usertoken(){
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
        // return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
        return user.accessToken ;       // for Node.js Express back-end
      } else {
        return "";
      }
}
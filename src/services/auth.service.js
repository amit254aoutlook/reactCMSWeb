// import axios from 'axios';

// const API_URL = "http://localhost:1337/api/";

// const register = (username, email, password) => {
//   return axios.post(API_URL + "signup", {
//     username,
//     email,
//     password,
//   });
// };

// const login = (username, password) => {
//   return axios
//     .post(API_URL + "auth/signin", {
//       username,
//       password,
//     })
//     .then((response) => {
//       if (response.data.accessToken) {
//         localStorage.setItem("user", JSON.stringify(response.data));
//       }

//       return response.data;
//     });
// };

// const logout = () => {
//   localStorage.removeItem("user");
// };

// getCurrentUser() {
//   return JSON.parse(localStorage.getItem('user'));;
// }

// const exportedObject = {
//   login,
//   register,
//   logout
// };

// export default exportedObject;


import axios from "axios";

const API_URL = "http://localhost:1337/api/auth/";

class AuthService {
  login(LoginId, Password) {
    return axios
      .post(API_URL + "signin", {
        LoginId,
        Password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();

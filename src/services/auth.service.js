import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_API_URL;

const login = (email, password) => {
  return axios
    .post(API_URL + "auth/local/", {
      identifier: email,
      password,
    })
    .then((response) => {
      if (response.data.jwt) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const authService = {
  login,
};

export default authService;

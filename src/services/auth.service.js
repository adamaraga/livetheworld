import axios from "axios";

const API_URL = "https://ltw-cms-stg.herokuapp.com/auth/local/";

const login = (email, password) => {
  return axios
    .post(API_URL, {
      identifier: email,
      password,
    })
    .then((response) => {
      console.log("response", response);
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

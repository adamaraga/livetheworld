import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://ltw-cms-stg.herokuapp.com/frontend/trips/";

const getTrips = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const addTrips = (activityId) => {
  return axios({
    url: API_URL + "add_activity",
    headers: authHeader(),
    method: "put",
    data: {
      activityId,
      tripType: "favorite",
    },
  });
};

const removeTrips = (activityId) => {
  return axios({
    url: API_URL + "remove_activity",
    headers: authHeader(),
    method: "put",
    data: {
      activityId,
      tripType: "favorite",
    },
  });
};

const tripsService = {
  getTrips,
  addTrips,
  removeTrips,
};

export default tripsService;

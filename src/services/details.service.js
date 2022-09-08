import axios from "axios";

const API_URL = process.env.REACT_APP_MAP_BASE_API_URL;

const getDetails = (detailName) => {
  return axios.get(API_URL + "frontend/activities/slug/" + detailName, {});
};

const detailsService = {
  getDetails,
};

export default detailsService;

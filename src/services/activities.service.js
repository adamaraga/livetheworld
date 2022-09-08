import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_BASE_API_URL;

const getActivities = (activityId) => {
  return axios.get(API_URL + "frontend/activities/nearby/" + activityId, {
    headers: authHeader(),
  });
};

const activitiesService = {
  getActivities,
};

export default activitiesService;

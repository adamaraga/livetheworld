import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/auth";
import messageReducer from "../slices/message";
import detailsReducer from "../slices/details";
import activitiesReducer from "../slices/activities";
import tripsReducer from "../slices/trips";

const reducer = {
  auth: authReducer,
  trips: tripsReducer,
  message: messageReducer,
  activities: activitiesReducer,
  details: detailsReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;

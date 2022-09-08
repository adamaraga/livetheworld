import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/auth";
import messageReducer from "../slices/message";
import detailsReducer from "../slices/details";

const reducer = {
  auth: authReducer,
  message: messageReducer,
  details: detailsReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import activitiesService from "../services/activities.service";
import { setMessage } from "./message";

export const getActivities = createAsyncThunk(
  "activities",
  async ({ activitiesId }, thunkAPI) => {
    try {
      const response = await activitiesService.getActivities(activitiesId);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {
  activities: null,
  success: false,
};

const activitiesSlice = createSlice({
  name: "activities",
  initialState,
  extraReducers: {
    [getActivities.fulfilled]: (state, action) => {
      state.success = true;
      state.activities = action.payload;
    },
    [getActivities.rejected]: (state, action) => {
      state.success = false;
    },
  },
});

const { reducer } = activitiesSlice;
export default reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import tripsService from "../services/trips.service";
import { setMessage } from "./message";

export const getTrips = createAsyncThunk("trips", async (thunkAPI) => {
  try {
    const response = await tripsService.getTrips();
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});

export const addTrips = createAsyncThunk(
  "addTrips",
  async ({ activityId }, thunkAPI) => {
    try {
      const response = await tripsService.addTrips(activityId);
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

export const removeTrips = createAsyncThunk(
  "addTrips",
  async ({ activityId }, thunkAPI) => {
    try {
      const response = await tripsService.removeTrips(activityId);
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
  trips: null,
  success: false,
};

const tripsSlice = createSlice({
  name: "trips",
  initialState,
  extraReducers: {
    [getTrips.fulfilled]: (state, action) => {
      state.success = true;
      state.trips = action.payload;
    },
    [getTrips.rejected]: (state, action) => {
      state.success = false;
    },
    [addTrips.fulfilled]: (state, action) => {
      state.success = true;
      state.trips = action.payload;
    },
    [addTrips.rejected]: (state, action) => {
      state.success = false;
    },
    [removeTrips.fulfilled]: (state, action) => {
      state.success = true;
      state.trips = action.payload;
    },
    [removeTrips.rejected]: (state, action) => {
      state.success = false;
    },
  },
});

const { reducer } = tripsSlice;
export default reducer;

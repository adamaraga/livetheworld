import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import detailsService from "../services/details.service";
import { setMessage } from "./message";

export const getDetails = createAsyncThunk(
  "details",
  async ({ detailName }, thunkAPI) => {
    try {
      const response = await detailsService.getDetails(detailName);
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
  details: null,
  success: false,
};

const detailsSlice = createSlice({
  name: "details",
  initialState,
  extraReducers: {
    [getDetails.fulfilled]: (state, action) => {
      state.success = true;
      state.details = action.payload;
    },
    [getDetails.rejected]: (state, action) => {
      state.success = false;
    },
  },
});

const { reducer } = detailsSlice;
export default reducer;

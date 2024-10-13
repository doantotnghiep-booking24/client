import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  tours: [],
  loading: false,
  error: null,
};

const toursSlice = createSlice({
  name: 'tours',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.tours = action.payload;
    },
    fetchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure } = toursSlice.actions;

export const fetchToursData = () => async (dispatch) => {
  dispatch(fetchStart());
  try {
    const response = await axios.get('http://localhost:3001/V1/Tours');
    dispatch(fetchSuccess(response.data.Tours.datas));
  } catch (error) {
    dispatch(fetchFailure(error.message));
  }
};

export default toursSlice.reducer;

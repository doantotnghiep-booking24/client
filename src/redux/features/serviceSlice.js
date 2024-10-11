import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  services: [],
  loading: false,
  error: null,
};

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.services = action.payload;
    },
    fetchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure } = servicesSlice.actions;

export const fetchServicesData = () => async (dispatch) => {
  dispatch(fetchStart());
  try {
    const response = await axios.get('http://localhost:3001/Services');
    dispatch(fetchSuccess(response.data.Services));
  } catch (error) {
    dispatch(fetchFailure(error.message));
  }
};

export default servicesSlice.reducer;

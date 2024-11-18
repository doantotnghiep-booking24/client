import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  tours: [],
  tour: null,
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
    fetchTourDetailSuccess: (state, action) => {
      state.loading = false;
      state.tour = action.payload;
    },
    fetchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchTourDetailSuccess, fetchFailure } = toursSlice.actions;
// danh sách tour
export const fetchToursData = () => async (dispatch) => {
  dispatch(fetchStart());
  try {
    const response = await axios.get('http://localhost:3001/V1/Tours');
    if (response.data && response.data.Tours) {
      dispatch(fetchSuccess(response.data.Tours.datas));
    } else {
      throw new Error('Lỗi');
    }
  } catch (error) {
    dispatch(fetchFailure(error.message));
  }
};

// chi tiết tour
export const fetchTourDetails = (id) => async (dispatch) => {
  dispatch(fetchStart());
  try {
    const response = await axios.get(`http://localhost:3001/V1/Tours/DetailTour/${id}`,{ withCredentials: true});

    if (response.data && response.data.detailTour) {
      dispatch(fetchTourDetailSuccess(response.data.detailTour[0]));
    } else {
      throw new Error('Lỗi');
    }
  } catch (error) {


    dispatch(fetchFailure(error.message));
  }
};

export default toursSlice.reducer;

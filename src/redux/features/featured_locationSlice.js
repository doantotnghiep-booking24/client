import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  featured_location: [], 
  loading: false,
  error: null,
};

const featured_locationSlice = createSlice({
  name: 'feadtured_location',
  initialState,
  reducers: {
    setNews: (state, action) => {
      state.feadtured_location = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setFeaturedLoction, setLoading, setError } = featured_locationSlice.actions;
export default featured_locationSlice.reducer;

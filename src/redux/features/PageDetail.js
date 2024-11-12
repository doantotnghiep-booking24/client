import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie'
const initialState = {
  Data_ToursRelated: [],
  Data_SheduleTourByid: [],
  Data_TourFavourite: [],
  Data_Hotels: []
};
export const PageDetail = createSlice({
  name: 'getToursRelated',
  initialState,
  reducers: {
    ToursRelateds: (state, action) => {
      state.Data_ToursRelated = action.payload
    },
    Shedule_tour_Byid: (state, action) => {
      state.Data_SheduleTourByid = action.payload
    },
    TourFavourite: (state, action) => {
      state.Data_TourFavourite = action.payload
    },
    Hotels: (state, action) => {
      state.Data_Hotels = action.payload
      console.log(state.Data_Hotels);
      
    }
  },
});

export const { ToursRelateds, Shedule_tour_Byid, TourFavourite, Hotels } = PageDetail.actions;
export default PageDetail.reducer;

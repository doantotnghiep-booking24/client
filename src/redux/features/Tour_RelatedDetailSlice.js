import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie'
const initialState = {
  Data_ToursRelated: [],
  Data_SheduleTourByid: []
};
export const ToursRelatedSlice = createSlice({
  name: 'getToursRelated',
  initialState,
  reducers: {
    ToursRelateds: (state, action) => {
      state.Data_ToursRelated = action.payload
    },
    Shedule_tour_Byid: (state, action) => {
      state.Data_SheduleTourByid = action.payload   
    }

  },
});

export const { ToursRelateds,Shedule_tour_Byid } = ToursRelatedSlice.actions;
export default ToursRelatedSlice.reducer;

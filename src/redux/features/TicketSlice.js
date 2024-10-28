import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  Data_ticket: [],
};
export const TicketSlice = createSlice({
  name: 'getTicket',
  initialState,
  reducers: {
    Ticket: (state, action) => {
      state.Data_ticket = action.payload   
    },
  },
});

export const { Ticket } = TicketSlice.actions;
export default TicketSlice.reducer;

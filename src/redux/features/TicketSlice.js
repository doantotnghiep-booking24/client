import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie'
const initialState = {
  Data_ticket: [],
  Ticket_Filter: []
};
export const TicketSlice = createSlice({
  name: 'getTicket',
  initialState,
  reducers: {
    Ticket: (state, action) => {
      state.Data_ticket = action.payload
    },
    Tickets_History: (state, action) => {
      const id_user = JSON.parse(Cookies.get('auth'))._id
      state.Ticket_Filter = action.payload.filter(ticket => ticket.id_user === id_user)
      console.log(state.Ticket_Filter);
    }
  },
});

export const { Ticket, Tickets_History } = TicketSlice.actions;
export default TicketSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie'
const initialState = {
  Data_ticket: [],
  Ticket_Filter: [],
  Data_TicketModal: []
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
      // console.log(state.Ticket_Filter);
    },
    Ticket_Modal: (state, action) => {
      state.Data_TicketModal = action.payload
      console.log(state.Data_TicketModal);

    }
  },
});

export const { Ticket, Tickets_History, Ticket_Modal } = TicketSlice.actions;
export default TicketSlice.reducer;

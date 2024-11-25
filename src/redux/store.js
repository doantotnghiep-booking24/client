import { configureStore } from '@reduxjs/toolkit';
import serviceReducer from './features/serviceSlice';
import tourReducer from './features/tourSlice';

import authReducer from "./features/AuthSlice"

import newsReducer from './features/newsSlice';
import TicketReducer from './features/TicketSlice'
import featured_locationReducer from './features/newsSlice';
import PageDetails from './features/PageDetail'
// import ToursRelatedReducer from './features/Tour_RelatedDetailSlice'
import chatReducer from './features/ChatSlice'
const store = configureStore({
  reducer: {
    services: serviceReducer,
    tours: tourReducer,

    auth: authReducer,

    news: newsReducer,
    featured_location: featured_locationReducer,
    ticket : TicketReducer,
    PageDetail : PageDetails,
    // ToursRelated : ToursRelatedReducer,

    chat: chatReducer,
  },
});

export default store;

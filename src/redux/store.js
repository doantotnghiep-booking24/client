import { configureStore } from '@reduxjs/toolkit';
import serviceReducer from './features/serviceSlice';
import tourReducer from './features/tourSlice';
import authReducer from "./features/AuthSlice"
const store = configureStore({
  reducer: {
    services: serviceReducer,
    tours: tourReducer,
    auth: authReducer
  },
});

export default store;

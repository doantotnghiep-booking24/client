import { configureStore } from '@reduxjs/toolkit';
import serviceReducer from './features/serviceSlice';
import tourReducer from './features/tourSlice';

const store = configureStore({
  reducer: {
    services: serviceReducer,
    tours: tourReducer,
  },
});

export default store;

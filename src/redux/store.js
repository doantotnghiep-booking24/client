import { configureStore } from '@reduxjs/toolkit';
import serviceReducer from './features/serviceSlice';

const store = configureStore({
  reducer: {
    services: serviceReducer,
  },
});

export default store;

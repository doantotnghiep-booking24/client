import { configureStore } from '@reduxjs/toolkit';
import serviceReducer from './features/serviceSlice';
import newsReducer from './features/newsSlice';
import featured_locationReducer from './features/newsSlice';

const store = configureStore({
  reducer: {
    services: serviceReducer,
    news: newsReducer,
    featured_location: featured_locationReducer,
  },
});

export default store;

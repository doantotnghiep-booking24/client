import { configureStore } from '@reduxjs/toolkit';
import serviceReducer from './features/serviceSlice';
import tourReducer from './features/tourSlice';
import newsReducer from './features/newsSlice';
import featured_locationReducer from './features/newsSlice';

const store = configureStore({
  reducer: {
    services: serviceReducer,
    tours: tourReducer,
    news: newsReducer,
    featured_location: featured_locationReducer,
  },
});

export default store;

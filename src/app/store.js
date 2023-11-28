import { configureStore } from '@reduxjs/toolkit';
import filmReducer from '../features/filmFeature/filmSlice';

export const store = configureStore({
  reducer: {
    film: filmReducer,
  },
});

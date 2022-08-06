import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import postingReducer from './Slices/postingSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posting: postingReducer
  },
});

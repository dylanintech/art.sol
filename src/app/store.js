import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import postingReducer from './Slices/postingSlice';
import tippingReducer from './Slices/tippingSlice';
import receiverReducer from './Slices/receiverAddressSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posting: postingReducer,
    tipping: tippingReducer,
    receiver: receiverReducer
  },
});

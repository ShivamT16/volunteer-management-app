import { configureStore } from '@reduxjs/toolkit';
import { volunteerSlice } from '../volunteerSlice';

export const store = configureStore({
  reducer: {
    volunteers: volunteerSlice.reducer
  },
});

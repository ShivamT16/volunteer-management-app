import { configureStore } from '@reduxjs/toolkit';
import { eventSlice } from '../features/event/eventSlice';
import { volunteerSlice } from '../features/volunteer/volunteerSlice';

export const store = configureStore({
  reducer: {
    volunteers: volunteerSlice.reducer,
    events: eventSlice.reducer
  }
});

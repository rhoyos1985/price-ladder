import { configureStore } from '@reduxjs/toolkit';
import ladderReducer from './features/ladder/slices/ladderSlice';

export const store = configureStore({
  reducer: {
    ladder: ladderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

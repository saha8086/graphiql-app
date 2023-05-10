import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  // todo: add slices using createSlice
  reducer: {},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

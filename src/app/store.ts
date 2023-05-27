import { configureStore } from '@reduxjs/toolkit';
import docsReducer from '../components/GraphiQlDocs/Docs.slice';

export const store = configureStore({
  // todo: add slices using createSlice
  reducer: {
    docsPages: docsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['openPage', 'docsPages/openPage', 'docsPages/setSchema'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['docsPages.openedPages', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['docsPages.openedPages', 'docsPages.schema'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

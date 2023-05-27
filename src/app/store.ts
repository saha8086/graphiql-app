import { configureStore } from '@reduxjs/toolkit';

import { graphqlApi } from '@services/graphql.service';
import { inputURLSlice } from '@pages/GraphQLPage/components/InputURL/InputURL.slice';

export const store = configureStore({
  reducer: {
    [graphqlApi.reducerPath]: graphqlApi.reducer,
    [inputURLSlice.name]: inputURLSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(graphqlApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

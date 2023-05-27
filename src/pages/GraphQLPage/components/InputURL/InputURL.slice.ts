import { RootState } from '@app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  url: string;
  apiList: string[];
}

const initialState: InitialState = {
  url: 'https://graphqlpokemon.favware.tech/v7',
  apiList: [
    'https://graphqlpokemon.favware.tech/v7',
    'https://graphql-pokeapi.graphcdn.app/',
    'https://api.geographql.rudio.dev/graphql',
    // 'https://dropmail.me/api/graphql/' /* + token */,
  ],
};

export const inputURLSlice = createSlice({
  name: 'inputURL',
  initialState,
  reducers: {
    setURL: (state, { payload: url }: PayloadAction<string>) => {
      if (import.meta.env.DEV) {
        console.log(new URL(url));
      }
      state.url = url;
      if (!state.apiList.includes(url)) {
        state.apiList.push(url);
      }
    },
  },
});

export const { setURL } = inputURLSlice.actions;

export const selectBaseUrl = (state: RootState) => state.inputURL.url;

export const selectApiList = (state: RootState) => state.inputURL.apiList;

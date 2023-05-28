import { RootState } from '@app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { API_ENDPOINTS } from '@consts/ApiEndpoint';

interface InitialState {
  url: string;
  apiList: string[];
}

const initialState: InitialState = {
  url: API_ENDPOINTS[0],
  apiList: [...API_ENDPOINTS],
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

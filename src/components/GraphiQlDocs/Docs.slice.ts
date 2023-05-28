import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { firstPage } from './GraphiQlDocs';

type Page = {
  name: string;
  node: ReactNode;
};

type InititalState = {
  openedPages: Page[];
  schema?: object;
};

const initialState: InititalState = {
  openedPages: [{ name: 'Docs', node: firstPage }],
};

const docsSlice = createSlice({
  name: 'docsPages',
  initialState,
  reducers: {
    openPage: (state, action: PayloadAction<Page>) => {
      state.openedPages.push(action.payload);
    },
    goBack: (state) => {
      state.openedPages.pop();
    },
    setSchema: (state, action: PayloadAction<object>) => {
      state.schema = action.payload;
    },
  },
});

export default docsSlice.reducer;
export const { openPage, goBack } = docsSlice.actions;

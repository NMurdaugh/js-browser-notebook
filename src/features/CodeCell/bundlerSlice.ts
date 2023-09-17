import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBundleCompletePayload, IBundleStartPayload } from './types';

interface IBundlesState {
  [key: string]: {
    processing: boolean;
    code: string;
    error: string;
  };
}

const initialState: IBundlesState = {};

export const bundlerSlice = createSlice({
  name: 'bundler',
  initialState,
  reducers: {
    bundleStart: (state, action: PayloadAction<IBundleStartPayload>) => {
      state[action.payload.id] = {
        processing: true,
        code: '',
        error: '',
      };
    },

    bundleComplete: (state, action: PayloadAction<IBundleCompletePayload>) => {
      state[action.payload.id] = {
        processing: false,
        code: action.payload.bundle.code,
        error: action.payload.bundle.error,
      };
    },
  },
});

export const { bundleStart, bundleComplete } = bundlerSlice.actions;

export default bundlerSlice.reducer;

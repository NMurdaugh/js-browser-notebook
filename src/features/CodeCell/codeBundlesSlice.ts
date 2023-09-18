import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../app/hooks';
import { bundler } from './services/bundler';
import { IBundleCompletePayload, IBundleStartPayload } from './types';

interface IBundlesState {
  [key: string]: {
    processing: boolean;
    code: string;
    error: string;
  };
}

const initialState: IBundlesState = {};

export const createBundle = (id: string, inputCode: string) => {
  const dispatch = useAppDispatch();
  return async () => {
    dispatch(bundleStart({ id }));

    const bundlerResult = await bundler(inputCode);

    dispatch(bundleComplete({ id, bundle: bundlerResult }));
  };
};

export const codeBundlesSlice = createSlice({
  name: 'codeBundles',
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

export const { bundleStart, bundleComplete } = codeBundlesSlice.actions;

export default codeBundlesSlice.reducer;

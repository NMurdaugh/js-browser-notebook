import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { bundler } from './services/bundler';

interface IBundlesState {
  [key: string]:
    | {
        processing: boolean;
        code: string;
        error: string;
      }
    | undefined;
}

const initialState: IBundlesState = {};

interface ICellData {
  cellId: string;
  inputCode: string;
}

export const createBundle = createAsyncThunk(
  'codeBundles/createBundle',
  async (cellData: ICellData) => {
    const bundlerResult = await bundler(cellData.inputCode);

    return {
      cellId: cellData.cellId,
      bundlerResult,
    };
  }
);

export const codeBundlesSlice = createSlice({
  name: 'codeBundles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createBundle.pending, (state, action) => {
      state[action.meta.arg.cellId] = {
        processing: true,
        code: '',
        error: '',
      };
    });
    builder.addCase(createBundle.fulfilled, (state, action) => {
      const { code, error } = action.payload.bundlerResult;

      state[action.payload.cellId] = {
        processing: false,
        code,
        error,
      };
    });
  },
});

export default codeBundlesSlice.reducer;

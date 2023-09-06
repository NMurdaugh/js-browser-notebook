import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Cell,
  DeleteCellPayload,
  InsertCellBeforePayload,
  MoveCellPayload,
  UpdateCellPayload,
} from './types';

interface NotebookState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: NotebookState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

export const notebookSlice = createSlice({
  name: 'notebook',
  initialState,
  reducers: {
    moveCell: (state, action: PayloadAction<MoveCellPayload>) => {},

    deleteCell: (state, action: PayloadAction<DeleteCellPayload>) => {
      delete state.data.id;
      state.order = state.order.filter((cellId) => cellId !== action.payload);
    },

    insertCellBefore: (
      state,
      action: PayloadAction<InsertCellBeforePayload>
    ) => {},

    updateCell: (state, action: PayloadAction<UpdateCellPayload>) => {
      const { id, content } = action.payload;
      state.data[id] = {
        ...state.data[id],
        content: content,
      };
    },
  },
});

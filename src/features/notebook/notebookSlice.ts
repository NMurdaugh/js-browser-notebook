import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import {
  Cell,
  IDeleteCellPayload,
  IInsertCellBeforePayload,
  IMoveCellPayload,
  IUpdateCellPayload,
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
    moveCell: (state, action: PayloadAction<IMoveCellPayload>) => {
      const { direction } = action.payload;

      const startingIndex = state.order.findIndex(
        (cellId) => cellId === action.payload.id
      );

      const targetIndex =
        direction === 'up' ? startingIndex - 1 : startingIndex + 1;

      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return;
      }

      state.order[startingIndex] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;
    },

    deleteCell: (state, action: PayloadAction<IDeleteCellPayload>) => {
      delete state.data.id;
      state.order = state.order.filter((cellId) => cellId !== action.payload);
    },

    insertCellBefore: (
      state,
      action: PayloadAction<IInsertCellBeforePayload>
    ) => {
      const { id, type } = action.payload;

      const newCell: Cell = {
        id: nanoid(),
        type: type,
        content: '',
      };

      state.data[newCell.id] = newCell;

      const index = state.order.findIndex((cellId) => cellId === id);

      if (index < 0) {
        state.order.push(newCell.id);
      } else {
        state.order.splice(index, 0, newCell.id);
      }
    },

    updateCell: (state, action: PayloadAction<IUpdateCellPayload>) => {
      const { id, content } = action.payload;
      state.data[id] = {
        ...state.data[id],
        content: content,
      };
    },
  },
});

export const { moveCell, deleteCell, insertCellBefore, updateCell } =
  notebookSlice.actions;

export default notebookSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import notebookReducer from '../features/notebook/notebookSlice';

const store = configureStore({
  reducer: {
    notebook: notebookReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

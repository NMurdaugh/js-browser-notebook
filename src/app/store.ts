import { configureStore } from '@reduxjs/toolkit';
import bundlerReducer from '../features/CodeCell/bundlerSlice';
import notebookReducer from '../features/Notebook/notebookSlice';

const store = configureStore({
  reducer: {
    notebook: notebookReducer,
    bundler: bundlerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

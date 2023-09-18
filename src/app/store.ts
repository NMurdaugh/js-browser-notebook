import { configureStore } from '@reduxjs/toolkit';
import codeBundlesReducer from '../features/CodeCell/codeBundlesSlice';
import notebookReducer from '../features/Notebook/notebookSlice';

const store = configureStore({
  reducer: {
    notebook: notebookReducer,
    bundler: codeBundlesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import todosReducer from '../features/todos/todosSlice';
import filterReducer from '../features/todos/filterSlice';
import { listApi } from '../service/listService';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
  //preloadedState,
  reducer: {
    //definisco il reducer da utilizzare per ogni fetta di store
    todos: todosReducer,
    filter:filterReducer,
    [listApi.reducerPath]:listApi.reducer
  },
  //aggiungo liddelware delle api per aggiornare store
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger,listApi.middleware)
});
setupListeners(store.dispatch);
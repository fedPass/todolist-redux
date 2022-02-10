import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { listApi } from '../service/listService';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { todoApi } from '../service/todoService';
import filterReducer from '../features/todos/filterSlice';
import { authApi } from '../service/authService';
import userReducer from '../features/auth/userSlice';

export const store = configureStore({
  //preloadedState,
  reducer: {
    //definisco il reducer da utilizzare per ogni fetta di store
    //con thunk era -> todos: todosReducer,
    [todoApi.reducerPath]:todoApi.reducer,
    filter:filterReducer,
    [listApi.reducerPath]:listApi.reducer,
    [authApi.reducerPath]:authApi.reducer,
    auth:userReducer
  },
  //aggiungo liddelware delle api per aggiornare store
  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware().concat(
    logger,
    listApi.middleware,
    todoApi.middleware,
    authApi.middleware
  )
});
setupListeners(store.dispatch);
import { createAsyncThunk } from '@reduxjs/toolkit';
import { filterTodo } from './filterSlice';
import { fetchFilter,fetchTodos,removeTodo,addNewTodo, changeCompleted } from '../../service/todoService';

// create the thunk
export const getTodos = createAsyncThunk(
    //nome dell'azione
    'todos/getTodos',
    //il primo param è quello che passo alla funzione getTodos
    //thnkAPI è un parametro che in automatico passa getState, dispatch, extra, reject/fulfillWithValue
    //destrutturo thunkAPI e prend la dispatch
    async (data = null, {dispatch}) => {
      // //formula base
      // const response = await fetch(todo_url).then(res => res.json()).then(res => res);
      // console.log(response);
      // return response;
  
      //in un array destrutturo la risposta di Promise.all in cui passiamo in un array le promise che vogliamo mettere in parallelo
      let [todos, activeFilter] = await Promise.all([fetchTodos(), fetchFilter()]);
      //console.log(todos,activeFilter);
  
      //restituisco i todo a secondo del filtro selezionato
      //anche se ho un solo elemento è cmq un array
      const filter = activeFilter[0];
      //faccio la dispatch per rpendere il filtro 
      dispatch(filterTodo(filter));
      todos = todos.filter(todo => {
        if (filter === 'All'){
          return true
        } else if (filter === 'Completed'){
          //tornami quelli con completed true
          return todo.completed
        } else {
          //tornami i completed false (===todo)
          return !todo.completed
        }
      });
      return todos;
    }
  );

  //thnk per la delete
  export const deleteTodo = createAsyncThunk(
    //nome dell'azione
    'todos/removeTodos',
    async (todo, {dispatch}) => {
      await removeTodo(todo);
      return todo;
    }
  );

    //thnk per l'add
    export const addTodo = createAsyncThunk(
      //nome dell'azione
      'todos/addTodos',
      async (todo, {dispatch}) => {
        return await addNewTodo(todo);
      }
    );

     //thnk per la put
     export const toggleTodo = createAsyncThunk(
      //nome dell'azione
      'todos/toggleTodos',
      async (todo, {dispatch}) => {
        return await changeCompleted(todo);
      }
    );
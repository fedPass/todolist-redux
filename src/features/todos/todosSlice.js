import { createSlice } from '@reduxjs/toolkit';
import { getTodos,deleteTodo, addTodo, toggleTodo } from './thunksTodo';

//function that accepts a "slice name", an initial state and an object of reducer functions 
//automatically generates action creators and action types that correspond to the reducers and state.
export const todosSlice = createSlice({
    name:'todos',
    initialState:[],
    //è un oggetto che contiene le funzioni Redux "case reducer" (funzioni che gestiscono un tipo di azione specifico, come in uno switch)
    //corresponding reducer will be run when app dispatchs an action with the exact same type string
    reducers: {
        // //in automatico grazie a toolkit ogni azione ci ritorna l'oggetto con type e payload
        // //state sarà il payload e action il type (es. payload: {name: 'ciao', dueDate: '26/11/2021', user_id: 1},type: "todos/addTodo")
        // addTodo(state, action) {
        //     //console.log('reducer', state, action);
        //     //qui sto lavorando con una proxy -> state 
        //     //se modifichiamo lo stato come in questo caso non c'è bisogno di fare return 
        //     state.push(action.payload);
        // },
        // removeTodo(state, action) {
        //   //in questo caso invece non stiamo modificando lo state quindi dobbiamo fare return 
        //     return state.filter(todo => todo.id !== action.payload.id);
        // },
        // toggleTodo(state, action) {
        //   //in questo caso stiamo modificando lo state quindi non dobbiamo fare return 
        //     state.map(todo => {
        //       if(todo.id === action.payload.id){
        //         //se l'id selezionato è uguale a quello che sto scorrendo allora inverti lo stato di completed
        //         todo.completed = !todo.completed
        //       }
        //       return todo;
        //     });
        // }
    },
    //ogni slice reducer "possiede" la sua fetta di stato, quindi molti slice reducer possono rispondere indipendentemente allo stesso action type
    //si riferiscono ad azioni "esterne" quindi non generano action in slice.actions
    //extraReducers permette a createSlice di rispondere ad altri tipi di azione oltre ai tipi che ha generato 
    extraReducers: builder => {
      // Add reducers for additional action types here, and handle loading state as needed
      builder
      .addCase(getTodos.pending, (state, action) => {
        console.log('pending state');
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        console.log('getTodos.fulfilled');
        // setta lo state come quello ricevuto dal payload
        state = action.payload;
        return state;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        //ritornami i todo che non hanno id uguale a che arriva in payload
        //console.log('deleteTodos.fulfilled');
        return state.filter(el => el.id !== action.payload.id);
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        //lo state è i todos
        //prendo l'indice del todo che ricevo
        const idx = state.findIndex(el => el.id === action.payload.id);
        //se trovi l'index
        if (idx !== -1) {
          //faccio uno splice (indice, quanti elementi eliminare, nuovo elemento da aggiungere)
          state.splice(idx, 1, action.payload);
        }
        return state;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.push(action.payload);
        return state;
      })
    }
  }
);

//console.log(todosSlice);

// const {actions, reducers} = todosSlice;
// export const {addTodo,removeTodo} = actions;
//export default reducer;

//export const {addTodo,removeTodo, toggleTodo} = todosSlice.actions;
export default todosSlice.reducer;
export {getTodos, deleteTodo, addTodo, toggleTodo}
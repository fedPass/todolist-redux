import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos/todosSlice';
import filterReducer from '../features/todos/filterSlice';

// const preloadedState = {
//   todos: [
//     {
//       completed: true,
//       name: 'Fare la spesa',
//       dueDate: new Date().toLocaleDateString(),
//       user_id: 1,
//       id: 1
//     },
//     {
//       completed: false,
//       name: 'Uscire spazzatura',
//       dueDate: new Date().toLocaleDateString(),
//       user_id: 1,
//       id: 2
//     },
//     {
//       completed: true,
//       name: 'Ritirare completo',
//       dueDate: new Date().toLocaleDateString(),
//       user_id: 1,
//       id: 3
//     }

//   ],
//   filter: 'All'
// };


//custom middleware - formula lunga con spiegazione
//per creare un middleware mi servono 3 funzioni
//la prima riceve lo store e ritorna una nuova funzione
// function myLog(store){
//   //questa seconda funzione riceve il middleware e ritorna una funzione
//   return function myDispatch(nextMiddleware){
//     //questa è la terza funzione che verrà chiamata quando ci sarà una dispatch
//     return function myAction(action){
//       //dobbiamo prendere dispatch dallo styore perchè è un suo metodo
//       //store.dispatch({type: 'INIT_MYLOG', payload: null});
//       console.log(action);
//       //faccio return del risultato
//       return 'myVal';
//       // oppure  chiamo la funzione del middleware solo se non gestiamo noi la dispatch
//       //return nextMiddleware(action);
//     }
//   }
// }

// custom middleware - forma standard
const myLog = store => next => action => {
  //store.dispatch({type: 'INIT_MYLOG', payload: null});
  console.log('type:' + action.type);
  //ved la versione precedente dello store
  console.log('preview', store.getState());
  //vedo cosa è successo
  console.log(action.payload);
  const res = next(action);
   //vedo com'era il modificato
  console.log(res);
  return res
}

export const store = configureStore({
  //preloadedState,
  reducer: {
    //per la fetta todos usa todosReducer
    todos: todosReducer,
    filter:filterReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(myLog)
});

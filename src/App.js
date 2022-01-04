import React, {useRef, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, getTodos} from './features/todos/todosSlice';
//import { getTodos } from './features/todos/thunksTodo';
import { filterTodo} from './features/todos/filterSlice';
import './App.css';
import Todos from './features/todos/Todos';
import AddTodo from './features/todos/AddTodo';
import FilterTodo from './features/todos/FilterTodo';

function App() {
  //la dispatch dovrò farla adesso qui (invece che con redux normale) perchè le action mi ritornano l'oggetto
  //es. payload: {name: 'ciao', dueDate: '26/11/2021', user_id: 1},type: "todos/addTodo" 
  const dispatch = useDispatch();

  //uso use Effect per fare in modo da chiamare getTodos soltanto quando viene montato App
  //altrimenti andrebbe in loop
  useEffect(() => {
    //chiamo l'api per prendere i todos dal json server
  dispatch(getTodos());
    return () => {}
  }, [dispatch]);  
  
  //per recuperare i todos dallo store use UseSelector
  //state sarebbe l'oggetto reducer di store.js e per accedervi uso la dot notation (.todos)
  let todos = useSelector(state => state.todos);
  const activeFilter = useSelector(state => state.filter);

  todos = todos.filter(todo => {
    if (activeFilter === 'All'){
      return true
    } else if (activeFilter === 'Completed'){
      //tornami quelli con completed true
      return todo.completed
    } else {
      //tornami i completed false (===todo)
      return !todo.completed
    }
  });

  //useRef per avere un riferimento ad un elemento - mi aiuta a leggere dal DOM direttamente con React (senza js)
  var todoEl = useRef('');

  //funzione al click sul button Add
  const manageClick = (e) => {
    //per non far aggiornare pagina dopo invio del form
    e.preventDefault();
    //chiamo la funzione addTodo con il name dell nuovo todo
    dispatch(addTodo(
        { name:todoEl.current.value,
          dueDate : new Date().toLocaleDateString(),
          user_id: 1,
          completed:false
        }));
    //console.log(todoEl);
    todoEl.current.value = '';
  }

  //funzione al click su un filtro
  const onFilterTodo = (filter) =>{
    dispatch(filterTodo(filter))
  }

  return (
    <div className="App container-fluid pt-5 pb-5">
      <div className='row d-flex justify-content-center'>
        <div className='col-12 col-md-4'>
          <h1>To Do List</h1>
          <AddTodo todoEl={todoEl} manageClick={manageClick}/>
          <FilterTodo filter={activeFilter} onFilter={onFilterTodo}/>
          <Todos todos={todos}/>
        </div>
      </div>
    </div>
  );
}

export default App;

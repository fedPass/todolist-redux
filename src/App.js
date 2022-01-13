import React, {useRef, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { addTodo, getTodos} from './features/todos/todosSlice';
//import { getTodos } from './features/todos/thunksTodo';
import { filterTodo} from './features/todos/filterSlice';
import './App.css';
import MyTodos from './features/todos/MyTodos';
import MyLists from './features/lists/MyLists';
import Header from './components/Header';
import { getLists } from './features/lists/listsSlice';

function App() {
  //la dispatch dovrò farla adesso qui (invece che con redux normale) perchè le action mi ritornano l'oggetto
  //es. payload: {name: 'ciao', dueDate: '26/11/2021', user_id: 1},type: "todos/addTodo" 
  const dispatch = useDispatch();

  //uso use Effect per fare in modo da chiamare getTodos soltanto quando viene montato App
  //altrimenti andrebbe in loop
  useEffect(() => {
    //chiamo l'api per prendere i todos dal json server
  dispatch(getTodos());
  dispatch(getLists());
    return () => {}
  }, [dispatch]);  

  useEffect(() => {
    //chiamo l'api per prendere i todos dal json server
  dispatch(getTodos());
  dispatch(getLists());
    return () => {}
  }, [dispatch]); 
  
  //per recuperare i todos dallo store use UseSelector
  //state sarebbe l'oggetto reducer di store.js e per accedervi uso la dot notation (.todos)
  let todos = useSelector(state => state.todos);
  const activeFilter = useSelector(state => state.filter);
  // const lists = [
  //   {
  //     "name":"Casa",
  //     "user_id": 1,
  //     "id":1
  //   },
  //   {
  //     "name":"Lavoro",
  //     "user_id": 1,
  //     "id":2
  //   },
  //   {
  //     "name":"Personale",
  //     "user_id": 1,
  //     "id":3
  //   }
  // ];
  let lists = useSelector(state => state.lists);

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
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route exact path='/' element={<MyLists lists={lists} />} />
          <Route path="/lists" element={<MyLists lists={lists} />} />
          <Route path="/todos" element={<MyTodos 
            manageClick={manageClick} 
            onFilterTodo={onFilterTodo}
            activeFilter={activeFilter}
            todos={todos}
            todoEl={todoEl}
            />} 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

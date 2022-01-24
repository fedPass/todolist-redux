import Todos from './Todos';
import FilterTodo from './FilterTodo';
import AddTodo from '../../components/AddElement';
import ErrorBoundary from '../../components/ErrorBoundary';
import {useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterTodo } from './filterSlice';
import { useGetTodosQuery, useDeleteTodoMutation, useAddTodoMutation, useUpdateTodoMutation, useGetTodoByListIdQuery} from '../../service/todoService';
import { useParams } from "react-router-dom";

function MyTodos() {

    const dispatch = useDispatch();

    //useRouteMatch mi aiuta a prelevare parametri dall'url di questa rotta
    let {id} = useParams();
    id = Number(id);

    //modo alternativo per prendere paramtri dall'url
    const urlParams = new URLSearchParams(window.location.search);
    //prendi param dal url oppure metti ''
    const list_name = urlParams.get('list_name') ?? '';

    //useRef per avere un riferimento ad un elemento - mi aiuta a leggere dal DOM direttamente con React (senza js)
    var todoEl = useRef('');

    //accedo alla store per prendere il filtro
    const activeFilter = useSelector(state => state.filter);

    //funzione al click su un filtro
    const onFilterTodo = (filter) =>{
        dispatch(filterTodo(filter))
    };

    //rtq -> hook creato per recuperare le liste
    // const { 
    //     data = [], 
    //     error, 
    //     isFetching,
    //     refetch:reloadLists 
    // } = useGetTodosQuery();

    //faccio la chiamata getTodosById
    let {data=[]} = useGetTodoByListIdQuery(id);

    //gestisco filtri
    let todos = data.filter(todo => {
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

    const [
        removeTodo, 
        {isLoading:isDeletingTodo, 
        isSuccess: isSuccessTodo, 
        error:deleteErrorTodo, 
        isError: isErrorTodo}
    ] = useDeleteTodoMutation();

    const [
        addTodo, 
        {isLoading:isAddingTodo, 
        isSuccess:isAddSuccessTodo, 
        error:addErrorTodo, 
        isError:isAddErrorTodo}
    ] = useAddTodoMutation();

    const [
        updateTodo, 
        {isLoading:isUpdatingTodo, 
        isSuccess:isUpdateSuccessTodo, 
        error:addErrorUpdateTodo, 
        isError:isAddErrorUpdateTodo}
    ] = useUpdateTodoMutation();

    const manageClick = (e) => {
        //per non far aggiornare pagina dopo invio del form
        e.preventDefault();
        addTodo(
            { name:todoEl.current.value,
                created_at : new Date().toLocaleDateString(),
                user_id: 1,
                completed:false,
                id
            } 
        );
        todoEl.current.value = '';
    } 
    
    return (
        <div className='row d-flex justify-content-center mt-5 pt-5 pb-5'>
            <div className='col-12 col-md-4'>
                <h1>To Do List {list_name}</h1>
                <AddTodo element={todoEl} manageClick={manageClick} txtBtn={'Aggiungi Todo'}/>
                <FilterTodo filter={activeFilter} onFilter={onFilterTodo}/>
                <ErrorBoundary>
                    <Todos
                        removeTodo={removeTodo}
                        updateTodo={updateTodo}
                        todos={todos}
                    />
                </ErrorBoundary>
            </div>
        </div>
    )
}

export default MyTodos

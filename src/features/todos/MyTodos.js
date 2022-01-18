import Todos from './Todos';
import FilterTodo from './FilterTodo';
import AddTodo from '../../components/AddElement';

function MyTodos({manageClick,activeFilter,onFilterTodo, todos,todoEl}) {
    return (
        <div className='row d-flex justify-content-center mt-5 pt-5 pb-5'>
            <div className='col-12 col-md-4'>
                <h1>To Do List</h1>
                <AddTodo element={todoEl} manageClick={manageClick} txtBtn={'Aggiungi Todo'}/>
                <FilterTodo filter={activeFilter} onFilter={onFilterTodo}/>
                <Todos todos={todos}/>
            </div>
        </div>
    )
}

export default MyTodos

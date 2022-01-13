import Todos from './Todos';
import AddTodo from './AddTodo';
import FilterTodo from './FilterTodo';

function MyTodos({manageClick,activeFilter,onFilterTodo, todos,todoEl}) {
    return (
        <div className='row d-flex justify-content-center mt-5 pt-5 pb-5'>
            <div className='col-12 col-md-4'>
                <h1>To Do List</h1>
                <AddTodo todoEl={todoEl} manageClick={manageClick}/>
                <FilterTodo filter={activeFilter} onFilter={onFilterTodo}/>
                <Todos todos={todos}/>
            </div>
        </div>
    )
}

export default MyTodos

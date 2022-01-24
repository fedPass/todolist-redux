import Todo from './Todo';

const Todos = ({todos, removeTodo, updateTodo}) => {

    const onDelete = (todo) => {
        removeTodo(todo.id)
    }

    const onToggle = (todo) => {
        //todo è un argomento quindi lo dobbiamo destrutturare
        const newtodo = {...todo, completed:!todo.completed};
        updateTodo(newtodo)
    }
    return (
        <ul className="list-group">
            {
                todos.map( todo => <Todo key={todo.id} todo={todo} onToggleTodo={onToggle} onRemoveTodo={onDelete}/>)
            }
        </ul>
    )
}
export default Todos;
import Todo from './Todo';
import { useDispatch } from 'react-redux';
import { deleteTodo,toggleTodo } from './todosSlice';

const Todos = ({todos}) => {
    const dispatch = useDispatch();

    const onDelete = (todo) => {
        dispatch(deleteTodo(todo))
    }

    const onToggle = (todo) => {
        //todo è un argomento quindi lo dobbiamo destrutturare
        const newtodo = {...todo, completed:!todo.completed};
        dispatch(toggleTodo(newtodo))
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
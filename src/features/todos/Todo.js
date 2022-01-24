
export default function Todo({todo, onRemoveTodo, onToggleTodo}) {
    
    const iconStatus = todo.completed ? <i className="fas fa-check-square mr-3"></i> : <i className="far fa-square mr-3"></i>;
    const textStatus = todo.completed? 'textDone':'textTodo';
    
    return (
        <li className="list-group-item d-flex align-items-center">
            <div className="col-8 text-left">
                <span onClick = {() => onToggleTodo(todo)}>{iconStatus}</span>
                <span className={textStatus}>{todo.name}</span> 
            </div>
            <div className="col-4">
                <i onClick = {() => onRemoveTodo(todo)} className="ml-5 fas fa-trash-alt box-delete" title="Cancella"></i> 
            </div>
        </li>
    )
}

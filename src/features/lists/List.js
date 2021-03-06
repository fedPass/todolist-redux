import { Link, NavLink } from "react-router-dom";

function List({list, onRemoveList}) {
    const listNameParam = '?list_name='+ encodeURIComponent(list.name); 
    return (
        <li className="list-group-item d-flex align-items-center">
            <div className="col-7 text-left">
                <i className="far fa-folder"></i>
                <NavLink to={`/list/${list.id}/todos`+ listNameParam}>{list.name}</NavLink>
            </div>
            <div className="col-5">
                <Link to={`/list/${list.id}/edit`+ listNameParam}><i className="fas fa-edit box-edit mr-3"></i></Link>
                <i className="mt-3 fas fa-trash-alt box-delete" title="Cancella" onClick={ (id) => {onRemoveList(list.id)}}></i>
                {/* oppure uso onRemoveList.bind(null, list.id) così creo una copia della funzione che quando chiamata prende id  */}
            </div>
        </li>
    )
}

export default List

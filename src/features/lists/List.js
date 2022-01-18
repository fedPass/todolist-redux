function List({list, onRemoveList}) {
    return (
        <div className="list-box col-4 mt-5">
            <div>
                <span className="btn btn-outline-info">{list.name}</span>
            </div>
            <div>
                <i className="mt-3 fas fa-trash-alt cl-red" title="Cancella" 
                onClick={ (id) => {onRemoveList(list.id)}}></i>
                {/* oppure uso onRemoveList.bind(null, list.id) così creo una copia della funzione che quando chiamata prende id  */}
            </div>
        </div>
    )
}

export default List

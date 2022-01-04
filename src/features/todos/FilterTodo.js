export default function FilterTodo({onFilter,filter}) {
    return (
        <div className='d-flex mb-3'>
            <div className='col-sm-4'>
                <button disabled={filter === 'All'} onClick={()=>onFilter('All')} className='btn btn-outline-info w-100 p-1'>Tutti</button>
            </div>
            <div className='col-sm-4'>
            {/* quando uso onClick non posso passare parametri, quindi devo usare arrow function oppure onClick={()=>filtTodo.bind(null,'Todo')}*/}
            {/* il bind crea una nuova funzione che prende come primo paragrafo quale deve essere considerato il this di questa funzione e come secondo che parametro deve passare alla func */}
                <button disabled={filter === 'Todo'} onClick={()=>onFilter('Todo')} className='btn btn-outline-info w-100 p-1'>To Do</button>
            </div>
            <div className='col-sm-4'>
                <button disabled={filter === 'Completed'} onClick={()=>onFilter('Completed')} className='btn btn-outline-info w-100 p-1'>Completati</button>
            </div>
        </div>
    )
}

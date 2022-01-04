export default function AddTodo({todoEl,manageClick}) {
    return (
        <div className='d-flex justify-content-center pt-3 pb-3'>
            <form onSubmit={manageClick} className="form-inline">
              <div className="form-group mx-sm-3 mb-2">
                <input ref={todoEl} type="text" className="form-control" name='todo' id="todo" placeholder="Aggiungi nuova attività" />
              </div>
              <button className="btn btn-info mb-2">Aggiungi</button>
            </form>
        </div>
    )
}

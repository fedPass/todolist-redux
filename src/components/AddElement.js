export default function AddElement({element,manageClick, txtBtn}) {
    return (
        <div className='d-flex justify-content-center pt-3 pb-3'>
            <form onSubmit={manageClick} className="form-inline">
              <div className="form-group mx-sm-3 mb-2">
                <input ref={element} type="text" className="form-control" name='element' id="element" placeholder={txtBtn ?? 'Aggiungi nuovo'} />
              </div>
              <button className="btn btn-info mb-2">{txtBtn ?? 'Aggiungi'}</button>
            </form>
        </div>
    )
}

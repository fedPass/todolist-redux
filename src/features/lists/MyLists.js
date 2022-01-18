import Lists from "./Lists"

function MyLists({lists}) {
    return (
        <div className='row d-flex justify-content-center mt-5 pt-5 pb-5'>
            <div className='col-12 col-md-6'>
                <h1>My Lists</h1>
                <Lists lists={lists}/>
            </div>
        </div>
    )
}

export default MyLists

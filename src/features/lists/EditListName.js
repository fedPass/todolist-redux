import { useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useGetListByIdQuery, useUpdateListMutation } from '../../service/listService';

function EditListName() {
    // const { id } = useParams();

    // var editListEl = useRef('');
    
    // const { 
    //     data, 
    //     error, 
    //     isFetching,
    //     refetch:reloadListById 
    // } = useGetListByIdQuery(id);

    
    return (
        <div>
            <h1 className='mt-5 pt-5'>Edit List Name</h1>
            {/* <span>Nome attuale: {data.name}</span>
            <input type="text"></input>
            <button>Salva</button> */}
        </div>
    )
}

export default EditListName

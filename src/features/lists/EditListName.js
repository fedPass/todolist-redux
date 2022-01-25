import { useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useUpdateListMutation } from '../../service/listService';
import Edit from '../../components/AddElement';

function EditListName() {
    //importo hook per fare l'update
    const [updateList,{ isSuccess, error, isError }] = useUpdateListMutation();
    //inserisco riferimento all'elemento di input 
    const listEl = useRef('');
    //prendo il param id dall'url
    let {id} = useParams();
    //lo converto in numero
    const list_id = Number(id);
    //dichiaro variabile per usare useNavigate
    let navigate = useNavigate();

    //prendo param list_name dall'url
    // //useLocation -> hook returns the current location object
    // const location = useLocation();
    // //es location -> {pathname: '/list/2/edit', search: '?list_name=Lavoro', ...}
    // const pars = new URLSearchParams(location.search);
    // let list_name;
    // if(pars) {
    //     list_name = pars.get('list_name') ?? '';
    // }
    //modo diretto -> 
    let list_name = new URLSearchParams(window.location.search).get('list_name') ?? '';

    const manageClick = (e) => {
        e.preventDefault();
        console.log('Input value:'+ listEl.current.value);
        updateList(
            { 
                id:list_id,
                name:listEl.current.value
            } 
        );
        //listEl.current.value = '';
    } 

    //al mount visualizza nome lista
    useEffect(() => {
        //listEl.current.value = list_name;
        if(isSuccess){
            navigate("/lists");
        }
      return () => {
      };
    }, [isSuccess]);

    return (
        <div>
            <h1 className='mt-5 pt-5'>Edit List</h1>
            <span>nome attuale: {list_name} </span>
            <Edit element={listEl} manageClick={manageClick} txtBtn={'Modifica'}/>
        </div>
    )
}

export default EditListName

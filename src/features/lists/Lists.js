import { useGetListsQuery, useDeleteListMutation, useAddListMutation, useUpdateListMutation  } from '../../service/listService';
import React, {useEffect, useRef} from 'react';
import List from './List';
import AddList from '../../components/AddElement';

function Lists() {

    const listEl = useRef('');

    //rtq -> hook creato per recuperare le liste
    const { 
        //mappami i data ritornati come lists e come valore di default metti array vuoto
        data:lists = [], 
        error, 
        isFetching,
        refetch:reloadLists 
    } = useGetListsQuery();

    //la mutation ritorna un array in cui il primo parametro è una funzione trigger mutation(chiamata quando clicco pulsante delete) 
    //poi destrutturo il resto della response di mutation
    //uso refetch per mostrare lista aggiornata
    const [
        removeList, 
        {isLoading:isDeleting, 
        isSuccess, 
        error:deleteError, 
        isError}
    ] = useDeleteListMutation();

    const [
        addList, 
        {isLoading:isAdding, 
        isSuccess:isAddSuccess, 
        error:addError, 
        isError:isAddError}
    ] = useAddListMutation();

    function onRemoveClick(id) {
        removeList(id)
        //unwrap per attaccarci alla promise
        .unwrap()
        .then(()=>{
            //posso commentare la refetch perchè utilizzo i tag per invalidare la cache e renderizzare i nuovi dati
            //reloadLists()
        })
        .catch((err)=>{
            alert(err.message)
        })
    }

    //uso use Effect per fare in modo da vedere event error soltanto quando viene montato
    //altrimenti andrebbe in loop
    useEffect(() => {
    //quando l'oggetto viene montato controllo il loading ed eventuali errori
    if (isFetching) {
        console.log('Loading list');
    }
    if (error) {
        alert(error.status)
    }
        return () => {}
    }, [error, isFetching]);  

    const manageClick = (e) => {
        //per non far aggiornare pagina dopo invio del form
        e.preventDefault();
        addList(
            { name:listEl.current.value,
                user_id: 1
              } 
        );
        if(isAddSuccess) {
            listEl.current.value = '';
        }
      } 

    return (
        <div className='mt-5 pt-5'>
           <h1>My Lists</h1>
           <AddList element={listEl} manageClick={manageClick} txtBtn={'Aggiungi Lista'}/>
           <div className='d-flex flex-wrap mt-5'>
            {
                lists.map((list) => <List key={list.id} list={list} onRemoveList={(id)=> onRemoveClick(list.id)} />)
            }
            </div> 
        </div>
    )
}

export default Lists

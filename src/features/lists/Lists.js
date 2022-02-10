import { useGetListsQuery, useDeleteListMutation, useAddListMutation, useUpdateListMutation  } from '../../service/listService';
import React, {useEffect, useRef} from 'react';
import List from './List';
import AddList from '../../components/AddElement';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from '../../service/authService';
import { userLogout } from '../auth/userSlice';
import { useDispatch } from 'react-redux';


function Lists() {

    //dichiaro navigate e dispatch
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //istanzio l'hook della mutation
    const [logout] =useLogoutMutation();

    const data= localStorage.getItem('todolist-data');

    const listEl = useRef('');

    //rtq -> hook creato per recuperare le liste
    //get ritorna un oggetto, invece le mutation in array
    const { 
        //destruttura e mappami i data come lists (che inizialmente ha valore array vuoto)
        //come valore di default di data metti oggetto vuoto
        data: {data:lists=[]} = {}, 
        error, 
        //isLoading si riferisce soltanto alla prima richiesta, but not for subsequent requests, per questo usiamo isFetching
        isFetching,
        isSuccess,
        //uso refetch per mostrare lista aggiornata
        refetch:reloadLists 
    } = useGetListsQuery();

    //la mutation ritorna un array in cui il primo parametro è una funzione trigger mutation(chiamata quando clicco pulsante delete) 
    //poi destrutturo il resto della response di mutation
    
    const [
        removeList 
        // ,{isLoading:isDeleting, 
        // isSuccess:isDeleted, 
        // error:deleteError, 
        // isError}
    ] = useDeleteListMutation();

    const [
        addList 
        // ,{isLoading:isAdding, 
        // isSuccess:isAddSuccess, 
        // error:addError, 
        // isError:isAddError}
    ] = useAddListMutation();

    function onRemoveClick(id) {
        removeList(id)
        //unwrap per attaccarci alla promise
        .unwrap()
        .then(()=>{
            toast.info('Lista rimossa');
            //posso commentare la refetch perchè utilizzo i tag per invalidare la cache e renderizzare i nuovi dati
            //reloadLists()
        })
        .catch((err)=>{
            alert(err.message);
            toast.error(err.message);
        })
    }

    const manageClick = (e) => {
        //per non far aggiornare pagina dopo invio del form
        e.preventDefault();
        addList(
            {   name:listEl.current.value,
                user_id: 1
            } 
        );
        listEl.current.value = '';
        toast.info('Lista aggiunta');
    } 

    useEffect(() => {
        //verifico se ho i data quando il componente viene montato
        if(data && data.access_token) {
            console.log('ho dati token');
            //chiamo la store per salvare token in LS e salvare state.user
        }
        if (isSuccess) {toast.success('liste caricate con successo')};
        if (isFetching) {toast.info('Sto caricando le liste')};
        if (!isFetching) {toast.dismiss()};
        if (error) {
            if (error?.data?.message){
                toast.error(error.data.message)
                //aggiorno la store tramite userslice
                dispatch(userLogout());
                //invalido token lato server
                logout();
                //uso Navigate per reindirizzare alla pagina login
                navigate("/login");
            }
            toast.error(error)
        };
        
      return () => {
      };
    }, [error,isFetching,isSuccess,data]);

    return (
        <div className='row d-flex justify-content-center mt-5 pt-5 pb-5'>
            <div className='col-12 col-md-4'>
                <h1>My Lists</h1>
                <AddList element={listEl} manageClick={manageClick} txtBtn={'Aggiungi Lista'}/>
                <ul className="list-group">
                    {
                        lists.map((list) => <List key={list.id} list={list} onRemoveList={(id)=> onRemoveClick(list.id)} />)
                    }
                </ul> 
            </div>
        </div>
    )
}

export default Lists

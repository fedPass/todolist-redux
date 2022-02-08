import React, {useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from '../../service/loginService';
import { userLogout } from './userSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';


function Logout() {
    //dichiaro navigate e dispatch
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //istanzio l'hook della mutation
    const [logout,{error,isSuccess,data}] =useLogoutMutation();
    //quando il componente viene montato (useEffect) o cambia una sua dipendenza
    useEffect(() => {
        //aggiorno la store tramite userslice
        dispatch(userLogout());
        //invalido token lato server
        logout();
        //uso Navigate per reindirizzare alla pagina login
        navigate("/login");
        console.log('montaggio terminato - redirect to login');
        if (error) {toast.error(error.data.error)}
        if (isSuccess) {toast.success('logout effettuato con successo')}
      return () => {};
    }, [navigate,data,error,isSuccess]);
    
    
  return (
      //nel frattempo mostro un messaggio di caricamento
    <div className="alert alert-warning mt-5 pt-4"><i className="fas fa-sign-out-alt"></i>Logout in esecuzione!</div>
  );
}

export default Logout;

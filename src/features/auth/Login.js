import {React, useState, useEffect} from 'react';
import { useLoginMutation } from '../../service/authService';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { userLogin } from './userSlice';
import { useDispatch } from 'react-redux';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    //inizializzo state e funzione che uso per prelevo i dati dagli input
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //istanzio l'hook che ho importato da authService
    //primo arg -> method con cui chiamo l'endpoint
    //sec arg -> oggetto in cui ricevo i dati e info su chiamata
    const [login,{error,isSuccess,data}] = useLoginMutation();

    //console.log(error,isSuccess,data);

    const verifyLogin = (e) => {
        e.preventDefault();
        //la funzione che abbiamo istanziato con la mutation per chiamare l'endpoint relativo
        login({email,password});
        console.log(error,isSuccess,data);
    }

    useEffect(() => {
        //verifico se ho i data quando il componente viene montato
        if(data && data.access_token) {
            console.log('data',data);
            //chiamo la store per salvare token in LS e salvare state.user
            dispatch(userLogin(data));
            //reindirizzo alla pagina /lists
            navigate("/lists");
            console.log('montaggio terminato - redirect to lists');
        }
        if (error) {
          console.log(error);
          toast.error(error.message)
        }
        if (isSuccess) {toast.success('login effettuato con successo')}
        return () => {}
        }, [error, isSuccess,dispatch,navigate,data]);

  return (
    <div className="col-md-3 m-auto">
      <form method='POST' onSubmit={verifyLogin} className="mt-5 pt-5">
        <div className="form-group">
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Email usata per la registrazione" />
        </div>
        <div className="form-group">
          <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" name="password" className="form-control" id="password" placeholder="Password" />
        </div>
        <div className="form-check">
          <input type="checkbox" name="checkbox" className="form-check-input" id="remember" />
          <label className="form-check-label" htmlFor="remember">Remember me</label>
        </div>
        <button type="submit" className="btn btn-primary  mt-3">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
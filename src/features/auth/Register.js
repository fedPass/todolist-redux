import React,{useEffect, useState} from 'react';
import { useRegisterMutation } from '../../service/authService';
import { toast } from 'react-toastify';
import { userRegistration } from './userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    //init state e get data dagli input
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);

    //hook per register mutation
    const [createUser,{error,isSuccess,data}] = useRegisterMutation();

    //il btn di submit si accede se: (gestisco con ternario nell'element)
    //1.se accetta i termini si attiva btn (quindi data di registrazione è data di accettaz policy)
    //2.se la password dei due campi sono uguali

    function verifyRegister(e) {
        if(password.length<5) {
            toast.info('La password deve essere almeno di 5 caratteri')
        }
        e.preventDefault();
        //per verifica lato laravel delle password devo inviarvi password2 come password_confirmation
        createUser({name,email,password,password_confirmation:password2});
        console.log(error,isSuccess,data);
    }

    useEffect(() => {
        //verifico se ho i data quando il componente viene montato
        if(data && data.access_token) {
            console.log('data',data);
            //chiamo la store per salvare token in LS e salvare state.user
            dispatch(userRegistration(data));
            //reindirizzo alla pagina /lists
            navigate("/lists");
            console.log('arrivati dati dopo registrazione - redirect to lists');
        }
        if (isSuccess) {toast.success('user creato con successo')}
        if (error) {
            console.log('error',error);
            const errors = error.data.errors;
            console.log('errors',errors);
            for (const error in errors) {
                if (Object.hasOwnProperty.call(errors, error)) {
                    const element = errors[error][0];
                    console.log('error',element);
                    toast.error(element)
                }
            }
        };
        
      return () => {
      };
    }, [error, isSuccess, data, dispatch, navigate]);
    
  return (
    <div className="col-md-3 m-auto">
        <form method='POST' onSubmit={verifyRegister} className="mt-5 pt-5">
        <div className="form-group">
            <input value={name} onChange={(e)=>setName(e.target.value)} type="text" name="name" className="form-control" id="name" placeholder="Inserisci il tuo nominativo" />
        </div>
        <div className="form-group">
            {/* <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Inserisci la tua email" /> */}
            <input value={email} onChange={(e)=>setEmail(e.target.value)} name="email" className="form-control" id="email" placeholder="Inserisci la tua email" />
        </div>
        <div className="form-group">
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" name="password" className="form-control" id="password" placeholder="Digita la password" />
        </div>
        <div className="form-group">
            <input value={password2} onChange={(e)=>setPassword2(e.target.value)} type="password" name="password2" className="form-control" id="confirmpassword" placeholder="Digita nuovamente la password" />
        </div>
        <div className="form-check">
            <input value={acceptTerms} type="checkbox" name="checkbox" className="form-check-input" id="remember" onChange={(e)=>setAcceptTerms(e.target.checked)}/>
            <label className="form-check-label" htmlFor="remember">
            I accept terms and conditions
            </label>
        </div>
        {/* <button disabled={(password!=password2 && password!='' && password2!='') || (acceptTerms == false) ? true:false} type="submit" id='btnRegister' className="btn btn-primary mt-3">
            Registrati
        </button> */}
        <button type="submit" id='btnRegister' className="btn btn-primary mt-3">
            Registrati
        </button>
        </form>
    </div>
  )
}

export default Register;

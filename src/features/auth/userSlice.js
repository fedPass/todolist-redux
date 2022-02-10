import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    user:null,
    token:null
};
//verifico se ho il token salvato in local storage
const todoData= localStorage.getItem('todolist-data');
//se esiste verifichiamo il token che parsifichiamo il json visto che viene passato come stringa
if (todoData) {
    console.log('stoo dentro if in userSlice - se sono già loggato');
    const data = JSON.parse(todoData);
    //se esiste data verifica il token
    if(data && data.access_token) {
        //il token è formato da header.content.passkey, splitto per prendere il content
        //utilizziamo atob per decodificare il token
        const tokenInfoNoA = data.access_token.split('.')[1];
        const tokenInfoNoP = atob(data.access_token.split('.')[1]);
        const tokenInfo = JSON.parse(atob(data.access_token.split('.')[1]));
        console.log('tokenInfo no atob',tokenInfoNoA);
        console.log('tokenInfo no json parse',tokenInfoNoP);
        console.log('tokenInfo',tokenInfo);
        //recupero la data in cui scade
        const tokenExpData = new Date(tokenInfo.exp*1000);
        console.log('token expires >',tokenExpData);
        //controllo che sia scaduto il token
        if(tokenExpData < (new Date()) ) {
            //refresh or delete token
            localStorage.removeItem('todolist-data');
            console.log('token scaduto');
        } else {
            //se il token è valido imposta initialState con i dati utente ritornati dal server
            initialState = {
                user:{
                    name:data.name,
                    email: data.email
                },
                token:{token:data.access_token}
                
            }
        }
    }
}

const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        //non lavoriamo mai direttamente sullo state ma su una specie di proxy (draft)
        //in questo modo non ho bisogno di fare return 
        //perchè modifichiamo le proprietà dell'oggetto
        //REGOLA: o modifico draft o faccio return del nuovo state
        userLogin(draft, action) {
            console.log('sto dentro userSlice - userLogin');
            //prendiamo stato attuale
            const data = action.payload;
            //se ci sono i dati
            if(data && data.name) {
                //salv i dati in local storage
                localStorage.setItem('todolist-data', JSON.stringify(data));
                //impostiamo il nuovo stato
                draft.user={
                    name:data.name,
                    email: data.email
                }
                draft.token=data.access_token
            } else {
                draft.user = null;
                draft.token = null;
            }
        },
        userLogout(draft) {
            console.log('sto dentro userSlice - userLogout');
            //elimino token da LS
            localStorage.removeItem('todolist-data');
            console.log('token rimosso da LS');
            //imposto lo state di user a null
            draft.user = null;
            draft.token = null;
        },
        userRegistration(draft, action) {
            console.log('sto dentro userSlice - userRegistration');
            //prendiamo stato attuale
            const data = action.payload;
            //se ci sono i dati
            if(data && data.name) {
                //salv i dati in local storage
                localStorage.setItem('todolist-data', JSON.stringify(data));
                //impostiamo il nuovo stato
                draft.user={
                    name:data.name,
                    email: data.email
                }
                draft.token=data.access_token
            } else {
                draft.user = null;
                draft.token = null;
            }
        },
    }
})
  
export const { userLogin, userLogout,userRegistration } = userSlice.actions;
export default userSlice.reducer

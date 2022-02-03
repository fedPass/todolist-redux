import { createSlice } from '@reduxjs/toolkit';

let initialState = null;
//verifico se ho il token salvato in local storage
const todoData= localStorage.getItem('todolist-data');
//se esiste verifichiamo il token che parsifichiamo il json visto che viene passato come stringa
if (todoData) {
    console.log('userSlice');
    const data = JSON.parse(todoData);
    //se esiste data verifica il token
    if(data && data.access_token) {
        //il token è formato da header.content.passkey, splitto per prendere il content
        //utilizziamo atob per decodificare il token
        const tokenInfo = JSON.parse(atob(data.access_token.split('.')[1]));
        //recupero la data in cui scade
        const tokenExpData = new Date(tokenInfo.expires_in*1000);
        console.log('token expires ',tokenExpData);
        //controllo che sia scaduto il token
        if(tokenExpData < (new Date()) ) {
            //refresh or delete token
            localStorage.deleteItem('todolist-data');
        } else {
            //se il token è valido imposta initialState con i dati utente ritornati dal server
            initialState = {
                name:data.name,
                email: data.email
            }
        }
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      userLogin(state, action) {
          console.log('userSlice');
          //prendiamo stato attuale
        const data = action.payload;
        //se ci sono i dati
        if(data && data.name) {
            //salv i dati in local storage
            localStorage.setItem('todolist-data', JSON.stringify(data));
            //impostiamo il nuovo stato
            state={
                name:data.name,
                email: data.email
            }
        } else {
            state = null;
        }
        return state;
      },
    },
  })
  
  export const { userLogin } = userSlice.actions;
  export default userSlice.reducer
import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

function PrivateRoute({children}) {
    //recupero user dallo stato
    const user = useSelector(state=>state.auth.user);
    //const user = localStorage.getItem('todolist-data')
    //ritornami se ho user la route privata da raggiungere altrimenti rimandami al login
    return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;

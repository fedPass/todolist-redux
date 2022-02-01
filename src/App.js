import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import MyTodos from './features/todos/MyTodos';
import Lists from './features/lists/Lists';
import Header from './components/Header';
import EditListName from './features/lists/EditListName';
import Login from "./features/auth/Login";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route exact path='/' element={<Lists/>} />
          <Route path='/login' element={<Login/>} />
          <Route path="/lists" element={<Lists/>} />
          <Route path="/todos" element={<MyTodos/>} />
          <Route path='/list/:id/todos' element={<MyTodos/>} />
          <Route path='/list/:id/edit' element={<EditListName/>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="bottom-right"
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover />
    </div>
  );
}

export default App;

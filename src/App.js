import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import MyTodos from './features/todos/MyTodos';
import Lists from './features/lists/Lists';
import Header from './components/Header';
import EditListName from './features/lists/EditListName';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route exact path='/' element={<Lists/>} />
          <Route path="/lists" element={<Lists/>} />
          <Route path="/todos" element={<MyTodos/>} />
          <Route path='/list/:id/todos' element={<MyTodos/>} />
          <Route path='/list/:id/edit' element={<EditListName/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export   const addTodo = (name) => {
     //creo nuovo oggetto per nuovo todo
      const newtodo = {
        name,
        dueDate: new Date().toLocaleDateString(),
        user_id: 1,
        id: 4
      };
      //ritorno il nuovo oggetto allo store che lo avvolgerà in un metodo dispatch
      return {type:'ADD_TODO',payload:newtodo}
  };

export const removeTodo = (todo) => {
    //ritorna il todo da rimuovere
    return {type:'REMOVE_TODO',payload:todo}
}
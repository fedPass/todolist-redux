import { todo_url,filter_url } from '../config';

export const fetchTodos = async () => {
    return fetch(todo_url).then(res => res.json()).then(res => res);
}

export const fetchFilter = async () => {
    return fetch(filter_url).then(res => res.json()).then(res => res);
}

export const removeTodo = async (todo) => {
    //console.log('deleting el '+todo.id);
    return fetch(todo_url+'/'+todo.id,
    {
        method:'DELETE'
    }).then(res => res.json()).then(res => res);
}

export const addNewTodo = async (todo) => {
    return fetch(todo_url,
    {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(todo)
    }).then(res => res.json()).then(res => res);
}

export const changeCompleted = async (todo) => {
    return fetch(todo_url+'/'+ todo.id,
    {
        method:'PUT',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(todo)
    }).then(res => res.json()).then(res => res);
}

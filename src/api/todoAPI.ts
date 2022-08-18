import axios from 'axios';



const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '938d5b70-0da7-4cf1-845c-1367ca037db0'
    }
})



export const TodoAPI = {
    getTodos() {
        return instance.get('todo-lists')
    },
    createTodo(title: string){
        return instance.post('todo-lists', {title})
    },
    deleteTodo(todolistId: string){
        return instance.delete(`todo-lists/${todolistId}`)
    },
    updateTodo(){

    }
}


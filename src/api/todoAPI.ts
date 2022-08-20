import axios, {AxiosResponse} from 'axios';


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '938d5b70-0da7-4cf1-845c-1367ca037db0'
    }
})


//обязательная типизация возвращаемых данных из запросов
export type TodoType = {
    id: string;
    title: string;
    addedDate: string;
    order: number;
};
export type CommonResponseTodoType<T = {}> = {
    messages: string[];
    fieldsErrors: string[];
    resultCode: number;
    data: T
}


export type TaskType = {
    id: string;
    title: string;
    description?: string;
    todoListId: string;
    order: number;
    status: number;
    priority: number;
    startDate?: any;
    deadline?: any;
    addedDate: string;
}
export type CommonResponseTaskType<T = {}> = {
    data: T
    messages: string[];
    fieldsErrors: string[];
    resultCode: number;

}


//todo CRUD
export const TodoAPI = {
    getTodos() {
        return instance.get<TodoType[]>('todo-lists')
    },
    //типизация даты { очень сложно }
    createTodo(title: string) {
        return instance.post<'', AxiosResponse<CommonResponseTodoType<{ item: TodoType }>>,
            { title: string }>('todo-lists', {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<CommonResponseTodoType>(`todo-lists/${todolistId}`)
    },
    updateTodo({todolistId, title}: { todolistId: string, title: string }) {
        return instance.put<CommonResponseTodoType>(`todo-lists/${todolistId}`, {title})
    },

    //tasks CRUD
    getTasks(todolistId: string) {
        return instance.get<TaskType[]>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<CommonResponseTaskType<TaskType>>(`/todo-lists/${todolistId}/tasks`,
            {title})
    },
    updateTask(p: { todolistId: string, taskId: string, title: string }) {
        return instance.put<CommonResponseTaskType>(`/todo-lists/${p.todolistId}/tasks/${p.taskId}`,
            {title: p.title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<CommonResponseTaskType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
}

import React, {useEffect, useState} from 'react'
import {TodoAPI} from '../api/todoAPI';

export default {
    title: 'API'
}
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '938d5b70-0da7-4cf1-845c-1367ca037db0'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        TodoAPI.getTodos()
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let title = 'НОВЫЙ ТУДУЛИСТ'
        TodoAPI.createTodo(title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = '2bde2fd6-07c8-44f6-94c1-167fde6d0faa'
    TodoAPI.deleteTodo(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = '07734a43-5f51-4680-b7ef-830a25632265'
        let title = 'ОБВНОВЛЕННЫЙ ТУДУЛИСТ'
        TodoAPI.updateTodo({todolistId, title})
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '11ae8c48-9edc-47b4-b3e0-9fe1410418f1'
        TodoAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '11ae8c48-9edc-47b4-b3e0-9fe1410418f1'
        const title = 'НОВАЯ ТАСКА 4'
        TodoAPI.createTask(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '11ae8c48-9edc-47b4-b3e0-9fe1410418f1'
        const title = 'ОБВНОВЛЕННАЯ ТАСКА'
        const taskId = 'fdd9343c-a70d-474b-8472-4946a1d6d7f9'
        TodoAPI.updateTask({todolistId, taskId, title})
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '6885bbcd-0daf-47de-9049-a1f76cdc40e8'
        const taskId = '47628e41-365a-4941-bc0b-74d545b68835'
        TodoAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
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
    const [title, setTitle] = useState<string>('')


const createTodolist = ()=> {
    TodoAPI.createTodo(title)
        .then((res) => {
            setState(res.data)
        })
}
    return <div>{JSON.stringify(state)}
        <div>
            <input
                placeholder={'title'}
                value={title}
                onChange={(e) => {
                    setTitle(e.currentTarget.value)
                }}
            />
            <button onClick={createTodolist}>CREATE TODOLIST</button>
        </div>

    </div>
}



export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTodolist = ()=> {
        TodoAPI.deleteTodo(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input
                placeholder={'todolistId'}
                value={todolistId}
                onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}
            />
            <button onClick={deleteTodolist}>DELETE TODOLIST</button>
        </div>

    </div>
}



export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const updateTodolistTitle = () => {
        TodoAPI.updateTodo({todolistId, title})
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}

        <div>
            <input
                placeholder={'todolistId'}
                value={todolistId}
                onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}
            />
            <input
                placeholder={'title'}
                value={title}
                onChange={(e) => {
                    setTitle(e.currentTarget.value)
                }}
            />
            <button onClick={updateTodolistTitle}>UPDATE TOTLIST TITLE</button>
        </div>
    </div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')


    const getTasks = () => {
        TodoAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input
                placeholder={'todolistId'}
                value={todolistId}
                onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}
            />
            <button onClick={getTasks}>GET TASKS</button>
        </div>

    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')


    const createTask = () => {
        TodoAPI.createTask(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input
                placeholder={'todolistId'}
                value={todolistId}
                onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}
            />
            <input
                placeholder={'title'}
                value={title}
                onChange={(e) => {
                    setTitle(e.currentTarget.value)
                }}
            />
            <button onClick={createTask}>CREATE TASKS</button>
        </div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const updateTask = () => {
        TodoAPI.updateTask({todolistId, taskId, title})
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input
                placeholder={'todolistId'}
                value={todolistId}
                onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}
            />
            <input
                placeholder={'taskId'}
                value={taskId}
                onChange={(e) => {
                    setTaskId(e.currentTarget.value)
                }}
            />
            <input
                placeholder={'title'}
                value={title}
                onChange={(e) => {
                    setTitle(e.currentTarget.value)
                }}
            />
            <button onClick={updateTask}>UPDATE TASKS</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const deleteTask = () => {
        TodoAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input
                placeholder={'todolistId'}
                value={todolistId}
                onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}
            />
            <input
                placeholder={'taskId'}
                value={taskId}
                onChange={(e) => {
                    setTaskId(e.currentTarget.value)
                }}
            />
            <button onClick={deleteTask}>DELETE TASK</button>
        </div>

    </div>
}
import {TasksStateType} from '../../app/App';
import {addTodolistAC, removeTodolistAC, setTodolistAC} from './todolists-reducer';
import {TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../../api/todolists-api'
import {Dispatch} from 'redux';
import {AppRootStateType, AppThunkType} from '../../app/store';
import {setAppStatusAC} from '../../app/appReducer';
import {AxiosError} from 'axios';
import {handleAppError, handleNetworkError} from '../../helpers/errorHelpers';


export const removeTaskAC = (taskId: string, todolistId: string) => ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => ({
    type: 'CHANGE-TASK-STATUS', status, todolistId, taskId
} as const)
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => ({
    type: 'CHANGE-TASK-TITLE', title, todolistId, taskId
} as const)
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({
    type: 'SET-TASKS', todolistId, tasks
} as const)

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TaskActionsType): TasksStateType => {

    switch (action.type) {
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'SET-TASKS': {
            return {...state, [action.todolistId]: action.tasks}
        }

        case 'ADD-TASK': {
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        }
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(f => f.id !== action.taskId)
            }
        }


        case 'CHANGE-TASK-STATUS': {
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, status: action.status} : t)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }

        default:
            return state;
    }
}


export const setTasksTC = (todolistId: string): AppThunkType => {

    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(setTasksAC(todolistId, res.data.items))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const deleteTaskTC = (todolistId: string, taskId: string): AppThunkType => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                dispatch(removeTaskAC(taskId, todolistId))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const addTaskTC = (todolistId: string, title: string): AppThunkType => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTask(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleAppError(dispatch, res.data)
            }
        })
        .catch((err: AxiosError) => {
            handleNetworkError(dispatch, err.message)
        })
}

export const changeTaskTitleTC = (taskId: string, title: string, todolistId: string): AppThunkType => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.updateTaskTitle(taskId, title, todolistId)
        .then((res) => {
            dispatch(changeTaskTitleAC(taskId, title, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
}


export const updateTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const state = getState()
    const changedTask = state.tasks[todolistId].find(t => {
        return t.id === taskId
    })
    if (changedTask) {
        const model: UpdateTaskModelType = {
            title: changedTask.title, status,
            deadline: changedTask.deadline,
            description: changedTask.description,
            priority: changedTask.priority,
            startDate: changedTask.startDate,
        }
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.updateTask(todolistId, taskId, model)
            .then((res) => {
                dispatch(changeTaskStatusAC(taskId, status, todolistId))
                dispatch(setAppStatusAC('succeeded'))
            })
    }

}

export type TaskActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistAC>

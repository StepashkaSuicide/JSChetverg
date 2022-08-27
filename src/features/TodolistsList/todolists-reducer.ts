import {v1} from 'uuid';
import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from 'redux';
import {AppThunkType} from '../../app/store';


export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolistId} as const
}
export const addTodolistAC = (todolist: TodolistType) => {
    return {type: 'ADD-TODOLIST', todolist} as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title} as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter} as const
}
export const setTodolistAC = (todolists: TodolistType[]) => {
    return {type: 'SET-TODOLISTS', todolists} as const
}

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState,
                                 action: TodolistActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.todolists.map(t => ({...t, filter: 'all'}))
        case 'REMOVE-TODOLIST': {
            return state.filter(t => t.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{...action.todolist,  filter: 'all' }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(t=>t.id===action.id ? {...t, title: action.title}: t)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(t=> t.id===action.id ? {...t, filter: action.filter}: t)
        }
        default:
            return state;
    }
}

//Thunk = function чаще всего ничего не возвращает
export const getTodosTC = (): AppThunkType => (dispatch: Dispatch<TodolistActionsType>) => {
    todolistsAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistAC(res.data))
        })
}

export const removeTodolistTC = (todolist: string): AppThunkType=>(dispatch: Dispatch<TodolistActionsType>)=>{
        todolistsAPI.deleteTodolist(todolist)
            .then((res)=> {
                dispatch(removeTodolistAC(todolist))
            })
}

export const createTodolistTC = (title: string)=>(dispatch: Dispatch<TodolistActionsType>)=> {
    todolistsAPI.createTodolist(title)
        .then((res)=> {
            dispatch(addTodolistAC(res.data.data.item))
        })
}

export const updateTodolistTitleTC = (id: string, title: string)=>(dispatch: Dispatch<TodolistActionsType>)=>{
    todolistsAPI.updateTodolist(id, title)
        .then((res)=> {
            dispatch(changeTodolistTitleAC(id, title))
        })
}

//types
export type TodolistActionsType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistAC>

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}




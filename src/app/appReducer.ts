export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed' | 'Some error occurred'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType)=> {
    return {
        type: 'APP/SET-STATUS',
        status
    }as const
}

export const setAppErrorAC = (error: null | string)=> {
    return {
        type:'APP/SET-ERROR',
        error
    }as const
}




export type AppActionsType = ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
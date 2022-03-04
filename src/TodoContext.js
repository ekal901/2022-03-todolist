import React, {createContext, useContext, useReducer, useRef} from 'react'

const initialTodos = [
    {
        id: 1,
        text: '111',
        done: true
    },
    {
        id: 2,
        text: '222',
        done: true
    },
    {
        id: 3,
        text: '333',
        done: false
    },
    {
        id: 4,
        text: '444',
        done: false
    }
]

// action : create, toggle, remove
function TodoReducer(state, action) {
    switch(action.type) {
        case "CREATE":
            return state.concat(action.todo);
        case "TOGGLE":
            return state.map(todo => todo.id === action.id ? { ...todo, done: !todo.done} : todo)
        case "REMOVE":
            return state.filter(todo => todo.id !== action.id)
        default:
            throw new Error(`Unhandled action Type:  ${action.type}`)
    }
}

const TodoStateContext = createContext()
const TodoDispatchContext = createContext()
const TodoNextIdContext = createContext()

export function TodoProvider({children}) {
    const [state, dispatch] = useReducer(TodoReducer, initialTodos)
    const nextId = useRef(5)

    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext value={nextId}>{children}</TodoNextIdContext>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    )
}

// custom hook
export function useTodoState() {
    const context = useContext(TodoStateContext)
    if(!context) {
        throw new Error('Cannot find TodoProvider')
    }
    return context;
}

export function useTodoDispatch() {
    const context = useContext(TodoDispatchContext)
    if(!context) {
        throw new Error('Cannot find TodoDispatch')
    }
    return context;
}

export function useTodoNextId() {
    const context = useContext(TodoNextIdContext)
    if(!context) {
        throw new Error('Cannot find TodoNextId')
    }
    return context;
}
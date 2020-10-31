import {combineReducers} from "redux"

const layoutState={
    theme: 'main',
    selectedLink: 'dashboard'
}
const userState={
    user: JSON.parse(localStorage.getItem('manager')) || {}
    
}

function managerReducer(state=userState,action){
    switch(action.type){
        case "UPDATE_PROFILE":
            return {user:{...state.user, ...action.payload}};
        case "SET_CURRENT_MANAGER":
            return {...state,user:{...state.user, ...action.payload}};
        case "MANAGER_LOGIN_FAILED":
            return {loginStatus:{success: false, message: action.payload}};
        case "LOGOUT":
            return userState

        default: return state//throw Error('Invalid action!');
    }   
}

function managerLayoutReducer(state=layoutState,action){
    switch(action.type){
        case "UPDATE_SELECTED_NAVLINK":
            return {...state, selectedLink:action.payload.selectedLink};

        default: return state//throw Error('Invalid action!');
    }   
}


const combined=combineReducers({
    managerReducer,
    managerLayoutReducer
})

export default combined
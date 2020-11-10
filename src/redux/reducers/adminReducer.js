import {combineReducers} from "redux"

const layoutState={
    theme: 'main',
    selectedLink: 'dashboard'
}
const userState={
    user: JSON.parse(localStorage.getItem('manager')) || JSON.parse(localStorage.getItem('enseignant')) || {},
    adminType: JSON.parse(localStorage.getItem('enseignant'))!==null?"enseignant" : "manager",
    status:{
        // loginStatus:{success: true, message: "Connexion réussie"}
    }
    
}

function adminReducer(state=userState,action){
    switch(action.type){
        case "UPDATE_PROFILE":
            return {...state,user:{...state.user, ...action.payload}};
        case "SET_CURRENT_MANAGER":
            return {...state,user:{...state.user, ...action.payload},adminType:"manager"};
        case "SET_CURRENT_TEACHER":
            return {...state,user:{...state.user, ...action.payload},adminType:"enseignant"};
        case "MANAGER_LOGIN_FAILED":
            return {...state,status: {...state.status,loginStatus:{success: false, message: action.payload}}};
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
    adminReducer,
    managerLayoutReducer
})


export default combined
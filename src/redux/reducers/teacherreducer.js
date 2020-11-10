import {combineReducers} from "redux"

const layoutState={
    theme: 'main',
    selectedLink: 'dashboard'
}
const userState={
    user: JSON.parse(localStorage.getItem('enseignant')) || {},
    adminType: "enseignant"
}

function managerReducer(state=userState,action){
    switch(action.type){
        case "UPDATE_PROFILE":
            return {user:{...state.user, ...action.payload}};

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
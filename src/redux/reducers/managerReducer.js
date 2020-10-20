import {combineReducers} from "redux"

const layoutState={
    theme: 'main',
    selectedLink: 'dashboard'
}
const userState={
    user: {
       
            avatar:'assets/Dummy/Avatars/avatar_4.png',
            nom: 'Yassice',
            prenom: 'Djebarri',
            email: 'yassinedjebari@gmail.com',
            phone: '0555101010',
            jobTitle: "graphic Designer",
         

    }
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
const layoutState={
    theme: 'main'
}
const userState={
    user: {
       
            avatar:'logo192.png',
            nom: 'Yassice',
            prenom: 'Djebarri',
            email: 'yassinedjebari@gmail.com',
            phone: '0555101010',
            jobTitle: "graphic Designer",
         

    }
}

function managerReducer(state=userState,action){
    if(!action.payload) return state;
    switch(action.type){
        case "UPDATE_PROFILE":
            // state={...state,...action.payload}
            console.log('new state',state);
            return Object.assign({}, state, action.payload);

        default: throw Error('Invalid action!');
    }   
}


const exports={
    managerReducer
}

export default exports
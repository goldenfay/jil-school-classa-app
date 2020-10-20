const updateProfile=(payload)=>{
    return { type: 'UPDATE_PROFILE', payload}
}



/******************************************** LAYOUT ACTIONS *****************************************/ 
const updateSelectedLink=(payload)=>{
    return { type: 'UPDATE_SELECTED_NAVLINK', payload}
}

const exports={
    updateProfile,
    updateSelectedLink
}

export default exports
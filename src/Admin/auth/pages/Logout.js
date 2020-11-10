import React from 'react'
import { connect } from 'react-redux'
import Actions from '../../../redux/actions/managerActions'
export const Logout = (props) => {
    props.logout();
    window.location.assign('/login');
    

    return (
        <div>
            
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps =(dispatch) =>({
    logout: ()=> dispatch(Actions.logout())
    
})

export default connect(mapStateToProps, mapDispatchToProps)(Logout)

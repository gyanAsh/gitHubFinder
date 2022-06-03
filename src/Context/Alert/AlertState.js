import React, { useReducer } from 'react';
import { SET_ALERT, REMOVE_ALERT } from '../Types';
import AlertContext from './AlertContext';
import AlertReducer from './AlertReducer'

const AlertState = (props) => {
    const initialState = {
        alert:null
    }
    const [state, dispatch] = useReducer(AlertReducer, initialState);

    const setAlert = (msg) => dispatch({
        type: SET_ALERT,
        payload: msg
    })

    const clearAlert=()=> dispatch({type:REMOVE_ALERT})
    
    return <AlertContext.Provider
        value={{
            alert: state.alert,
            setAlert,
            clearAlert
        }}
    >
        {props.children}
    </AlertContext.Provider>
}

export default AlertState;
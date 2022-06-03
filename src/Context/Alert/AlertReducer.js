import { SET_ALERT, REMOVE_ALERT} from '../Types'

const Reducer = (state, action) => {
    switch (action.type) {
        case SET_ALERT:
            return {
                alert: action.payload
            }
        case REMOVE_ALERT:
            return {
                alert:null
            }
        default:
            return state;
    }
}

export default Reducer;
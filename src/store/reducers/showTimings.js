import { GET_SHOW_TIMINGS} from '../actions/theater'

export default function showTimings( state={}, action) {
    switch(action.type) {
        case GET_SHOW_TIMINGS: return action.showTimings
        default: return state
    }
}
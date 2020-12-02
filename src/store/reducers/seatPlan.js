import { SET_SEAT_PLAN} from '../actions/theater'

export default function seatPlan( state={}, action) {
    switch(action.type) {
        case SET_SEAT_PLAN: return action.seatPlan
        default: return state
    }
}
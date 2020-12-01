import { GET_ALL_THEATERS } from '../actions/theater'

export default function theatersList( state={}, action) {
    switch(action.type) {
        case GET_ALL_THEATERS: return action.theatersList
        default: return state
    }
}
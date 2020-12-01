import { SET_SELECTED_THEATER } from '../actions/city'

export default function selectedTheater( state={}, action) {
    switch(action.type) {
        case SET_SELECTED_THEATRE: return action.theatre
        default: return state
    }
}
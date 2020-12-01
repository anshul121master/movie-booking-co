import { SET_SELECTED_THEATER } from '../actions/theater'

export default function selectedTheater( state={}, action) {
    switch(action.type) {
        case SET_SELECTED_THEATER: return action.theatre
        default: return state
    }
}
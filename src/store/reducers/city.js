import { SET_SELECTED_CITY } from '../actions/city'

export default function selectedCity( state={}, action) {
    switch(action.type) {
        case SET_SELECTED_CITY: return action.city
        default: return state
    }
}
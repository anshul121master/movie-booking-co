import { SET_SELECTED_SCREEN } from '../actions/screen'

export default function selectedScreen( state={}, action) {
    switch(action.type) {
        case SET_SELECTED_SCREEN: return action.screen
        default: return state
    }
}
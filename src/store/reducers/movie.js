import { SET_SELECTED_MOVIE } from '../actions/movie'

export default function selectedMovie( state={}, action) {
    switch(action.type) {
        case SET_SELECTED_MOVIE: return action.movie
        default: return state
    }
}
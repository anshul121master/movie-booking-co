import { GET_ALL_MOVIES } from '../actions/movie'

export default function moviesList( state=[], action) {
    switch(action.type) {
        case GET_ALL_MOVIES: return action.moviesList
        default: return state
    }
}

export const SET_SELECTED_MOVIE = 'SET_SELECTED_MOVIE'
export const GET_ALL_MOVIES = 'GET_ALL_MOVIES'


// add selected movie action creator
export function setSelectedMovie(movie) {
    return {
        type: SET_SELECTED_MOVIE,
        movie    
    } 
}

export function getAllMovies(moviesList){
    return {
        type: GET_ALL_MOVIES,
        moviesList
    }
}



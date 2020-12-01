import { setSelectedCity } from './city';
import { getAllMovies, setSelectedMovie } from './movie';
import { getMovies, getTheaters, getScreens } from '../../utils/api';
import { getAllTheaters, setSelectedTheater, setShowTimings } from './theater';


export function setCityAndMoviesList(city) {
    return (dispatch) => {
        //dispatch selected city to store
        dispatch(setSelectedCity(city));
        //api call to fetch all movies in the selected city and dispatch the moviesList to store
        getMovies(city.id).then(moviesList => moviesList.json())
        .then(moviesList => dispatch(getAllMovies(moviesList)))
    }
}

export function setMovieAndTheaterList(movie) {
    return (dispatch, getState) => {
        const {selectedCity} = getState();
        dispatch(setSelectedMovie(movie));
        getTheaters(selectedCity.id, movie.movieId)
        .then(theatersList => dispatch(getAllTheaters(theatersList)))
    }
}

export function setTheaterAndShowTimings(theater) {
    return (dispatch, getState) => {
        const {selectedMovie} = getState();
        dispatch(setSelectedTheater(theater));
        getScreens(selectedMovie.movieId, theater.theaterId)
        .then(showTimings => dispatch(setShowTimings(showTimings)))
    }
}

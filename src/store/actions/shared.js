import { setSelectedCity } from './city';
import { getAllMovies, setSelectedMovie } from './movie';
import { getMovies, getTheaters, getSeatPlan, lockSeats } from '../../utils/api';
import { getAllTheaters, setSeatPlan, setSelectedTheater, setShowTimings } from './theater';
import { setSelectedScreen } from './screen';
import { useForkRef } from '@material-ui/core';


export const SET_SEATS_AND_PRICE = 'SET_SEATS_AND_PRICE'

export function setCityAndMoviesList(city) {
    return (dispatch) => {
        //dispatch selected city to store
        dispatch(setSelectedCity(city));
        //api call to fetch all movies in the selected city and dispatch the moviesList to store
        getMovies(city.id)
            .then(moviesList => dispatch(getAllMovies(moviesList)))
    }
}

export function setMovieAndTheaterList(movie, setMovie = true) {
    return (dispatch, getState) => {
        const { selectedCity } = getState();
        if (setMovie) {
            dispatch(setSelectedMovie(movie));
        }
        getTheaters(selectedCity.id, movie.movieId)
            .then(theatersList => dispatch(getAllTheaters(theatersList)))
    }
}

export function setTheaterAndSeatPlan(theater, seatPlanId, screen) {
    return (dispatch) => {
        dispatch(setSelectedTheater(theater));

        dispatch(setSelectedScreen(screen));

        getSeatPlan(seatPlanId)
            .then(seatPlan => dispatch(setSeatPlan(seatPlan)))
    }
}

function lockSeatsAndPrice(selectedSeats, price) {
    return {
        type: SET_SEATS_AND_PRICE,
        selectedSeats,
        price
    }
}

export function setSeatsAndPrice(selectedSeats, seatPlanId, price) {
    return (dispatch) => {
        lockSeats(seatPlanId, selectedSeats).then(response => response ?
            dispatch(lockSeatsAndPrice(selectedSeats, price)) : console.error('error'))
    }
}



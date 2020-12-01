import  selectedCity  from './city'
import  moviesList from './moviesList'
import  selectedMovie from './movie'
import  theatersList from './theatersList'
import  selectedTheater from './theater' 
import showTimings from './showTimings'


import { combineReducers } from 'redux'


export default combineReducers({
    selectedCity,
    moviesList,
    selectedMovie,
    theatersList,
    selectedTheater,
    showTimings
})
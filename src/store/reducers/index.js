import selectedCity from './city'
import moviesList from './moviesList'
import selectedMovie from './movie'
import theatersList from './theatersList'
import selectedTheater from './theater'
import seatPlan from './seatPlan'
import seatsAndPrice from './seatsAndPrice'
import selectedScreen from './screen'

import { combineReducers } from 'redux'


export default combineReducers({
    selectedCity,
    moviesList,
    selectedMovie,
    theatersList,
    selectedTheater,
    selectedScreen,
    seatPlan,
    seatsAndPrice,
})
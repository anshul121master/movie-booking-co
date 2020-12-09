import selectedCity from './city'
import moviesList from './moviesList'
import selectedMovie from './movie'
import theatersList from './theatersList'
import selectedTheater from './theater'
import seatPlan from './seatPlan'
import seatsAndPrice from './seatsAndPrice'
import authedUser from './authedUser'

import { combineReducers } from 'redux'


export default combineReducers({
    authedUser,
    selectedCity,
    moviesList,
    selectedMovie,
    theatersList,
    selectedTheater,
    seatPlan,
    seatsAndPrice,
})

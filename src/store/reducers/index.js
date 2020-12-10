import selectedCity from './city'
import moviesList from './moviesList'
import selectedMovie from './movie'
import theatersList from './theatersList'
import selectedTheater from './theater'
import seatPlan from './seatPlan'
import seatsAndPrice from './seatsAndPrice'
import selectedScreen from './screen'
import authedUser from './authedUser'
import loading from './loading'
import { combineReducers } from 'redux'


export default combineReducers({
    loading,
    authedUser,
    selectedCity,
    moviesList,
    selectedMovie,
    theatersList,
    selectedTheater,
    selectedScreen,
    seatPlan,
    seatsAndPrice,
})

import { SET_SEATS_AND_PRICE} from '../actions/shared'

export default function seatsAndPrice( state={}, action) {
    switch(action.type) {
        case SET_SEATS_AND_PRICE: return {
            selectedSeats: action.selectedSeats,
            price: action.price
        }
        default: return state
    }
}
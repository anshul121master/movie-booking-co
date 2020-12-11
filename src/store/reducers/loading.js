import { SET_LOADING } from '../actions/loading';

export default function loading(state = false, action) {
  if (action.type === SET_LOADING) {
    return action.loading;
  }
  return state;
}
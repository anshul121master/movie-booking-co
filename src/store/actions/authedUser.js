import { login } from "../../utils/api";
import { setLoading } from "./loading";

export const SET_AUTHED_USER = "SET_AUTHED_USER";

function setAuthedUser(authedUser) {
  return {
    type: SET_AUTHED_USER,
    authedUser,
  };
}

export function handleAuthedUser(userCredentials) {
  return (dispatch) => {
    dispatch(setLoading(true));
    return login(userCredentials).then(authedUser => {
      //dispatch loading false
      dispatch(setLoading(false));
      dispatch(setAuthedUser(authedUser))
    });
  };
}

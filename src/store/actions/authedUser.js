import { login } from "../../utils/api";

export const SET_AUTHED_USER = "SET_AUTHED_USER";

function setAuthedUser(userDetails) {
  return {
    type: SET_AUTHED_USER,
    userDetails,
  };
}

export function handleAuthedUser(userCredentials) {
  return (dispatch) => {
    login(userCredentials).then((userDetails) => {
      if (userDetails.error === undefined)
        return dispatch(setAuthedUser(userDetails));
    });
  };
}

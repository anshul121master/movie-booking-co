import { login, logout, getUserData } from "../../utils/api";
import { setLoading } from "./loading";

export const SET_AUTHED_USER = "SET_AUTHED_USER";

function setAuthedUser(authedUser) {
  return {
    type: SET_AUTHED_USER,
    authedUser,
  };
}

export function handleAuthedUser(userCredentials = null) {
  return (dispatch) => {
    dispatch(setLoading(true));
    if(userCredentials === null){
      return getUserData().then(authedUser => {
      //dispatch loading false
      dispatch(setLoading(false));
      dispatch(setAuthedUser(authedUser))
    });
    }else{
      return login(userCredentials).then(authedUser => {
      //dispatch loading false
      dispatch(setLoading(false));
      dispatch(setAuthedUser(authedUser))
    });
    }
   
  };
}

export function handleLogoutUser() {
  return (dispatch) => {
    dispatch(setLoading(true));
    return logout().then(resp => {
        //dispatch loading false
      dispatch(setLoading(false));
      if(resp.exception === null){
        dispatch(setAuthedUser(null))
      }
    });
  };
}

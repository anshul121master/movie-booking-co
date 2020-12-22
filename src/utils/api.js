import { api, mockApi } from "../config/apiConfig";

export const mockEnabled = true;
const endpoints = mockEnabled ? mockApi : api;

//api's for user journey

//signin
export const login = (userCredentials) => {
  let reqObj = {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userCredentials),
  };
  const url = endpoints.login();
  return fetch(url, reqObj).then(resp => resp.json());
};

export const logout = () => {
  let reqObj = {
    method: "POST",
    credentials: "same-origin",
  };
  const url = endpoints.logout();
  return fetch(url, reqObj).then(resp => resp.json());
};


//signup
export const signup = (userInfo) => {
  let reqObj = {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  };
  const url = endpoints.signup();
  return fetch(url, reqObj).then((resp) => {
    if (resp.ok) {
      return resp.json().then(({ response }) => ({
        status: resp.status,
        response: "Verification link has been sent to your registered email id. Please verify your account before login."
      }))
    } else {
      return resp.json().then(({ exception }) => ({
        status: resp.status,
        exception
      }))
    }
  });
};

export const getProfile = () => {
  const url = endpoints.profile();
  return fetch(url).then((resp) => {
    if (resp.ok) {
      return resp.json().then(({ response }) => ({
        status: resp.status,
        response
      }))
    }
    else {
      return resp.json().then(({ exception }) => ({
        status: resp.status,
        exception
      }))
    }
  });
};

export const getUserData = () => {
  const url = endpoints.profile();
  return fetch(url).then(resp => {
      return resp.json().then(res =>{
        if(res.status !== undefined && res.status === 403){
          return {
            response:null,
            exception:{
              errorMsg:"",
              cause:res.error,
              code:res.status
            }
          }
        }else return res
    })
  })
}

//uploadImage
export const uploadImage = (userInfo) => {
  let reqObj = {
    method: "PUT",
    credentials: "same-origin",
    body: userInfo,
  };
  const url = endpoints.imageUpload();
  return fetch(url, reqObj).then((resp) => {
    if (resp.ok) {
      return resp.json().then(({ response }) => ({
        status: resp.status,
        response
      }))
    }
    else {
      return resp.json().then(({ exception }) => ({
        status: resp.status,
        exception
      }))
    }
  });
};

//updateProfile
export const updateProfile = (userInfo) => {
  let reqObj = {
    method: "PUT",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  };
  const url = endpoints.profileUpdate();
  return fetch(url, reqObj).then((resp) => {
    if (resp.ok) {
      return resp.json().then(({ response }) => ({
        status: resp.status,
        response
      }))
    }
    else {
      return resp.json().then(({ exception }) => ({
        status: resp.status,
        exception
      }))
    }
  });
};

//sendOtp
export const sendOtp = (emailObj) => {
  let reqObj = {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailObj),
  };
  const url = endpoints.getOtp();
  return fetch(url, reqObj).then((resp) => {
    if (resp.ok) {
      return resp.json().then(({ response }) => ({
        status: resp.status,
        response
      }))
    }
    else {
      return resp.json().then(({ exception }) => ({
        status: resp.status,
        exception
      }))
    }
  });
};

//resetPassword
export const resetPassword = (pwdDetails) => {
  let reqObj = {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pwdDetails),
  };
  const url = endpoints.reset();
  return fetch(url, reqObj).then((resp) => {
    if (resp.ok) {
      return resp.json().then(({ response }) => ({
        status: resp.status,
        response
      }))
    }
    else {
      return resp.json().then(({ exception }) => ({
        status: resp.status,
        exception
      }))
    }
  });
};

//get all cities
export const getCities = () => {
  const url = endpoints.cities();
  return fetch(url).then((response) => response.json());
};

// get all movies in a particular city
export const getMovies = (cityId) => {
  const url = endpoints.movies(cityId);
  return fetch(url).then((response) => response.json());
};

//get all theaters for a particular movie
export const getTheaters = (cityId, movieId) => {
  const url = endpoints.theaters(cityId, movieId);
  return fetch(url).then((response) => response.json());
};

// get show timings for a particular movie in a particular theater
export const getScreens = (movieId, theaterId) => {
  const url = endpoints.screens(movieId, theaterId);
  return fetch(url).then((res) => res.json());
};
//get seat plan
export const getSeatPlan = (seatPlanId) => {
  const url = endpoints.seatPlan(seatPlanId);
  return fetch(url).then((res) => res.json());
};

export const lockSeats = (seatPlanId, selectedSeats) => {
  let reqObj = {
    method: "PUT",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(selectedSeats),
  }
  const url = endpoints.lockSeats(seatPlanId);
  return fetch(url, reqObj).then((resp) => {
    return resp.json().then(({ response }) => (
      response
    ))
  })
}

export const purchaseTickets = ({ theaterDetails, screenName, selectedSeats, price, movieName, time, date, seatPlanId }) => {
  let reqObj = {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      theaterDetails,
      dateOfShow: date,
      showTiming: time,
      screenName,
      movieName,
      amount: price,
      bookedSeats: selectedSeats,
      seatPlanId
    }),
  }
  const url = endpoints.booking();
  return fetch(url, reqObj).then((response) => {
    if (response.ok) return response.json()
    else
      return console.error("Error")
  })
}

//get all bookings for a particular user
export const getAllBookings = () => {
  const url = endpoints.bookingHistory();
  return fetch(url).then((res) => res.json());
}

// cancel a particular booking using bookingId
export const cancelBooking = (bookingId) => {
  let reqObj = {
    method: "PUT",
    credentials: "same-origin"
  };
  const url = endpoints.cancelBooking(bookingId);
  return fetch(url, reqObj).then((response) => {
    if (response.ok) return response.json()
  })
}

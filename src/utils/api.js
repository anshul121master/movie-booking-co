import { api, mockApi } from "../config/apiConfig";

const mockEnabled = false;
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
  return fetch(url, reqObj).then((response) => {
    if (response.ok) return response.json();
    else
      return {
        error: "Login Failed",
        status: response.status,
      };
  });
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
  return fetch(url, reqObj).then((response) => {
    if (response.ok) return "success";
    else return "failed";
  });
};

export const getProfile = () => {
  const url = endpoints.profile();
  return fetch(url).then((response) => {
    if (response.ok) return response.json();
    else
      return {
        error: "Some error occured. Unable to fetch profile",
        status: response.status,
      };
  });
};

//uploadImage
export const uploadImage = (userInfo) => {
  let reqObj = {
    method: "PUT",
    credentials: "same-origin",
    body: userInfo,
  };
  const url = endpoints.imageUpload();
  return fetch(url, reqObj).then((response) => {
    if (response.ok) return response.json();
    else
      return {
        error: "Image Upload Failed",
        status: response.status,
      };
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
  const url = endpoints.updateProfile();
  return fetch(url, reqObj).then((response) => {
    if (response.ok) return "success";
    else return "failed";
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
  return fetch(url, reqObj).then((response) => {
    if (response.ok) return {
      successMsg: "otp sent successfully"
    }
    else return response.json();
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
  return fetch(url).then((response) => {
    if (!response.ok) return {
      successMsg: "Password Changed Successfully"
    }
    else return response.json();
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
  debugger
  const url = endpoints.lockSeats(seatPlanId);
  return fetch(url).then((response) => {
    if (response.ok) return true
    else
      return false
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
  return fetch(url).then((response) => {
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
  const url = endpoints.cancelBooking(bookingId);
  return fetch(url).then((response) => {
    if (response.ok) return response.json()
  })
}

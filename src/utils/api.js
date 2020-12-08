import seatPlan from "../store/reducers/seatPlan"

const url = "https://moviebooking.co"

//get all cities
export const getCities = () => {
  fetch(`${url}/v1/cities`)
    .then(response => response.json())
}


// get all movies in a particular city
export const getMovies = (cityId) => {
  fetch(`${url}/v1/cities/${cityId}/movies/details`)
    .then(response => response.json())
}

//get all theaters for a particular movie
export const getTheaters = (cityId, movieId) => {
  fetch(`${url}/v1/cities/${cityId}/theaters/${movieId}`)
    .then(response => response.json())
}

// get show timings for a particular movie in a particular theater
export const getScreens = (movieId, theaterId) =>
  fetch(`${url}/v1/screens/theater/${theaterId}/${movieId}`)
    .then(res => res.json())

//get seat plan 
export const getSeatPlan = (seatPlanId) => {
  fetch(`${url}/v1/seats/${seatPlanId}`)
    .then(res => res.json())
}

export const lockSeats = (seatPlanId, selectedSeats) => {
  let reqObj = {
    method: "PUT",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(selectedSeats),
  }
  fetch(`${url}/v1/seats/lockSeats/${seatPlanId}`, reqObj).then((response) => {
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
  fetch(`${url}/v1/bookings`, reqObj).then((response) => {
    if (response.ok) return response.json().bookingStatus
    else
      return console.error("Error occurred")
  })
}

  //get all booking
export const getAllBookings = () => {
  fetch(`${url}/v1/bookings`)
    .then(response => response.json())
}
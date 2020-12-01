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
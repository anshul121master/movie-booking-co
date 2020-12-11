const url = "https://moviebooking.co";

export const userProfilePhoto = "https://moviebooking.co/user-profile-photos/"
export const moviePosters = "https://moviebooking.co/movie-posters/"

export const api ={
    login: () => `${url}/login`,
    signup: () => `${url}/signUp`,
    profile: () => `${url}/v1/users`,
    getOtp: () => `${url}/v1/forgotPassword`,
    reset: () => `${url}/v1/reset`,
    imageUpload: () => `${url}/v1/users/profilePhoto`,
    profileUpdate: () =>`${url}/v1/users`,
    cities: () => `${url}/v1/cities`,
    movies: (cityId) => `${url}/v1/cities/${cityId}/movies`,
    theaters: (cityId, movieId) => `${url}/v1/cities/${cityId}/theaters/${movieId}`,
    screens: (movieId, theaterId) => `${url}/v1/screens/theater/${theaterId}/${movieId}`,
    seatPlan: (seatPlanId) => `${url}/v1/seats/${seatPlanId}`,
    bookingHistory: () => `${url}/v1/bookings`,
    booking: () => `${url}/v1/bookings`,
    lockSeats: (seatPlanId) => `${url}/v1/seats/lockSeats/${seatPlanId}`,
    cancelBooking: (bookingId) => `${url}/v1/bookings/${bookingId}`
}

export const mockApi = {
    login: () => './data/login.json',
    signup: () => './data/signup.json',
    profile: () => './data/profile.json',
    getOtp: () => './data/forgotPassword.json',
    reset: () => './data/reset.json',
    imageUpload: () => './data/imageUpload.json',
    profileUpdate: () =>'./data/updateProfile.json',
    cities: () =>'./data/cities.json',
    movies: (cityId) => './data/movies.json',
    theaters: (cityId, movieId) => './data/theaters.json',
    screens: (movieId, theaterId) => './data/screens.json',
    seatPlan: (seatPlanId) => './data/seatplan.json',
    bookingHistory: () => './data/bookingHistory.json',
    booking: () => './data/booking.json',
    lockSeats: (seatPlanId) => './data/lockSeats.json',
    cancelBooking: (bookingId) => `./data/cancelBooking.json`
}
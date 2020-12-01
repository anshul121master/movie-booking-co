// set selected theater action creator
export const SET_SELECTED_THEATER = 'SET_SELECTED_THEATER'
export const GET_ALL_THEATERS = 'GET_ALL_THEATERS'
export const GET_SHOW_TIMINGS = 'GET_SHOW_TIMINGS'

// get all theaters for a particular movie in a city
export function getAllTheaters(theatersList){
    return {
        type: GET_ALL_THEATERS,
        theatersList
    }
}

export function setSelectedTheater(theater) {
    return {
        type: SET_SELECTED_THEATER,
        theater  
    } 
}


export function setShowTimings(showTimings) {
    return {
        type: GET_SHOW_TIMINGS,
        showTimings
    }
}

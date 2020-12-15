
//add selected city action creator
export const SET_SELECTED_CITY = 'SET_SELECTED_CITY'

export function setSelectedCity(city) {
    return {
        type: SET_SELECTED_CITY,
        city
    }
}


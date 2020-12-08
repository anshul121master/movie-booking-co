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

const screens = [
  {
    "screenId": "63f354b4-7050-4c49-a5c7-e0d646c04ae3",
    "theaterId": "90f7108a-aa14-44cf-b001-a2cc43cc0a65",
    "screenName": "s2",
    "dimension": "_2D",
    "screenTimes": [
      {
        "showDateList": [
          {
            "seatPlanId": "32f576a3-3076-4af3-a9e5-f6f27825ce3d",
            "moviePlayingDate": "2020-11-30T13:43:57.827+00:00"
          },
          {
            "seatPlanId": "453f8fef-31ec-40ea-8541-8bc7346e82a6",
            "moviePlayingDate": "2020-12-01T13:43:57.827+00:00"
          },
          {
            "seatPlanId": "4a6de352-c465-49cb-837d-b849dfe6806a",
            "moviePlayingDate": "2020-12-02T13:43:57.827+00:00"
          },
          {
            "seatPlanId": "36e52e7a-d588-4a68-bca6-9e7d1c72a926",
            "moviePlayingDate": "2020-12-03T13:43:57.827+00:00"
          },
          {
            "seatPlanId": "8f41a868-de05-472d-af0e-83cdc6787f09",
            "moviePlayingDate": "2020-12-04T13:43:57.827+00:00"
          },
          {
            "seatPlanId": "b366704f-e30f-4987-a924-8d2c3b0f8b3b",
            "moviePlayingDate": "2020-12-05T13:43:57.827+00:00"
          },
          {
            "seatPlanId": "7a75aff8-2374-4b5a-810d-df1f07c59140",
            "moviePlayingDate": "2020-12-06T13:43:57.827+00:00"
          }
        ],
        "showTiming": "S20",
        "movieId": "4fc75cbb-c783-478f-9a0d-e49fc50699dd"
      },
      {
        "showDateList": [
          {
            "seatPlanId": "57b8ace1-9644-4344-9796-601f77f37d71",
            "moviePlayingDate": "2020-11-30T13:43:57.827+00:00"
          },
          {
            "seatPlanId": "5761d893-1656-4423-a50c-f42be28924ab",
            "moviePlayingDate": "2020-12-01T13:43:57.827+00:00"
          },
          {
            "seatPlanId": "d2882592-efc8-490e-9e92-2ca3664bc430",
            "moviePlayingDate": "2020-12-02T13:43:57.827+00:00"
          },
          {
            "seatPlanId": "672c299d-3779-4d1d-82ee-1c77ba704839",
            "moviePlayingDate": "2020-12-03T13:43:57.827+00:00"
          },
          {
            "seatPlanId": "cdfe6a48-b4cf-42d8-a769-c2548b3c8b17",
            "moviePlayingDate": "2020-12-04T13:43:57.827+00:00"
          },
          {
            "seatPlanId": "97a7c0b1-6287-4325-9309-c64e7233acd3",
            "moviePlayingDate": "2020-12-05T13:43:57.827+00:00"
          },
          {
            "seatPlanId": "fadfacdc-3d6e-4340-b967-9c93e8be6ac2",
            "moviePlayingDate": "2020-12-06T13:43:57.827+00:00"
          }
        ],
        "showTiming": "S23",
        "movieId": "4fc75cbb-c783-478f-9a0d-e49fc50699dd"
      }
    ],
    "columns": 3,
    "noOfRowsPerSeatType": {
      "DIAMOND": 1,
      "GOLD": 1,
      "PLATINUM": 1
    },
    "priceOfDifferentSeatType": {
      "DIAMOND": 1,
      "GOLD": 1,
      "PLATINUM": 1
    }
  },
  {
    "screenId": "63f354b4-7050-4c49-a5c7-e0d646c04ae3",
    "theaterId": "90f7108a-aa14-44cf-b001-a2cc43cc0a65",
    "screenName": "s2",
    "dimension": "_2D",
    "screenTimes": [
      {
        "showDateList": [
          {
            "seatPlanId": "32f576a3-3076-4af3-a9e5-f6f27825ce3d",
            "moviePlayingDate": "2020-11-30T13:43:57.827+00:00"
          },
          {
            "seatPlanId": "453f8fef-31ec-40ea-8541-8bc7346e82a6",
            "moviePlayingDate": "2020-12-01T13:43:57.827+00:00"
          },
          {
            "seatPlanId": "4a6de352-c465-49cb-837d-b849dfe6806a",
            "moviePlayingDate": "2020-12-02T13:43:57.827+00:00"
          },
          {
            "seatPlanId": "36e52e7a-d588-4a68-bca6-9e7d1c72a926",
            "moviePlayingDate": "2020-12-03T13:43:57.827+00:00"
          },
          {
            "seatPlanId": "8f41a868-de05-472d-af0e-83cdc6787f09",
            "moviePlayingDate": "2020-12-04T13:43:57.827+00:00"
          },
          {
            "seatPlanId": "b366704f-e30f-4987-a924-8d2c3b0f8b3b",
            "moviePlayingDate": "2020-12-05T13:43:57.827+00:00"
          },
          {
            "seatPlanId": "7a75aff8-2374-4b5a-810d-df1f07c59140",
            "moviePlayingDate": "2020-12-06T13:43:57.827+00:00"
          }
        ],
        "showTiming": "S11",
        "movieId": "4fc75cbb-c783-478f-9a0d-e49fc50699dd"
      },
      {
        "showDateList": [
          {
            "seatPlanId": "57b8ace1-9644-4344-9796-601f77f37d71",
            "moviePlayingDate": "2020-11-30T13:43:57.827+00:00"
          },
          {
            "seatPlanId": "5761d893-1656-4423-a50c-f42be28924ab",
            "moviePlayingDate": "2020-12-01T13:43:57.827+00:00"
          },
          {
            "seatPlanId": "d2882592-efc8-490e-9e92-2ca3664bc430",
            "moviePlayingDate": "2020-12-02T13:43:57.827+00:00"
          },
          {
            "seatPlanId": "672c299d-3779-4d1d-82ee-1c77ba704839",
            "moviePlayingDate": "2020-12-03T13:43:57.827+00:00"
          },
          {
            "seatPlanId": "cdfe6a48-b4cf-42d8-a769-c2548b3c8b17",
            "moviePlayingDate": "2020-12-04T13:43:57.827+00:00"
          },
          {
            "seatPlanId": "97a7c0b1-6287-4325-9309-c64e7233acd3",
            "moviePlayingDate": "2020-12-05T13:43:57.827+00:00"
          },
          {
            "seatPlanId": "fadfacdc-3d6e-4340-b967-9c93e8be6ac2",
            "moviePlayingDate": "2020-12-06T13:43:57.827+00:00"
          }
        ],
        "showTiming": "S15",
        "movieId": "4fc75cbb-c783-478f-9a0d-e49fc50699dd"
      }
    ],
    "columns": 3,
    "noOfRowsPerSeatType": {
      "DIAMOND": 1,
      "GOLD": 1,
      "PLATINUM": 1
    },
    "priceOfDifferentSeatType": {
      "DIAMOND": 1,
      "GOLD": 1,
      "PLATINUM": 1
    }
  }
]

//get all booking
export const getAllBookings = () => {
  fetch(`${url}/v1/bookings`)
    .then(response => response.json())
}
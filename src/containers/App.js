import React, { Component } from 'react'
import { getCities } from '../utils/api'
import Home from './home/Home'
import Screen from './screen/Screen'
import Ticket from '../shared-components/ticket/Ticket'
import Movie from './movie/Movie'
import Purchase from './purchase/Purchase'

export default class App extends Component {
  state = {
    listOfCities: [{
      "id": "6b696a5e-db7f-4c73-866a-15d8e7445313",
      "cityName": "Pune"
    },
    {
      "id": "50d3f364-0252-4e20-bd3d-0227e58aac07",
      "cityName": "Haridwar"
    },
    {
      "id": "ac63bbd3-af62-4f2e-b28a-934b5b242ac0",
      "cityName": "Amritsar"
    },
    {
      "id": "872d3baf-e718-4af0-aad2-080501299248",
      "cityName": "Mumbai"
    },
    {
      "id": "3774cd0b-acc3-4ca0-80bc-0570e867ae3b",
      "cityName": "New Delhi"
    },
    {
      "id": "cef25410-d89f-4a5d-959e-8d029c279f97",
      "cityName": "Delhi"
    }]
  }

  componentDidMount() {
    // getCities()
    // .then(res => {
    //   this.setState({
    //     listOfCities: res
    //   })
    // })
  }

  render() {
    const { listOfCities } = this.state;
    return (
      <div className="App">
        {/* {console.log(JSON.stringify(listOfCities))} */}
        {<Home listOfCities= {listOfCities} />}
        {/* <Movie /> */}
        {/* {<Home listOfCities= {listOfCities} />} */}
        {/* <Purchase /> */}
      </div>
    );
  }
}



import React, { Component } from 'react'
import { getCities } from '../utils/api'
import Home from './home/Home'
import Screen from './screen/Screen'
import Ticket from '../shared-components/ticket/Ticket'
import Movie from './movie/Movie'
import Purchase from './purchase/Purchase'

export default class App extends Component {
  state = {
    listOfCities: []
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
        {/* {<Home listOfCities= {listOfCities} />} */}
        <Purchase />
      </div>
    );
  }
}



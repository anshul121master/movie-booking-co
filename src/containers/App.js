import React, { Component } from 'react'
import { getCities } from '../utils/api'
import Home from './home/Home'

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
        <header className="App-header">
          Movie Booking App
          {/* {console.log(JSON.stringify(listOfCities))} */}
        </header>
        <Home listOfCities= {listOfCities} />
      </div>
    );
  }
}



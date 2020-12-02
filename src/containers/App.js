import React, { Component } from 'react'
import { getCities } from '../utils/api'
import Home from './home/Home'
import Movie from './movie/Movie'

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
        <Movie />
      </div>
    );
  }
}



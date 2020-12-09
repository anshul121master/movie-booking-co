import React, { Component } from 'react'
import { getCities } from '../utils/api'
import Home from './home/Home'
import Screen from './screen/Screen'
import Movie from './movie/Movie'
import Purchase from './purchase/Purchase'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MyBookings from './myBookings/MyBookings'

export default class App extends Component {
  state = {
    listOfCities: []
  }

  componentDidMount() {
    getCities()
      .then(res => {
        this.setState({
          listOfCities: res
        })
      })
  }

  render() {
    const { listOfCities } = this.state;
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' component={() => <Home listOfCities={listOfCities} />} />
            <Route exact path='/bookings' component={() => <MyBookings listOfCities={listOfCities} />} />
            <Route exact path='/movie' component={() => <Movie listOfCities={listOfCities} />} />
            <Route exact path='/screen' component={Screen} />
            <Route exact path='/purchase' component={Purchase} />
          </Switch>
        </Router>

      </div>
    );
  }
}



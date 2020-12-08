import React, { Component } from 'react'
import { getCities } from '../utils/api'
import Home from './home/Home'
import Screen from './screen/Screen'
import Movie from './movie/Movie'
import Purchase from './purchase/Purchase'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

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
        <Router>
          <Switch>
            <Route exact path='/' component={Movie} />
            <Route exact path='/screen' component={Screen} />
            <Route exact path='/purchase' component={Purchase} />
          </Switch>
        </Router>
      </div>
    );
  }
}



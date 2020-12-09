import React, { Component } from "react";
import { getCities, getMovies } from "../utils/api";
import Home from "./home/Home";
import SignIn from "./signin/SignIn";
import SignUp from "./signupandforgotpwd/SignUp"
import Profile from "./profile/Profile"
import ForgotPassword from "./signupandforgotpwd/ForgotPassword";

export default class App extends Component {
  state = {
    listOfCities: [],
  };

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
        <header className="App-header">
          Movie Booking App
           {console.log(JSON.stringify(listOfCities))} 
        </header>
        {/*<Home listOfCities= {listOfCities} />*/}
        <ForgotPassword />
      </div>
    );
  }
}

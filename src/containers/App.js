import React, { Component } from "react";
import { getCities } from "../utils/api";
import Home from "./home/Home";
import SignIn from "./signin/SignIn";
import SignUp from "./signupandforgotpwd/SignUp";
import Profile from "./profile/Profile";
import ForgotPassword from "./signupandforgotpwd/ForgotPassword";
import Screen from "./screen/Screen";
import Movie from "./movie/Movie";
import Purchase from "./purchase/Purchase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MyBookings from "./myBookings/MyBookings";
import Error from "../shared-components/error/Error";
import ProtectedRoute from "./ProtectedRoute"
import Loader from "../shared-components/Loader";


export default class App extends Component {
  state = {
    listOfCities: {},
  };

  componentDidMount() {
    getCities().then((res) => {
      this.setState({
        listOfCities: res,
      });
    });
  }

  render() {
    const { listOfCities } = this.state;
    return (
      <div className="App">
        {Object.keys(listOfCities).length !== 0 ? (
          <Router>
            <Switch>
              <Route path="/login" render={(props) => <SignIn {...props} />} />

              <Route exact path="/signup" component={SignUp} />

              <ProtectedRoute exact path="/profile" component={Profile} />

              <Route exact path="/forgotPassword" component={ForgotPassword} />

              <Route
                exact
                path="/"
                component={() => <Home listOfCities={listOfCities} />}
              />
              <ProtectedRoute
                exact
                path="/upcoming"
                component={() => <MyBookings listOfCities={listOfCities} />}
              />
              <Route
                exact
                path="/movie"
                component={() => <Movie listOfCities={listOfCities} />}
              />
              <Route exact path="/screen" component={Screen} />
              <ProtectedRoute exact path="/purchase" component={Purchase} />
              <Route exact path="/error" component={Error} />
            </Switch>
          </Router>
        ) : (
            <Loader />
          )}
      </div>
    );
  }
}

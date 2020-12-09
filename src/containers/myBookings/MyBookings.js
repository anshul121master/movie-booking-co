import React, { Component } from 'react'
import BookingHistory from './bookingHistory/BookingHistory'
import Header from '../../shared-components/header/Header'
import Footer from '../../shared-components/footer/Footer'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link, Route, BrowserRouter, Switch } from "react-router-dom";
import {getAllBookings} from '../../utils/api'
import { background, buttonAvailable ,header, headerText} from '../../theme'


export default class MyBookings extends Component {
    state = {
        value: 0,
        upcomingBookings: [],
        previousBookings: []
    }

    componentDidMount() {
        getAllBookings()
        .then(response => {
            const previous = response.filter(ticket => ticket.dateOfShow.split('T')[0] < new Date().toISOString().split('T')[0]);
            const upcoming = response.filter(ticket => ticket.dateOfShow.split('T')[0] > new Date().toISOString().split('T')[0]);
            return {previous, upcoming}
        }).then(({previous, upcoming}) => this.setState({
            previousBookings: previous,
            upcomingBookings: upcoming
            })
        )
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    
    render() {
        const {value} = this.state;
        return (
        <React.Fragment>
            <Header listOfCities = {this.props.listOfCities}/>
            <BrowserRouter>
                <AppBar position="static" style={{backgroundColor: headerText, color: header}}>
                    <Tabs value={value} onChange={this.handleChange} 
                            TabIndicatorProps={{
                                style: {
                                  
                                  backgroundColor: header}
                              }}
                            fullWidth
                            aria-label="simple tabs example">
                        <Tab label="Upcoming Bookings" id="upcomingBookingsTabPanel"
                                aria-controls="upcomingBookingsTabPanel"
                                component={Link} to="/upcoming"/>
                        <Tab label="Previous Bookings" id="bookingHistoryTabPanel"
                                aria-controls="bookingHistoryTabPanel"
                                component={Link} to="/previous"/>
                    </Tabs>
                </AppBar>

                <Switch>
                    <Route path="/upcoming">
                        <BookingHistory bookings={this.state.upcomingBookings}/>
                    </Route>
                    <Route path="/previous">
                        <BookingHistory bookings={this.state.previousBookings}/>
                    </Route>
                </Switch>
            </BrowserRouter>
            {/* <BookingHistory /> */}
            {/* <Footer /> */}
        </React.Fragment>
        );
    }
}
import React, { Component } from 'react'
import BookingHistory from './bookingHistory/BookingHistory'
import Header from '../../shared-components/header/Header'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link, Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import {getAllBookings, cancelBooking} from '../../utils/api'
import { header, headerText} from '../../theme'

export default class MyBookings extends Component {
    state = {
        value: 0,
        upcomingBookings: [],
        previousBookings: [],
        exception: null
    }
    cancelTicket = (bookingId) => {
        cancelBooking(bookingId).then((response) => {
            if(response.exception === null) {
                this.setState((previousState) => {
                    return {
                    ...previousState,
                    upcomingBookings: previousState.upcomingBookings
                        .filter((booking)=> booking.bookingId !== response.response.bookingId).concat([response.response])
                    };
            })
            } else {
                this.setState({
                    exception: response.exception
            })
        }
        })
        
    }

    componentDidMount() {
        getAllBookings()
        .then(response => {
            if(response.exception === null) {
                const previous = response.response.filter(ticket => ticket.dateOfShow.split('T')[0] < new Date().toISOString().split('T')[0]);
                const upcoming = response.response.filter(ticket => ticket.dateOfShow.split('T')[0] > new Date().toISOString().split('T')[0]);
                this.setState({
                    previousBookings: previous,
                    upcomingBookings: upcoming
                    })
            }
        else{
            this.setState({
                exception: response.exception
            })
        }
    })
}

    handleChange = (event, value) => {
        this.setState({ value });
    };

    
    render() {
        const {value, exception} = this.state;
        return (
            (exception === null ?
        (<React.Fragment>
            <Header/>
            <BrowserRouter>
                <AppBar position="static" style={{backgroundColor: headerText, color: header}}>
                    <Tabs value={value} onChange={this.handleChange} 
                            TabIndicatorProps={{
                                style: {
                                  backgroundColor: header}
                              }}
                            fullwidth="true"
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
                    <Route exact path="/upcoming">
                        <BookingHistory bookings={this.state.upcomingBookings} cancelTicket={this.cancelTicket}/>
                    </Route>
                    <Route exact path="/previous">
                        <BookingHistory bookings={this.state.previousBookings}/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </React.Fragment>) 
        : <Redirect to={{pathname:'/error',
								state:{
									exception:exception
								}}} /> )
        );
    }
}
import React, { Component } from 'react'
import BookingHistory from './bookingHistory/BookingHistory'
import Header from '../../shared-components/header/Header'
import AppBar from '@material-ui/core/AppBar';
import {Tabs, Tab} from '@material-ui/core';
import { Redirect } from "react-router-dom";
import {getAllBookings, cancelBooking} from '../../utils/api'
import { header, headerText} from '../../theme'
import Footer from '../../shared-components/footer/Footer'

export default class MyBookings extends Component {
    state = {
        value: 0,
        upcomingBookings: [],
        previousBookings: [],
        exception: null,
        cancel: false,
        open: false,
        cancelTicketSeats: [],
        cancelTicketMovie: ''
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

    handleClose = (cancel, bookingId) => {
        if (cancel) {
            this.cancelTicket(bookingId)
        }
        this.setState({
            open: false,
            cancel
        })
    };


    handleClickOpen = (cancelTicketSeats, cancelTicketMovie) => {
        this.setState({
            open: true,
            cancelTicketSeats,
            cancelTicketMovie
        })
    };

    componentDidMount() {
        getAllBookings()
        .then(response => {
            if(response.exception === null) {
                const previous = response.response.filter(ticket => ticket.dateOfShow.split('T')[0] < new Date().toISOString().split('T')[0]
                || (ticket.dateOfShow.split('T')[0] === new Date().toISOString().split('T')[0] && new Date().getHours() > ticket.showTiming.split('S')[1]));
                const upcoming = response.response.filter(ticket => ticket.dateOfShow.split('T')[0] > new Date().toISOString().split('T')[0]
                || (ticket.dateOfShow.split('T')[0] === new Date().toISOString().split('T')[0] && new Date().getHours() <= ticket.showTiming.split('S')[1]));
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
                <AppBar position="static" style={{backgroundColor: headerText, color: header}}>
                    <Tabs value={value} onChange={this.handleChange} 
                            TabIndicatorProps={{
                                style: {
                                  backgroundColor: header}
                              }}
                            fullwidth="true"
                            aria-label="simple tabs example">
                        <Tab label="Upcoming Bookings" id="upcomingBookingsTabPanel"
                                aria-controls="upcomingBookingsTabPanel"/>
                        <Tab label="Previous Bookings" id="bookingHistoryTabPanel"
                                aria-controls="bookingHistoryTabPanel"/>
                    </Tabs>
                </AppBar>
                    {value===0 && <BookingHistory bookings={this.state.upcomingBookings} 
                                                open={this.state.open} handleClose={this.handleClose}
                                                handleClickOpen={this.handleClickOpen} 
                                                cancelTicketMovie={this.state.cancelTicketMovie}
                                                cancelTicketSeats={this.state.cancelTicketSeats}/>}
                    {value===1 && <BookingHistory bookings={this.state.previousBookings}/>}
                <Footer />
        </React.Fragment>) 
        : <Redirect to={{pathname:'/error',
								state:{
									exception:exception
								}}} /> )
        );
    }
}


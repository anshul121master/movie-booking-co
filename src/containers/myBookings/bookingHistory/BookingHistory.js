import React, { Component } from 'react'
import Ticket from '../../../shared-components/ticket/Ticket'
import { Typography } from '@material-ui/core'


export default class BookingHistory extends Component {

    render() {
        const { bookings, handleClose, handleClickOpen, open } = this.props;
        return (
            <React.Fragment>
            {(bookings.length > 0 ? (<div style={{contain: 'content'}}>
            {bookings.map(ticket => {
                        const theater = {
                            screenName: ticket.screenName,
                            dimenstion: '',
                            theaterDetails: ticket.theaterDetails
                        };
                        const selectedSeats = ticket.bookedSeats;
                        const price=ticket.amount;
                        const movie={
                            name: ticket.movieName,
                            genre: ''
                        };
                        const date=ticket.dateOfShow;
                        const bookingStatus=ticket.bookingStatus;
                        const time = ticket.showTiming;
                        return <Ticket key={ticket.bookingId}
                                    theater={theater}
                                    selectedSeats={selectedSeats}
                                    price={price}
                                    movie={movie}
                                    date={date}
                                    time={time}
                                    bookingStatus ={bookingStatus} 
                                    handleClickOpen ={handleClickOpen}
                                    cancelTicketMovie ={this.props.cancelTicketMovie}
                                    cancelTicketSeats = {this.props.cancelTicketSeats}
                                    handleClose= {handleClose}
                                    open={open}
                                    bookingId= {ticket.bookingId}
                                    />
                    })}
        </div>
        ) : <Typography variant="h6" style={{margin:'15px', minHeight: '60vh'}}>You don't seem to have any bookings</Typography>
        )}
        </React.Fragment>
        );
    }
}
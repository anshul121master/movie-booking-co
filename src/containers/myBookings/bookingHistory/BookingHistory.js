import React, { Component } from 'react'
import Ticket from '../../../shared-components/ticket/Ticket'


export default class BookingHistory extends Component {

    render() {
        const { bookings, cancelTicket } = this.props;
        return (
            <React.Fragment>
            {(bookings.length > 0 ? (<div>
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
                        const date=ticket.dateOfShow.split('T')[0];
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
                                    cancelTicket= {cancelTicket}
                                    bookingId= {ticket.bookingId}
                                    />
                    })}
        </div>) : <p>You don't seem to have any bookings</p>
        )}
        </React.Fragment>
        );
    }
}
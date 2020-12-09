import React, { Component } from 'react'
import { connect } from 'react-redux'
import Ticket from '../../shared-components/ticket/Ticket'
import PaymentForm from './payment-form/PaymentForm'
import { ArrowBackIosRounded } from '@material-ui/icons'
import { headerText, } from '../../theme'
import { IconButton } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { purchaseTickets } from '../../utils/api'

class Purchase extends Component {

    state = {
        bookingStatus: ''
    }

    purchaseTicket = (event) => {
        event.preventDefault()

        const { selectedTheater, seatsAndPrice, selectedMovie, selectedScreen, seatPlan } = this.props
        purchaseTickets({
            theaterDetails: selectedTheater.theaterName + " " + selectedTheater.address.city,
            screenName: selectedScreen.screenName,
            selectedSeats: seatsAndPrice.selectedSeats,
            price: seatsAndPrice.price,
            movieName: selectedMovie.name,
            time: this.getDateAndTime(seatPlan, selectedScreen).time,
            date: this.getDateAndTime(seatPlan, selectedScreen).date,
            seatPlanId: seatPlan.seatPlanId
        }).then(
            response => {
                if (response.bookingStatus === 'BOOKED') {
                    this.setState({
                        bookingStatus: 'BOOKED'
                    })
                }
            }
        )
        this.setState({
            bookingStatus: 'BOOKED'
        })
    }

    getDateAndTime = (seatPlan, selectedScreen) => {

        let time, date

        selectedScreen.screenTimes.forEach(screenTime => {
            const selectedDate = screenTime.showDateList.filter(showDate => showDate.seatPlanId === seatPlan.seatPlanId)
            if (selectedDate.length !== 0) {
                time = screenTime.showTiming
                date = selectedDate[0].moviePlayingDate.split('T')[0]
            }
        })

        return { time, date }

    }

    render() {
        const { selectedTheater, seatsAndPrice, selectedMovie, selectedScreen, seatPlan } = this.props
        return (
            <div style={{ minHeight: '100vh', width: '100%', margin: 0, padding: 0 }}>
                <div className='screen-header'>
                    <IconButton >
                        <Link style={{ textDecoration: 'none' }} to={{
                            pathname: "/screen",
                        }}><ArrowBackIosRounded style={{ color: headerText }} /></Link>
                    </IconButton>
                    <span>{selectedMovie.name}</span>
                    <span style={{ color: 'darkgrey', marginLeft: '10px', fontSize: '0.75em' }}>
                        {selectedTheater.theaterName + " " + selectedTheater.address.city}</span>
                    <div className='screen-info'>
                        <div className='info'>
                            Purchase tickets
                        </div>
                    </div>
                </div>
                <div className='purchase-container'>
                    <PaymentForm purchaseTicket={this.purchaseTicket} bookingStatus={this.state.bookingStatus} />
                    <Ticket
                        theater={{
                            "screenName": selectedScreen.screenName,
                            "theaterDetails": selectedTheater.theaterName + " " + selectedTheater.address.city,
                        }}
                        selectedSeats={seatsAndPrice.selectedSeats === undefined ? [] : seatsAndPrice.selectedSeats}
                        price={seatsAndPrice.price}
                        movie={{
                            "name": selectedMovie.name,
                            "genre": selectedMovie.genre,
                        }}
                        time={this.getDateAndTime(seatPlan, selectedScreen).time}
                        date={this.getDateAndTime(seatPlan, selectedScreen).date}
                        bookingStatus={this.state.bookingStatus}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ selectedTheater, seatsAndPrice, selectedMovie, selectedScreen, seatPlan }) => {
    return { selectedTheater, seatsAndPrice, selectedMovie, selectedScreen, seatPlan }
}

export default connect(mapStateToProps)(Purchase)
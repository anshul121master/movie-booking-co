import React, { Component } from 'react'
import { connect } from 'react-redux'
import Ticket from '../../shared-components/ticket/Ticket'
import PaymentForm from './payment-form/PaymentForm'
import { ArrowBackIosRounded } from '@material-ui/icons'
import { headerText, } from '../../theme'
import { IconButton } from '@material-ui/core'
import { Link } from 'react-router-dom'

class Purchase extends Component {

    state = {
        bookingStatus: ''
    }

    purchaseTicket = (event) => {
        event.preventDefault()
        const { theaterDetails, screenName, selectedSeats, price, movieName, time, date, seatPlanId } = this.props
        // purchaseTickets({ theaterDetails, screenName, selectedSeats, price, movieName, time, date, seatPlanId }).then(
        //     response => {
        //         if(response.bookingStatus === 'BOOKED'){
        //             this.setState({
        //                 bookingStatus: 'BOOKED'
        //             })
        //         }
        //     }
        // )
        this.setState({
            bookingStatus: 'BOOKED'
        })
    }

    render() {
        return (
            <div style={{ minHeight: '100vh', width: '100%', margin: 0, padding: 0 }}>
                <div className='screen-header'>
                    <IconButton >
                        <Link style={{ textDecoration: 'none' }} to={{
                            pathname: "/screen",
                        }}><ArrowBackIosRounded style={{ color: headerText }} /></Link>
                    </IconButton>
                    <span>Jab Tak Hai Jaan</span>
                    <span style={{ color: 'darkgrey', marginLeft: '10px', fontSize: '0.75em' }}>
                        PVR Cinemas Mumbai</span>
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
                            "screenName": "s2",
                            "dimension": "_2D",
                            "theaterDetails": 'PVR Cinemas, Mumbai',
                        }}
                        selectedSeats={['GR1C1', 'GR1C2']}
                        price={450}
                        movie={{
                            "name": "Jab tak hai jaan",
                            "genre": "Romance",
                        }}
                        time='S21'
                        date='2020-11-30'
                        bookingStatus={this.state.bookingStatus}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({/* selectedTheater, theater, movie, selectedSeats, price */ }) => {

}

export default connect(mapStateToProps)(Purchase)
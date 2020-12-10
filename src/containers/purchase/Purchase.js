import React, { Component } from 'react'
import { connect } from 'react-redux'
import Ticket from '../../shared-components/ticket/Ticket'
import PaymentForm from './payment-form/PaymentForm'
import { ArrowBackIosRounded } from '@material-ui/icons'
import { headerText, } from '../../theme'
import { IconButton } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { purchaseTickets } from '../../utils/api'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

class Purchase extends Component {

    state = {
        bookingStatus: '',
        exception: null,
        open: false
    }

    handleClose = () => {
        this.setState({
            open: false,
            exception: null
        })
    };

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
            seatPlanId: seatPlan.response.seatPlanId
        }).then(
            response => {
                if (response.response !== null && response.response.bookingStatus === 'BOOKED') {
                    this.setState({
                        bookingStatus: 'BOOKED'
                    })
                }else {
                    this.setState({
                        exception: response.exception,
                        open:true
                    })
                }
            }
        )
    }

    getDateAndTime = (seatPlan, selectedScreen) => {

        let time, date

        selectedScreen.screenTimes.forEach(screenTime => {
            const selectedDate = screenTime.showDateList.filter(showDate => showDate.seatPlanId === seatPlan.response.seatPlanId)
            if (selectedDate.length !== 0) {
                time = screenTime.showTiming
                date = selectedDate[0].moviePlayingDate.split('T')[0]
            }
        })

        return { time, date }

    }

    render() {
        const { selectedTheater, seatsAndPrice, selectedMovie, selectedScreen, seatPlan } = this.props
        const {exception} = this.state;
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
                {(exception !== null && <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                            <DialogTitle id="alert-dialog-title">{`Payment failed`}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    {`Payment Failed with the message ${exception.errorMsg} and code ${exception.code}. Please try again.`}
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => this.handleClose()} autoFocus>
                                    OK
                                </Button>
                            </DialogActions>
                        </Dialog> )}
                        </div>
        )
    }
}

const mapStateToProps = ({ selectedTheater, seatsAndPrice, selectedMovie, selectedScreen, seatPlan }) => {
    return { selectedTheater, seatsAndPrice, selectedMovie, selectedScreen, seatPlan }
}

export default connect(mapStateToProps)(Purchase)
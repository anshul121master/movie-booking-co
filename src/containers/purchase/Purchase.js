import React, { Component } from 'react'
import { connect } from 'react-redux'
import Ticket from '../../shared-components/ticket/Ticket'
import PaymentForm from './payment-form/PaymentForm'
import { ArrowBackIosRounded } from '@material-ui/icons'
import { headerText, header } from '../../theme'
import { IconButton } from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import { purchaseTickets } from '../../utils/api'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Loader from "../../shared-components/Loader"
import Footer from '../../shared-components/footer/Footer'
import { setSeatsAndPrice } from '../../store/actions/shared'
import { setTheaterAndSeatPlan } from '../../store/actions/shared'

class Purchase extends Component {

    state = {
        bookingStatus: '',
        exception: null,
        open: false,
        loading: false,
        redirect: false,
    }

    componentDidMount() {
        const { seatPlan, seatsAndPrice, dispatch } = this.props
        if (Object.keys(seatsAndPrice).length > 0 && Object.keys(seatPlan).length > 0) {
            dispatch(setSeatsAndPrice(seatsAndPrice.selectedSeats, seatPlan.response.seatPlanId, seatsAndPrice.price, true));
        }
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
        this.setState({
            loading: true
        })
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
                } else {
                    this.setState({
                        exception: response.exception,
                        open: true
                    })
                }
                this.setState({
                    loading: false
                })
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

    reloadSeatPlan = () => {
        const { selectedTheater, seatPlan, selectedScreen, dispatch, } = this.props
        dispatch(setTheaterAndSeatPlan(selectedTheater, seatPlan.response.seatPlanId, selectedScreen))
        this.setState({
            redirect: true
        })
    }

    setSeatPlanUndefined = () => {
        this.props.dispatch(setSeatsAndPrice(undefined, undefined, undefined, false));
    }

    render() {
        const { selectedTheater, seatsAndPrice, selectedMovie, selectedScreen, seatPlan } = this.props
        const { exception, loading, redirect } = this.state;
        if (redirect) {
            return (<Redirect to={{ pathname: '/screen' }} />)
        }
        if (seatsAndPrice.response !== undefined && seatsAndPrice.response !==null && seatsAndPrice.response === false ) {
            return (
                <div style={{ minHeight: '100vh', width: '100%', margin: 0, padding: 0 }}>
                    <div className='screen-header'>
                        <IconButton onClick={this.reloadSeatPlan}>
                            <ArrowBackIosRounded style={{ color: this.state.bookingStatus === "" ? headerText : header }} />
                        </IconButton>
                        <span>{selectedMovie.name}</span>
                        <span style={{ color: 'darkgrey', marginLeft: '10px', fontSize: '0.75em' }}>
                            {this.getDateAndTime(seatPlan, selectedScreen).date + ", " + this.getDateAndTime(seatPlan, selectedScreen).time.split('S')[1] + ":00, " + selectedTheater.theaterName + " " + selectedTheater.address.city}</span>
                        <div className='screen-info'>
                            <div className='info' style={{ fontSize: '1.2em', fontWeight: 500 }}>
                                Purchase tickets
                        </div>
                        </div>
                    </div>
                    <div style={{ minHeight: '60vh', minwidth: '100%' }}>
                    </div>
                    <Dialog
                        open={true}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{`Seat Locking Failed`}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {`Locking of the choosen seats failed can you please try again with some other seat options `}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => this.reloadSeatPlan()} autoFocus>
                                OK
                                </Button>
                        </DialogActions>
                    </Dialog>
                    <Footer />
                </div>
            )
        }
        return (
            <div style={{ minHeight: '100vh', width: '100%', margin: 0, padding: 0 }}>
                {loading && <Loader />}
                {this.props.loading && <Loader />}
                <div className='screen-header'>
                    <IconButton onClick={this.reloadSeatPlan}>
                        <ArrowBackIosRounded style={{ color: this.state.bookingStatus === "" ? headerText : header }} />
                    </IconButton>
                    <span>{selectedMovie.name}</span>
                    <span style={{ color: 'darkgrey', marginLeft: '10px', fontSize: '0.75em' }}>
                        {selectedTheater.theaterName + " " + selectedTheater.address.city}</span>
                    <div className='screen-info'>
                        <div className='info' style={{ fontSize: '1.2em', fontWeight: 500 }}>
                            Purchase tickets
                        </div>
                    </div>
                </div>
                <div className='purchase-container'>
                    <PaymentForm purchaseTicket={this.purchaseTicket} bookingStatus={this.state.bookingStatus} setSeatPlanUndefined={this.setSeatPlanUndefined} />
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
                {
                    (exception !== null && <Dialog
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
                    </Dialog>)
                }
                <Footer />
            </div >
        )
    }
}

const mapStateToProps = ({ selectedTheater, seatsAndPrice, selectedMovie, selectedScreen, seatPlan, loading }) => {
    return { selectedTheater, seatsAndPrice, selectedMovie, selectedScreen, seatPlan, loading }
}

export default connect(mapStateToProps)(Purchase)
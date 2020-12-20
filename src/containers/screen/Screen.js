import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card';
import { withStyles } from "@material-ui/core/styles";
import compose from 'recompose/compose';
import { CardContent, Typography, IconButton, Button, Tooltip } from '@material-ui/core';
import { ArrowBackIosRounded } from '@material-ui/icons'
import { headerText, } from '../../theme'
import { setSeatsAndPrice } from '../../store/actions/shared'
import { Redirect, Link } from 'react-router-dom'
import Loader from '../../shared-components/Loader'
import Footer from '../../shared-components/footer/Footer'
import Snackbar from '@material-ui/core/Snackbar';

const styles = (theme) => ({
    root: {
        width: '98%',
        borderBottom: 'none',
        borderTop: 'none',
        overflow: 'auto',
    },

})

class Screen extends Component {
    state = {
        selectedSeats: [],
        price: 0,
        redirect: false,
        open: true,
        vertical: 'top',
        horizontal: 'center',
    }

    componentDidMount() {
        const { seatsAndPrice } = this.props
        if (seatsAndPrice.selectedSeats !== undefined && seatsAndPrice.price !== undefined) {
            this.setState({
                selectedSeats: seatsAndPrice.selectedSeats,
                price: seatsAndPrice.price,
            })
        }
    }

    calculatePrice(theater, selectedSeats) {
        let price = 0;
        selectedSeats.forEach(seat => {
            if (seat.charAt(0) === "G") {
                price = price + theater.priceOfDifferentSeatType.GOLD;
            }
            else if (seat.charAt(0) === "P") {
                price = price + theater.priceOfDifferentSeatType.PLATINUM;
            }
            else if (seat.charAt(0) === "D") {
                price = price + theater.priceOfDifferentSeatType.DIAMOND;
            }
        })
        return price;
    }

    selectSeat = (seat) => {
        this.setState(currentState => {
            let selectedSeats = []
            let price = 0
            if (currentState.selectedSeats.includes(seat)) {
                selectedSeats = currentState.selectedSeats.filter(seatValue => seatValue !== seat)
                price = this.calculatePrice(this.props.selectedScreen, selectedSeats)
            }
            else {
                selectedSeats = currentState.selectedSeats.concat(seat)
                price = this.calculatePrice(this.props.selectedScreen, selectedSeats)
            }
            return {
                selectedSeats: selectedSeats,
                price: price
            }
        })
    }

    purchaseSeats = () => {
        // const {authedUser} = this.props
        // if(authedUser === null || authedUser.response === null)
        // {
        /*Redirect to payment page and store state information in redux store*/
        this.props.dispatch(setSeatsAndPrice(this.state.selectedSeats, this.props.seatPlan.response.seatPlanId, this.state.price, false))
        this.setState({
            redirect: true
        })
        // }
        // this.props.dispatch(setSeatsAndPrice(this.state.selectedSeats, this.props.seatPlan.response.seatPlanId, this.state.price, true))
        // this.setState({
        //     redirect: true
        // })
    }

    createSeatMap = (selectedScreen) => {
        let seatMap = [];
        Object.keys(selectedScreen.noOfRowsPerSeatType).forEach(seatType => {
            let seatTypeMap = [];
            Array.from(Array(selectedScreen.noOfRowsPerSeatType[seatType]).keys()).forEach(
                (row) => {
                    let seatRow = [];
                    Array.from(Array(selectedScreen.columns).keys()).forEach(
                        (col) => {
                            seatRow.push(seatType.charAt(0) + 'R' + (row + 1) + 'C' + + (col + 1))
                        }
                    )
                    seatTypeMap.push(seatRow);
                }
            )
            seatMap.push(seatTypeMap)
        })

        return seatMap;
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    render() {
        const { selectedScreen, selectedTheater, selectedMovie, classes, seatPlan } = this.props
        const { vertical, horizontal, open } = this.state

        const seatMap = Object.keys(selectedMovie).length === 0 ? [] : this.createSeatMap(selectedScreen)
        return (
            Object.keys(selectedMovie).length === 0 ? <Redirect to="/" /> :
                this.state.redirect ? (<Redirect to={{ pathname: '/purchase' }} />) : (
                    <div style={{ minHeight: '100vh', width: '100%', margin: 0, padding: 0 }}>
                        <Snackbar
                            anchorOrigin={{ vertical, horizontal }}
                            open={open}
                            onClose={this.handleClose}
                            message="Please click on any seats to choose that seat"
                            key={vertical + horizontal}
                            autoHideDuration={5000}
                            enter='0.5s'
                            exit='0.5s'
                        />
                        <div className='screen-header'>
                            <IconButton >
                                <Link style={{ textDecoration: 'none' }} to={{
                                    pathname: "/movie",
                                }}><ArrowBackIosRounded style={{ color: headerText }} /></Link>
                            </IconButton>
                            <span>{selectedMovie.name}</span>

                            <span style={{ color: 'darkgrey', marginLeft: '10px', fontSize: '0.75em' }}>
                                {selectedTheater.theaterName + " " + selectedTheater.address.city}</span>
                            <div className='screen-info'>
                                <div className='info'>
                                    <div className='seat' style={{ fontSize: '0.8em', backgroundColor: 'white', cursor: 'default', fontWeight: 500 }}>Available Seats</div>
                                    <div className='seat chosen' style={{ fontSize: '0.8em', cursor: 'default', fontWeight: 500 }}>Selected Seats</div>
                                    <Tooltip title="Other users have booked this seat" aria-label="add">
                                        <div className='seat booked' style={{ fontSize: '0.8em', fontWeight: 500 }}>Booked Seats</div>
                                    </Tooltip>
                                    <Tooltip title="Other users have locked these seats but payment is yet to be made" aria-label="add">
                                        <div className='seat locked' style={{ fontSize: '0.8em', fontWeight: 500 }}>Locked Seats</div>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                        <div className='seat-container'>
                            {Object.keys(seatPlan).length === 0 ?
                                <Loader />
                                : (seatPlan.exception === null ? (<Card className={classes.root} variant="outlined">
                                    {['PLATINUM', 'DIAMOND', 'GOLD'].map((seatType, index) => (
                                        <CardContent key={seatType}>
                                            <Typography variant="body2" color="textSecondary">
                                                {seatType + ' - Rs. ' + selectedScreen.priceOfDifferentSeatType[seatType]}
                                            </Typography>
                                            <div className='seat-map'>
                                                {seatMap[index].map((row, rowindex) => (
                                                    <div className='seat-row' key={row}>
                                                        {seatMap[index][rowindex].map(
                                                            (col, colIndex) => (
                                                                (seatPlan.response.bookedSeats !== undefined && seatPlan.response.bookedSeats.includes(seatMap[index][rowindex][colIndex]) ?
                                                                    <Tooltip title="Other user booked this seat" aria-label="add">
                                                                        <div className='seat booked' key={seatMap[index][rowindex][colIndex]}>
                                                                            {seatMap[index][rowindex][colIndex].split('C')[1]}
                                                                        </div>
                                                                    </Tooltip>
                                                                    : (seatPlan.response.lockedSeats !== undefined && seatPlan.response.lockedSeats.includes(seatMap[index][rowindex][colIndex]) ?
                                                                        <Tooltip title="Other user has locked this seat but payment is yet to be made" aria-label="add">
                                                                            <div className='seat locked' key={seatMap[index][rowindex][colIndex]}
                                                                            >
                                                                                {seatMap[index][rowindex][colIndex].split('C')[1]}
                                                                            </div></Tooltip>
                                                                        : (this.state.selectedSeats.includes(seatMap[index][rowindex][colIndex]) ?
                                                                            <div className='seat chosen' key={seatMap[index][rowindex][colIndex]}
                                                                                onClick={() => this.selectSeat(seatMap[index][rowindex][colIndex])}
                                                                            >
                                                                                {seatMap[index][rowindex][colIndex].split('C')[1]}
                                                                            </div>
                                                                            : <Tooltip title="Click to select this seat" aria-label="add">
                                                                                <div className='seat' key={seatMap[index][rowindex][colIndex]}
                                                                                    onClick={() => this.selectSeat(seatMap[index][rowindex][colIndex])}
                                                                                >
                                                                                    {seatMap[index][rowindex][colIndex].split('C')[1]}
                                                                                </div></Tooltip>))

                                                                )))}
                                                    </div>))}
                                            </div>
                                        </CardContent>
                                    ))}
                                    <div style={{ margin: '15px 0', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                        Screen
                                                <div className='screen'></div>
                                    </div>
                                </Card>
                                ) : <Redirect to={{
                                    pathname: '/error',
                                    state: {
                                        exception: seatPlan.exception
                                    }
                                }} />)}
                            {(this.state.selectedSeats.length > 0) && (<div className='pricecalculator'>
                                <div style={{ paddingLeft: '15px' }} className='priceheader'>Summary</div>
                                <div className='priceinfo'>
                                    <div style={{ paddingLeft: '15px' }}>Selected Seats : {this.state.selectedSeats.map(seat => seat + ', ')}</div>
                                    <div style={{ paddingLeft: '15px' }}>Total Price : Rs. {this.state.price}.00</div>
                                    <div style={{ paddingLeft: '15px' }}>Number of seats : {this.state.selectedSeats.length}</div>
                                    <div className='timebuttoncontainer'>
                                        <Button className='bookbutton' disabled={this.state.selectedSeats.length === 0}
                                            onClick={this.purchaseSeats}
                                            variant='outlined'
                                        >
                                            Book Now</Button>
                                    </div>
                                </div>
                            </div>)}
                        </div >
                        <Footer />

                    </div>)
        )
    }
}

const mapStateToProps = ({ selectedScreen, selectedTheater, seatPlan, selectedMovie, seatsAndPrice }) => {
    return { selectedScreen, seatPlan, selectedTheater, selectedMovie, seatsAndPrice }
}

export default compose(withStyles(styles), connect(mapStateToProps))(Screen)
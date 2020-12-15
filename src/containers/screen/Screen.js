import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card';
import { withStyles } from "@material-ui/core/styles";
import compose from 'recompose/compose';
import { CardContent, Typography, IconButton, Button, Tooltip } from '@material-ui/core';
import { ArrowBackIosRounded } from '@material-ui/icons'
import { headerText, buttonAvailable, buttonAvailableText } from '../../theme'
import { setSeatsAndPrice } from '../../store/actions/shared'
import { Redirect, Link } from 'react-router-dom'
import Loader from '../../shared-components/Loader'

const styles = (theme) => ({
    root: {
        width: '98%',
        borderBottom: 'none',
        borderTop: 'none',
        overFlow: 'auto',
    },

})

class Screen extends Component {
    state = {
        selectedSeats: [],
        price: 0,
        redirect: false
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
        /*Redirect to payment page and store state information in redux store*/
        this.props.dispatch(setSeatsAndPrice(this.state.selectedSeats, this.props.seatPlan.response.seatPlanId, this.state.price))
        this.setState({
            redirect: true
        })
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

    render() {
        const { seatPlan, selectedScreen, selectedTheater, selectedMovie, classes } = this.props

        const seatMap = Object.keys(selectedMovie).length === 0 ? [] : this.createSeatMap(selectedScreen)
        return (
            Object.keys(selectedMovie).length === 0 ? <Redirect to="/" /> :
                this.state.redirect ? (<Redirect to={{ pathname: '/purchase' }} />) : (
                    <div style={{ minHeight: '100vh', width: '100%', margin: 0, padding: 0 }}>
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
                                    <div className='seat' style={{ fontSize: '0.7em', backgroundColor: 'white', cursor: 'default' }}>Available Seats</div>
                                    <div className='seat chosen' style={{ fontSize: '0.7em', cursor: 'default' }}>Selected Seats</div>
                                    <Tooltip title="Other users have booked this seat" aria-label="add">
                                        <div className='seat booked' style={{ fontSize: '0.7em' }}>Booked Seats</div>
                                    </Tooltip>
                                    <Tooltip title="Other users have locked these seats but payment is yet to be made" aria-label="add">
                                        <div className='seat locked' style={{ fontSize: '0.7em' }}>Locked Seats</div>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                        <div className='seat-container'>
                            {Object.keys(seatPlan).length === 0 ?
                                <Loader />
                                : (seatPlan.exception === null ? (<Card className={classes.root} variant="outlined">
                                    {Object.keys(selectedScreen.noOfRowsPerSeatType).map((seatType, index) => (
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
                                                                    : (this.state.selectedSeats.includes(seatMap[index][rowindex][colIndex]) ?
                                                                        <div className='seat chosen' key={seatMap[index][rowindex][colIndex]}
                                                                            onClick={() => this.selectSeat(seatMap[index][rowindex][colIndex])}
                                                                        >
                                                                            {seatMap[index][rowindex][colIndex].split('C')[1]}
                                                                        </div>
                                                                        : (seatPlan.response.lockedSeats !== undefined && seatPlan.response.lockedSeats.includes(seatMap[index][rowindex][colIndex]) ?
                                                                            <Tooltip title="Other user has locked this seat but payment is yet to be made" aria-label="add">
                                                                                <div className='seat locked' key={seatMap[index][rowindex][colIndex]}
                                                                                >
                                                                                    {seatMap[index][rowindex][colIndex].split('C')[1]}
                                                                                </div></Tooltip>
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
                                    <div style={{ margin: 10, display: 'flex', alignItems: "center", justifyContent: "center" }}>
                                        <Button className='timebutton' disabled={this.state.selectedSeats.length === 0}
                                            onClick={this.purchaseSeats}
                                            variant='outlined'
                                        >
                                            Purchase - Rs {this.state.price}</Button>
                                    </div>
                                </Card>
                                ) : <Redirect to={{
                                    pathname: '/error',
                                    state: {
                                        exception: seatPlan.exception
                                    }
                                }} />)}
                        </div >
                    </div>)
        )
    }
}

const mapStateToProps = ({ selectedScreen, selectedTheater, seatPlan, selectedMovie }) => {
    return { selectedScreen, seatPlan, selectedTheater, selectedMovie }
}

export default compose(withStyles(styles), connect(mapStateToProps))(Screen)
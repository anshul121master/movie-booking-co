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

const styles = (theme) => ({
    root: {
        width: '70%',
        borderBottom: 'none',
        borderTop: 'none',
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
                price = this.calculatePrice(this.props.theater, selectedSeats)
            }
            else {
                selectedSeats = currentState.selectedSeats.concat(seat)
                price = this.calculatePrice(this.props.theater, selectedSeats)
            }
            return {
                selectedSeats: selectedSeats,
                price: price
            }
        })
    }

    purchaseSeats = () => {
        if (this.props.authedUser === null || this.props.authedUser === undefined) {
            /*Store state information in local storage*/
            localStorage.setItem('selectedSeats', this.state.selectedSeats)
            localStorage.setItem('movie', this.props.movie)
            localStorage.setItem('theater', this.props.theater)
            localStorage.setItem('price', this.props.price)
            this.setState({
                redirect: true
            })
        }
        else {
            /*Redirect to payment page and store state information in redux store*/
            //this.props.dispatch(setSeatsAndPrice(this.state.selectedSeats, this.props.seatPlanId, this.state.price))
            this.setState({
                redirect: true
            })
        }
    }

    createSeatMap = (theater) => {
        let seatMap = [];
        Object.keys(theater.noOfRowsPerSeatType).forEach(seatType => {
            let seatTypeMap = [];
            Array.from(Array(theater.noOfRowsPerSeatType[seatType]).keys()).forEach(
                (row) => {
                    let seatRow = [];
                    Array.from(Array(theater.columns).keys()).forEach(
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
        const { seatPlan, theater, movie, classes } = this.props
        const seatMap = this.createSeatMap(theater)
        return (
            this.state.redirect ? (<Redirect to={{ pathname: '/purchase' }} />) : (
                <div style={{ minHeight: '100vh', width: '100%', margin: 0, padding: 0 }}>
                    <div className='screen-header'>
                        <IconButton >
                            <Link style={{ textDecoration: 'none' }} to={{
                                pathname: "/",
                            }}><ArrowBackIosRounded style={{ color: headerText }} /></Link>
                        </IconButton>
                        <span>{movie.name}</span>s
                    <span style={{ color: 'darkgrey', marginLeft: '10px', fontSize: '0.75em' }}>
                            PVR Cinemas Pune</span>
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
                        <Card className={classes.root} variant="outlined">
                            {Object.keys(theater.noOfRowsPerSeatType).map((seatType, index) => (
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary">
                                        {seatType + ' - Rs. ' + theater.priceOfDifferentSeatType[seatType]}
                                    </Typography>
                                    <div className='seat-map'>
                                        {seatMap[index].map((row, rowindex) => (
                                            <div className='seat-row'>
                                                {seatMap[index][rowindex].map(
                                                    (col, colIndex) => (
                                                        (seatPlan.bookedSeats.includes(seatMap[index][rowindex][colIndex]) ?
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
                                                                : (seatPlan.lockedSeats.includes(seatMap[index][rowindex][colIndex]) ?
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
                                <Button style={{
                                    color: buttonAvailableText,
                                    backgroundColor: buttonAvailable,
                                }} disabled={this.state.selectedSeats.length === 0}
                                    onClick={this.purchaseSeats}
                                >
                                    Purchase - Rs {this.state.price}</Button>
                            </div>
                        </Card>
                    </div >
                </div>)
        )
    }
}

const mapStateToProps = ({/* theater, seatPlan, movie, authedUser */ }) => {
    const theater = {
        "screenId": "63f354b4-7050-4c49-a5c7-e0d646c04ae3",
        "theaterId": "90f7108a-aa14-44cf-b001-a2cc43cc0a65",
        "screenName": "s2",
        "dimension": "_2D",
        "screenTimes": [
            {
                "showDateList": [
                    {
                        "seatPlanId": "32f576a3-3076-4af3-a9e5-f6f27825ce3d",
                        "moviePlayingDate": "2020-11-30T13:43:57.827+00:00"
                    },
                    {
                        "seatPlanId": "453f8fef-31ec-40ea-8541-8bc7346e82a6",
                        "moviePlayingDate": "2020-12-01T13:43:57.827+00:00"
                    },
                    {
                        "seatPlanId": "4a6de352-c465-49cb-837d-b849dfe6806a",
                        "moviePlayingDate": "2020-12-02T13:43:57.827+00:00"
                    },
                    {
                        "seatPlanId": "36e52e7a-d588-4a68-bca6-9e7d1c72a926",
                        "moviePlayingDate": "2020-12-03T13:43:57.827+00:00"
                    },
                    {
                        "seatPlanId": "8f41a868-de05-472d-af0e-83cdc6787f09",
                        "moviePlayingDate": "2020-12-04T13:43:57.827+00:00"
                    },
                    {
                        "seatPlanId": "b366704f-e30f-4987-a924-8d2c3b0f8b3b",
                        "moviePlayingDate": "2020-12-05T13:43:57.827+00:00"
                    },
                    {
                        "seatPlanId": "7a75aff8-2374-4b5a-810d-df1f07c59140",
                        "moviePlayingDate": "2020-12-06T13:43:57.827+00:00"
                    }
                ],
                "showTiming": "S20",
                "movieId": "4fc75cbb-c783-478f-9a0d-e49fc50699dd"
            },
            {
                "showDateList": [
                    {
                        "seatPlanId": "57b8ace1-9644-4344-9796-601f77f37d71",
                        "moviePlayingDate": "2020-11-30T13:43:57.827+00:00"
                    },
                    {
                        "seatPlanId": "5761d893-1656-4423-a50c-f42be28924ab",
                        "moviePlayingDate": "2020-12-01T13:43:57.827+00:00"
                    },
                    {
                        "seatPlanId": "d2882592-efc8-490e-9e92-2ca3664bc430",
                        "moviePlayingDate": "2020-12-02T13:43:57.827+00:00"
                    },
                    {
                        "seatPlanId": "672c299d-3779-4d1d-82ee-1c77ba704839",
                        "moviePlayingDate": "2020-12-03T13:43:57.827+00:00"
                    },
                    {
                        "seatPlanId": "cdfe6a48-b4cf-42d8-a769-c2548b3c8b17",
                        "moviePlayingDate": "2020-12-04T13:43:57.827+00:00"
                    },
                    {
                        "seatPlanId": "97a7c0b1-6287-4325-9309-c64e7233acd3",
                        "moviePlayingDate": "2020-12-05T13:43:57.827+00:00"
                    },
                    {
                        "seatPlanId": "fadfacdc-3d6e-4340-b967-9c93e8be6ac2",
                        "moviePlayingDate": "2020-12-06T13:43:57.827+00:00"
                    }
                ],
                "showTiming": "S23",
                "movieId": "4fc75cbb-c783-478f-9a0d-e49fc50699dd"
            }
        ],
        "columns": 12,
        "noOfRowsPerSeatType": {
            "DIAMOND": 2,
            "GOLD": 4,
            "PLATINUM": 2
        },
        "priceOfDifferentSeatType": {
            "DIAMOND": 140,
            "GOLD": 120,
            "PLATINUM": 100
        }
    }
    const seatPlan = {
        "seatPlanId": "706b783a-412e-4733-91c1-51a748349e90",
        "bookedSeats": ["GR1C3",
            "PR1C4"],
        "lockedSeats": [
            "GR1C2",
            "PR1C2"
        ]
    }
    const movie = {
        "movieId": "f16579ce-cccf-4a4d-9825-823fa4f1d021",
        "name": "Jab tak hai jaan",
        "genre": "Romance",
        "duration": "2.1 hrs",
        "movieDimension": "_2D",
        "rating": 9.1,
        "dateReleased": "2011-12-28T00:00:00.000+00:00",
        "casts": [
            "Shahrukh Khan",
            "Katrina Kaif",
            "Anushka Sharma"
        ],
        "languages": [
            "Hindi",
            "English"
        ]
    }
    return { theater, seatPlan, movie }
}

export default compose(withStyles(styles), connect(mapStateToProps))(Screen)
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { DoneAllRounded } from '@material-ui/icons'
import { Link } from 'react-router-dom'

class PaymentForm extends Component {

    render() {
        return (
            <div className='payment-form'>
                <Card variant='outlined'>
                    <CardContent>
                        {this.props.bookingStatus === '' ? (<div className="checkout">
                            <div className="checkout-container">
                                <form onSubmit={(event) => this.props.purchaseTicket(event)}>
                                    <h3 className="heading-3">Credit / Debit card checkout</h3>
                                    <Input label="Cardholder's Name" type="text" name="name" />
                                    <Input label="Card Number" type="number" name="card_number" />
                                    <div className="row">
                                        <div className="col">
                                            <Input label="Expiration Date" type="month" name="exp_date" />
                                        </div>
                                        <div className="col">
                                            <Input label="CVV" type="password" name="cvv" />
                                        </div>
                                    </div>
                                    <Button text="Purchase" />
                                </form>
                            </div>
                        </div>
                        ) :
                            (<div className='booking-checkout-container'>
                                <DoneAllRounded fontSize='large' style={{ color: 'green' }} />
                                <div style={{ margin: '5', fontSize: '2em' }}>Booking Confirmed</div>
                                <div></div>
                                <Link style={{ textDecoration: 'none' }} to={{
                                    pathname: "/",
                                }}>Click to go to Home Page</Link>
                            </div>
                            )
                        }
                    </CardContent>
                </Card>
            </div>
        )
    }
}

const Input = (props) => (
    <div className="input">
        <label>{props.label}</label>
        <div className="input-field">
            <input type={props.type} name={props.name} required />
        </div>
    </div>
);

const Button = (props) => (
    <button type='submit' className="checkout-btn">{props.text}</button>
);

const mapStateToProps = ({ /*theater, selectedSeats, price, movie, time, date, seatPlanId */ }) => {
    const theater = {
        "screenName": "s2",
        "dimension": "_2D",
        "name": 'PVR Cinemas',
        "city": "Mumbai"
    }
    const selectedSeats = ['GR1C1', 'GR1C2']
    const price = 450
    const movie = {
        "name": "Jab tak hai jaan",
        "genre": "Romance",
    }
    const time = 'S21'
    const date = '2020-11-30'
    const seatPlanId = "e5c7b582-03c0-492f-8fe9-1026e5be461c"

    return { theater, selectedSeats, price, movie, time, date, seatPlanId }

}

export default connect(mapStateToProps)(PaymentForm)
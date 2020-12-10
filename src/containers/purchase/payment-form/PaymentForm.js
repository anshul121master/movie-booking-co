import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { DoneAllRounded } from '@material-ui/icons'
import { Link } from 'react-router-dom'

class PaymentForm extends Component {
    state = {
        isValidName: true,
        isValidCardNumber: true,
        isValidCVV: true,
        nameValue: '',
        cardNumberValue: '',
        cvvValue: '',
        nameErrorMsg: '',
        cvvErrorMsg: '',
        cardNumberErrorMsg: ''
    }

    handleNameChange(e) {
        const value = e.target.value;
        if (!(value.match(/^[A-Za-z]+$/) || value === ""))
            this.setState({
                nameValue: value,
                isValidName: false,
                nameErrorMsg: 'Please enter valid name'
            });
        else
            this.setState({
                nameValue: value,
                isValidName: true,
                nameErrorMsg: ''
            });
    }

    handleCardNumberChange(e) {
        const value = e.target.value;
        if (!(value.match(/^[0-9]{16}$/) || value === ""))
            this.setState({
                cardNumberValue: value,
                isValidCardNumber: false,
                cardNumberErrorMsg: 'Please enter valid 16 digit card number'
            });
        else
            this.setState({
                cardNumberValue: value,
                isValidCardNumber: true,
                cardNumberErrorMsg: ''
            });
    }

    handleCVVChange(e) {
        const value = e.target.value;
        if (!(value.match(/^[0-9]{3}$/) || value === ""))
            this.setState({
                cvvValue: value,
                isValidCVV: false,
                cvvErrorMsg: 'Please enter valid 3 digit CVV number'
            });
        else
            this.setState({
                cvvValue: value,
                isValidCVV: true,
                cvvErrorMsg: ''
            });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { isValidName, isValidCVV, isValidCardNumber } = this.state;
        if (isValidCVV && isValidCardNumber && isValidName) {
            this.props.purchaseTicket(event)
        }
    }

    disableButton() {
        const { isValidName, isValidCVV, isValidCardNumber } = this.state;
        if (isValidCVV === false && isValidCardNumber === false && isValidName === false) {
            return true;
        } else return false;
    }


    render() {
        const { nameValue, cvvValue, cardNumberValue, nameErrorMsg, cvvErrorMsg, cardNumberErrorMsg } = this.state;
        return (
            <div className='payment-form'>
                <Card variant='outlined'>
                    <CardContent>
                        {this.props.bookingStatus === '' ? (<div className="checkout">
                            <div className="checkout-container">
                                <form onSubmit={(event) => this.handleSubmit(event)
                                }>
                                    <h3 className="heading-3">Credit / Debit card checkout</h3>
                                    <Input label="Cardholder's Name" type="text" name="name"
                                        value={nameValue} onChange={(e) => this.handleNameChange(e)} />
                                    <div className="errorMsg">{nameErrorMsg ? nameErrorMsg : ""}</div>
                                    <Input label="Card Number" type="number" name="card_number"
                                        value={cardNumberValue} onChange={(e) => this.handleCardNumberChange(e)} />
                                    <div className="errorMsg">{cardNumberErrorMsg ? cardNumberErrorMsg : ""}</div>
                                    <div className="row">
                                        <div className="col">
                                            <Input label="Expiration Date" type="month" name="exp_date" />
                                        </div>
                                        <div className="col">
                                            <Input label="CVV" type="password" name="cvv"
                                                value={cvvValue} onChange={(e) => this.handleCVVChange(e)} />
                                            <div className="errorMsg">{cvvErrorMsg ? cvvErrorMsg : ""}</div>
                                        </div>
                                    </div>
                                    <Button disabled={this.disableButton()} text="Purchase" />
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
            <input type={props.type} name={props.name} required onChange={props.onChange} value={props.value} />
        </div>
    </div>
);

const Button = (props) => (
    <button type='submit' className="checkout-btn">{props.text}</button>
);


export default connect()(PaymentForm)
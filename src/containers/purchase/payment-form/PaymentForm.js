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
        if (!(value.match(/^[a-zA-Z\x20]+$/) || value === ""))
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
        if (value.length < 20) {
            if (!((/^[\d]{4}-[\d]{4}-[\d]{4}-[\d]{4}$/g).test(value) || value === ""))
                this.setState({
                    cardNumberValue: (value.length === 5 && ((/^[\d]{1}$/g).test(value.charAt(4)))) ?
                        value.substring(0, 4) + "-" + value.substring(4) :
                        (value.length === 10 && ((/^[\d]{1}$/g).test(value.charAt(9)))) ?
                            value.substring(0, 9) + "-" + value.substring(9) :
                            (value.length === 15 && ((/^[\d]{1}$/g).test(value.charAt(14)))) ?
                                value.substring(0, 14) + "-" + value.substring(14) : value,
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
    }

    handleCVVChange(e) {
        const value = e.target.value;
        if (value.length < 4) {
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
                                    <Input label="Card Number" type="text" name="card_number"
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
                                    <Button disabled={this.disableButton()} text="Pay Now" />
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
                                }}
                                    onClick={() => this.props.setSeatPlanUndefined()}
                                >Click to go to Home Page</Link>
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
            {props.type === 'month' ?
                <input type={props.type} name={props.name} required onChange={props.onChange} value={props.value}
                    defaultValue={`${new Date().getFullYear()}-${new Date().getMonth() + 1}`}
                    min={`${new Date().getFullYear()}-${new Date().getMonth() + 1}`} /> :
                <input type={props.type} name={props.name} required onChange={props.onChange} value={props.value} />}
        </div>
    </div>
);

const Button = (props) => (
    <button type='submit' className="checkout-btn">{props.text}</button>
);


export default connect()(PaymentForm)
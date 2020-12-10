import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Error extends Component {
    render() {
        const code = this.props.exception ?  this.props.exception.code : this.props.location.state.exception.code;
        const errorMsg = this.props.exception ?  this.props.exception.errorMsg : this.props.location.state.exception.errorMsg;
        return (
            <div className='login'>
                <div className='login-container'>
                    <div className='login-label'>{code} Exception occured (The application broke)!</div>
                    <div style={{ fontSize: '1.2em' }}>{errorMsg}</div>
                    <Link style={{ textDecoration: 'none' }} to={{
                        pathname: "/",
                    }}>Click to go to Home Page</Link>
                </div>
            </div>
        );
    }
}

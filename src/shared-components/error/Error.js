import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Error extends Component {
    render() {
        return (
            <div className='login'>
                <div className='login-container'>
                    <div className='login-label'>{this.props.exception.errorMsg} Exception occured (The application broke)!</div>
                    <div style={{ fontSize: '1.2em' }}>{this.props.exception.errorMsg}</div>
                    <Link style={{ textDecoration: 'none' }} to={{
                        pathname: "/",
                    }}>Click to go to Home Page</Link>
                </div>
            </div>
        );
    }
}
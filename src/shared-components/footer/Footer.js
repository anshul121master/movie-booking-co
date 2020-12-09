import React from 'react';
import { GitHub, Instagram, LinkedIn, Twitter, Facebook } from '@material-ui/icons';
import { footerText, footer } from '../../theme'

export default function Footer() {

    const footerStyle = {
        color: footerText,
        backgroundColor: footer,
        paddingTop: '1em',
        paddingBottom: '1em',
        position: 'relative',
        bottom: '-50px',
        width: '100%',
        top: 'auto'
    }

    return (
        <div className="main-footer" style={footerStyle}>
            <div className="container">
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                    {/* Column1 */}
                    <div style={{
                        fontSize: '1em'
                    }}>
                        <h4 style={{ fontSize: '1.2em', paddingLeft: '1.2em', textAlign: 'center' }}>MovieBooking.co</h4>
                        <ul style={{ fontSize: '1em', listStyleType: 'none' }}>
                            <li style={{}}>033 6621 5000</li>
                            <li>Pune, India</li>
                            <li>Talwade</li>
                        </ul>
                    </div>
                    {/* Column2 */}
                    <div style={{
                        fontSize: '1em',
                    }}>
                        <h4 style={{ fontSize: '1.2em', paddingLeft: '0.5em' }}>Follow Us</h4>
                        <ul style={{
                            fontSize: '1em', listStyleType: 'none',
                        }}>
                            <li><Facebook /></li>
                            <li><Twitter /></li>
                            <li><Instagram /></li>
                        </ul>
                    </div>
                    {/* Column3 */}
                    <div style={{
                        fontSize: '1em'
                    }}>
                        <h4 style={{ fontSize: '1.2em' }}> Support Us</h4>
                        <ul style={{
                            fontSize: '1em', listStyleType: 'none',
                        }}>
                            <li><GitHub /></li>
                            <li><LinkedIn /></li>
                        </ul>
                    </div>
                </div>
                <hr />
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                    <p className="col-sm">
                        &copy;{new Date().getFullYear()} MovieBooking.co | All rights reserved |
          Terms Of Service | Privacy
        </p>
                </div>
            </div>
        </div>);
}
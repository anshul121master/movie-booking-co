import React from 'react';
import { GitHub, Instagram, LinkedIn, Twitter, Facebook } from '@material-ui/icons';
import { footerText, footer, headerText, header } from '../../theme'

export default function Footer() {

    const footerStyle = {
        color: headerText,
        backgroundColor: header,
        paddingTop: '1em',
        paddingBottom: '1em',
        position: 'absolute',
        bottom: '0',
        width: '100%',
        top: 'auto',
        marginTop: '50px',
        height: '185px'
    }

    const phantom = {
        display: 'block',
        padding: '20px',
        height: '185px',
    }


    const copyRightStyle = {
        backgroundColor: header,
        color: headerText,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
    }


    return (
        <div>
            <div style={phantom}></div>
            <div className="main-footer" style={footerStyle}>
                <div className="container">
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                        {/* Column1 */}
                        <div style={{
                            fontSize: '1em'
                        }}>
                            <h4 style={{ fontSize: '1.2em', textAlign: 'center' }}>MovieBooking.co</h4>
                            <ul style={{ fontSize: '1em', listStyleType: 'none' }}>
                                <li>033 6621 5000</li>
                                <li>Pune, India</li>
                                <li>Talwade</li>
                            </ul>
                        </div>
                        {/* Column2 */}
                        <div style={{
                            fontSize: '1em',
                        }}>
                            <h4 style={{ fontSize: '1.2em' }}>Follow Us</h4>
                            <ul style={{
                                fontSize: '1em', listStyleType: 'none',
                                display: 'flex', flexDirection: 'column',
                                alignItems: 'center', justifyContent: 'center',
                                paddingTop: 5
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
                                display: 'flex', flexDirection: 'column',
                                alignItems: 'center', justifyContent: 'center',
                                paddingTop: 5
                            }}>
                                <li><GitHub /></li>
                                <li><LinkedIn /></li>
                            </ul>
                        </div>
                    </div>
                    <hr />
                    <div style={copyRightStyle}>
                        <p className="col-sm">
                            &copy;{new Date().getFullYear()} MovieBooking.co | All rights reserved |
          Terms Of Service | Privacy
        </p>
                    </div>
                </div>
            </div>
        </div>);
}
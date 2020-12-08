import React, { Component } from 'react'
import { connect } from 'react-redux'
import Ticket from '../../shared-components/ticket/Ticket'
import PaymentForm from './payment-form/PaymentForm'
import { ArrowBackIosRounded } from '@material-ui/icons'
import { headerText, } from '../../theme'
import { IconButton } from '@material-ui/core'

class Purchase extends Component {
    render() {
        return (
            <div style={{ minHeight: '100vh', width: '100%', margin: 0, padding: 0 }}>
                <div className='screen-header'>
                    <IconButton >
                        <ArrowBackIosRounded style={{ color: headerText }} />
                    </IconButton>
                    <span>Jab Tak Hai Jaan</span>
                    <span style={{ color: 'darkgrey', marginLeft: '10px', fontSize: '0.75em' }}>
                        PVR Cinemas Mumbai</span>
                    <div className='screen-info'>
                        <div className='info'>
                            Purchase tickets
                        </div>
                    </div>
                </div>
                <div className='purchase-container'>
                    <PaymentForm />
                    <Ticket
                        theater={{
                            "screenName": "s2",
                            "dimension": "_2D",
                            "name": 'PVR Cinemas',
                            "city": "Mumbai"
                        }}
                        selectedSeats={['GR1C1', 'GR1C2']}
                        price={450}
                        movie={{
                            "name": "Jab tak hai jaan",
                            "genre": "Romance",
                        }}
                        time='S21'
                        date='2020-11-30'
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({/* selectedTheater, theater, movie, selectedSeats, price */ }) => {

}

export default connect(mapStateToProps)(Purchase)
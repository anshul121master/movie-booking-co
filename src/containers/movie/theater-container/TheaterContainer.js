import React, { Component } from 'react'
import { connect } from 'react-redux'

class TheaterContainer extends Component {
    state = {
        selectedDate: ''
    }
    render() {
        const {theatersList} = this.props;
        const { selectedDate } = this.state;
        return (
            <div>
                {/* calender Component render and pass the value to theatercard- 1 week */}
                {/* iterate over theatersList and render theater cards */}
                {theatersList.map(theater => 
                <TheaterCard key={theater.theaterId} theater={theater} selectedDate={selectedDate}/> 
                )} 
            </div>
        )
    }
}

function mapStateToProps({theatersList}) {
    return {
        theatersList
    }
}

export default connect(mapStateToProps)(TheaterContainer)
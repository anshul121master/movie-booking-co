import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setTheaterAndShowTimings } from '../../../store/actions/shared';

class TheaterContainer extends Component {
    handleSelectedTheater = (theater) => {
        const { dispatch } = this.props;
        dispatch(setTheaterAndShowTimings(theater));
        // dispatch theater object and showTimings to store
    }

    render() {
        const {theatersList} = this.props;
        return (
            <div>
                {/* iterate over theatersList and render theater cards */}
                {theatersList.map(theater => 
                <TheaterCard key={theater.theaterId} theaterDetails ={theater} handleSelectedTheater={this.handleSelectedTheater}/> 
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
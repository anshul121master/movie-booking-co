import React, { Component } from 'react'
import { connect } from 'react-redux'

class MovieDetails extends Component {
    render() {
        const {selectedMovie} = this.props;
        return (
            <div>
               Movie Details
            </div>
        )
    }
}

function mapStateToProps({selectedMovie}) {
    return {
        selectedMovie
    }
}

export default connect(mapStateToProps)(MovieDetails)
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from '../../shared-components/header/Header'
import MovieDetails from './movie-details/MovieDetails'
import TheaterContainer from './theater-container/TheaterContainer'
import Footer from '../../shared-components/footer/Footer'

class Movie extends Component {

    render() {
        return (
            <div>
                <Header listOfCities={this.props.listOfCities.response} />
                <MovieDetails selectedMovie={this.props.selectedMovie} />
                <TheaterContainer />
                <Footer />
            </div>
        )
    }
}

function mapStateToProps({ selectedMovie }) {
    return {
        selectedMovie
    }
}

export default connect(mapStateToProps)(Movie)
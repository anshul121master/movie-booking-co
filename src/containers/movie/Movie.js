import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from '../../shared-components/header/Header'
import MovieDetails from './movie-details/MovieDetails'
import TheaterContainer from './theater-container/TheaterContainer'
import Footer from '../../shared-components/footer/Footer'
import { Redirect } from "react-router-dom";

class Movie extends Component {

    render() {
        const { selectedMovie, listOfCities } = this.props
        return (
            Object.keys(selectedMovie).length === 0 ? <Redirect to="/" /> :
            <div>
                <Header listOfCities={listOfCities.response} />
                <MovieDetails selectedMovie={selectedMovie} />
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
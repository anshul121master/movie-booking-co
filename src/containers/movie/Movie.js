import React, { Component } from 'react'
import Header from '../../shared-components/header/Header'
import MovieDetails from './movie-details/MovieDetails'
import TheaterContainer from './theater-container/TheaterContainer'

export default class Movie extends Component {
    render() {
        return (
            <div>
                <Header />
                <MovieDetails />
                <TheaterContainer />
                <Footer />
            </div>
        )
    }
}
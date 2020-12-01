import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setMovieAndTheaterList } from '../../../store/actions/shared';
import { Redirect } from 'react-router-dom';

class MovieContainer extends Component {
    state = {
        movieSelected: false
    }

    handleSelectedMovie = (movie) => {
        const { dispatch } = this.props;
        const { movieSelected } = this.state;
        dispatch(setMovieAndTheaterList(movie));
        this.setState({
            movieSelected: true
        })
            // dispatch movie object and theatersList to store
            // setstate to true
            // navigate to moviepage
    }

    render() {
        const { moviesList } = this.props;
        if(this.state.movieSelected === true) {
            return <Redirect to='/moviePage' />
        }


        return (
            <div>
                MovieContainer
                {/* iterate over moviesList and render movie cards */}
                {/* {moviesList.map(movie => 
                <MovieCard key={movie.movieId} movieDetails ={movie} handleSelectedMovie={this.handleSelectedMovie}/> 
                )} */}
            </div>
        )
    }
}

function mapStateToProps({moviesList}) {
    return {
        moviesList
    }
}

export default connect(mapStateToProps)(MovieContainer)
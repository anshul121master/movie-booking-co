import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setMovieAndTheaterList } from '../../../store/actions/shared';
import { Redirect } from 'react-router-dom';
import MovieCard from './components/MovieCard'
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import { GridListTile } from '@material-ui/core';
import MovieCarousel from './components/MovieCarousel'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import Loader from "../../../shared-components/Loader";

class MovieContainer extends Component {
	state = {
		redirect: false
	}

	handleSelectedMovie = (movie) => {
		const { dispatch } = this.props;
		dispatch(setMovieAndTheaterList(movie, true));
		this.setState({
			redirect: true
		})
		// dispatch movie object and theatersList to store
		// setstate to true
		// navigate to moviepage	
	}

	getGridListCols = () => {
		if (isWidthUp('xl', this.props.width)) {
			return 5;
		}

		if (isWidthUp('lg', this.props.width)) {
			return 4;
		}

		if (isWidthUp('md', this.props.width)) {
			return 3;
		}

		return 1;
	}

	render() {
		const { moviesList } = this.props;
		const { response, exception } = moviesList;

		return (
			(Object.keys(moviesList).length !== 0 ?
				((exception === null ?
					(this.state.redirect ? (<Redirect to={{ pathname: '/movie' }} />) : (
						<div>
							<React.Fragment>
								<MovieCarousel moviesList={moviesList.response} handleSelectedMovie={this.handleSelectedMovie} />
							</React.Fragment>
							<div style={{ margin: 25, padding: 10 }}>
								<Typography gutterBottom variant="h5" component="h2" style={{ fontWeight: 'bold' }}>
									Currently Running
					</Typography>
								{(response.filter(movie => new Date(movie.dateReleased) < new Date()).length > 0 ?
									<GridList style={{ flexWrap: 'wrap' }} cols={this.getGridListCols()} spacing={15}>
										{response.filter(movie => new Date(movie.dateReleased) < new Date()).map(movie =>
											<GridListTile key={movie.movieId} style={{ height: '100%' }}>
												<MovieCard movie={movie} handleSelectedMovie={this.handleSelectedMovie} />
											</GridListTile>
										)}
									</GridList>
									: <p>No movies available at this time</p>)}
							</div>

							<div style={{ margin: 25, padding: 10 }}>
								<Typography gutterBottom variant="h6" component="h2" style={{ fontWeight: 'bold' }}>
									Upcoming Movies
					</Typography>
								{(response.filter(movie => new Date(movie.dateReleased) > new Date()).length > 0 ?
									<GridList style={{ flexWrap: 'nowrap' }} cols={this.getGridListCols()} spacing={15}>
										{response.filter(movie => new Date(movie.dateReleased) > new Date()).map(movie =>
											<GridListTile key={movie.movieId} style={{ height: '100%' }}>
												<MovieCard movie={movie} handleSelectedMovie={this.handleSelectedMovie} />
											</GridListTile>
										)}
									</GridList>
									: <p>No movies available at this time</p>)}
							</div>
						</div>))
					: <Redirect to={{
						pathname: '/error',
						state: {
							exception: exception
						}
					}} />))
				: <Loader />)
		)
	}
}

function mapStateToProps({ moviesList }) {
	return {
		moviesList
	}
}

export default withWidth()(connect(mapStateToProps)(MovieContainer))
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

class MovieContainer extends Component {
	state = {
		movieSelected: false,
		redirect: false
	}

	handleSelectedMovie = (movie) => {
		const { dispatch } = this.props;
		const { movieSelected } = this.state;
		dispatch(setMovieAndTheaterList(movie));
		this.setState({
			movieSelected: true,
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
		// const {moviesList} = this.state;
		const { moviesList } = this.props;
		return (
			this.state.redirect ? (<Redirect to={{ pathname: '/movie' }} />) : (
				<div>
					<React.Fragment>
						<MovieCarousel moviesList={moviesList} handleSelectedMovie={this.handleSelectedMovie} />
					</React.Fragment>
					<div style={{ margin: 25, padding: 10 }}>
						<Typography gutterBottom variant="h5" component="h2" style={{ fontWeight: 'bold' }}>
							Currently Running
					</Typography>

						<GridList style={{ flexWrap: 'wrap' }} cols={this.getGridListCols()} spacing={15}>
							{moviesList.filter(movie => new Date(movie.dateReleased) < new Date()).map(movie =>
								<GridListTile key={movie.movieId} style={{ height: '100%' }}>
									<MovieCard movie={movie} handleSelectedMovie={this.handleSelectedMovie} />
								</GridListTile>
							)}
						</GridList>
					</div>

					<div style={{ margin: 25, padding: 10 }}>
						<Typography gutterBottom variant="h6" component="h2" style={{ fontWeight: 'bold' }}>
							Upcoming Movies
					</Typography>

						<GridList style={{ flexWrap: 'nowrap' }} cols={this.getGridListCols()} spacing={15}>
							{moviesList.filter(movie => new Date(movie.dateReleased) > new Date()).map(movie =>
								<GridListTile key={movie.movieId} style={{ height: '100%' }}>
									<MovieCard movie={movie} handleSelectedMovie={this.handleSelectedMovie} />
								</GridListTile>
							)}
						</GridList>
					</div>
				</div>)
		)
	}
}

function mapStateToProps({ moviesList }) {
	return {
		moviesList
	}
}

export default withWidth()(connect(mapStateToProps)(MovieContainer))
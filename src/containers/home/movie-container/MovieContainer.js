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
import { withStyles } from '@material-ui/core/styles';
import { header } from '../../../theme'
import { Divider } from '@material-ui/core';

const styles = (theme) => ({
	title: {
		fontWeight: 'bold'
	}, 
	tile : {
		margin: 25, 
		padding: 10
	},
	listContainer: {
		flexWrap: 'wrap',
		overflowY: 'inherit',
		justifyContent: 'center'
	},
	cardListItem: {
		margin: '0.5em', 
		boxShadow: '0 4px 8px 0 rgba(0,0,0,0.4)', 
		padding: 0 ,
		height: 'auto !important',
		borderRadius: '15px'
	}
})


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

		if (isWidthUp('sm', this.props.width)) {
			return 2;
		}

		return 1;
	}

	render() {
		const { moviesList, classes } = this.props;
		const { response, exception } = moviesList;

		return (
			(Object.keys(moviesList).length !== 0 ?
				((exception === null ?
					(this.state.redirect ? (<Redirect to={{ pathname: '/movie' }} />) : (
						<div>
							<React.Fragment>
								<MovieCarousel moviesList={moviesList.response} handleSelectedMovie={this.handleSelectedMovie} />
							</React.Fragment>
							<div style={{width:'75%', margin:'auto'}}><Divider variant="middle"/></div>
							
							<div className={classes.tile}>
								<Typography gutterBottom variant="h5" component="h2" className={classes.title} >
									Currently Running
								</Typography>
								{(response.filter(movie => new Date(movie.dateReleased) < new Date()).length > 0 ?
									<GridList className={classes.listContainer} cols={this.getGridListCols()} spacing={0}>
										{response.filter(movie => new Date(movie.dateReleased) < new Date()).map(movie =>
											<GridListTile key={movie.movieId} className={classes.cardListItem}>
												<MovieCard movie={movie} handleSelectedMovie={this.handleSelectedMovie} style={{height:'auto'}}/>
											</GridListTile>
										)}
									</GridList>
									: <Typography variant="h6" style={{margin:'15px'}}>No movies available at this time</Typography>)}
							</div>
							<div style={{width:'75%', margin:'auto'}}><Divider variant="middle"/></div>
							<div className={classes.tile}>
								<Typography gutterBottom variant="h5" component="h2" className={classes.title} >
									Upcoming Movies
					</Typography>
								{(response.filter(movie => new Date(movie.dateReleased) > new Date()).length > 0 ?
									<GridList className={classes.listContainer} cols={this.getGridListCols()} spacing={0}>
										{response.filter(movie => new Date(movie.dateReleased) > new Date()).map(movie =>
											<GridListTile key={movie.movieId} className={classes.cardListItem}>
												<MovieCard movie={movie} handleSelectedMovie={this.handleSelectedMovie} />
											</GridListTile>
										)}
									</GridList>
									: <Typography variant="h6" style={{margin:'15px'}}>No movies available at this time</Typography>)}
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

export default withStyles(styles)(withWidth()(connect(mapStateToProps)(MovieContainer)))
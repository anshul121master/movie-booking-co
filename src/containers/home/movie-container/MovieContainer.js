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
        moviesList: [
			{
				"movieId": "42696626-0126-45ee-87c6-a501ab71374c",
				"name": "Zero",
				"genre": "Comedy/ Drama",
				"duration": "2.8 hrs",
				"movieDimension": "2D",
				"rating": 9.1,
				"moviePoster": "1708887362549_zero.jpeg",
				"dateReleased": 1151193600000,
				"casts": [
					"Shahrukh Khan",
					"Anushka Sharma"
				],
				"languages": [
					"Hindi"
				]
            },
            {
				"movieId": "42696626-0126-45ee-87c6-a501ab71374c",
				"name": "Zero1",
				"genre": "Comedy/ Drama",
				"duration": "2.8 hrs",
				"movieDimension": "2D",
				"rating": 9.1,
				"moviePoster": "1708887362549_zero.jpeg",
				"dateReleased": 1610193600000,
				"casts": [
					"Shahrukh Khan",
					"Anushka Sharma"
				],
				"languages": [
					"Hindi"
				]
            },{
				"movieId": "42696626-0126-45ee-87c6-a501ab71374c",
				"name": "abc",
				"genre": "Comedy/ Drama",
				"duration": "2.8 hrs",
				"movieDimension": "2D",
				"rating": 9.1,
				"moviePoster": "1708887362549_zero.jpeg",
				"dateReleased": 1151193600000,
				"casts": [
					"Shahrukh Khan",
					"Anushka Sharma"
				],
				"languages": [
					"Hindi"
				]
            }
            ,{
				"movieId": "42696626-0126-45ee-87c6-a501ab71374c",
				"name": "abc",
				"genre": "Comedy/ Drama",
				"duration": "2.8 hrs",
				"movieDimension": "2D",
				"rating": 9.1,
				"moviePoster": "1708887362549_zero.jpeg",
				"dateReleased": 1151193600000,
				"casts": [
					"Shahrukh Khan",
					"Anushka Sharma"
				],
				"languages": [
					"Hindi"
				]
            },{
				"movieId": "42696626-0126-45ee-87c6-a501ab71374c",
				"name": "abc",
				"genre": "Comedy/ Drama",
				"duration": "2.8 hrs",
				"movieDimension": "2D",
				"rating": 9.1,
				"moviePoster": "1708887362549_zero.jpeg",
				"dateReleased": 1151193600000,
				"casts": [
					"Shahrukh Khan",
					"Anushka Sharma"
				],
				"languages": [
					"Hindi"
				]
            },{
				"movieId": "42696626-0126-45ee-87c6-a501ab71374c",
				"name": "abc",
				"genre": "Comedy/ Drama",
				"duration": "2.8 hrs",
				"movieDimension": "2D",
				"rating": 9.1,
				"moviePoster": "1708887362549_zero.jpeg",
				"dateReleased": 1151193600000,
				"casts": [
					"Shahrukh Khan",
					"Anushka Sharma"
				],
				"languages": [
					"Hindi"
				]
            },{
				"movieId": "42696626-0126-45ee-87c6-a501ab71374c",
				"name": "abc",
				"genre": "Comedy/ Drama",
				"duration": "2.8 hrs",
				"movieDimension": "2D",
				"rating": 9.1,
				"moviePoster": "1708887362549_zero.jpeg",
				"dateReleased": 1151193600000,
				"casts": [
					"Shahrukh Khan",
					"Anushka Sharma"
				],
				"languages": [
					"Hindi"
				]
            },{
				"movieId": "42696626-0126-45ee-87c6-a501ab71374c",
				"name": "abc",
				"genre": "Comedy/ Drama",
				"duration": "2.8 hrs",
				"movieDimension": "2D",
				"rating": 9.1,
				"moviePoster": "1708887362549_zero.jpeg",
				"dateReleased": 1151193600000,
				"casts": [
					"Shahrukh Khan",
					"Anushka Sharma"
				],
				"languages": [
					"Hindi"
				]
            },
            {
				"movieId": "42696626-0126-45ee-87c6-a501ab71374c",
				"name": "cde",
				"genre": "Comedy/ Drama",
				"duration": "2.8 hrs",
				"movieDimension": "2D",
				"rating": 9.1,
				"moviePoster": "1708887362549_zero.jpeg",
				"dateReleased": 1610193600000,
				"casts": [
					"Shahrukh Khan",
					"Anushka Sharma"
				],
				"languages": [
					"Hindi"
				]
            }
		]
    }

    handleSelectedMovie = (movie) => {
        const { dispatch } = this.props;
        const { movieSelected } = this.state;
        dispatch(setMovieAndTheaterList(movie));
        this.setState({
            movieSelected: true
        })
        console.log(JSON.stringify(movie))
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
        const {moviesList} = this.state;
        //const {moviesList} = this.props;
        return (
            <div>
				<React.Fragment>
                	<MovieCarousel moviesList={moviesList} handleSelectedMovie={this.handleSelectedMovie}/>
				</React.Fragment>
				<div style={{margin:25, padding: 10}}>
					<Typography gutterBottom variant="h5" component="h2" style={{fontWeight:'bold'}}>
						Currently Running
					</Typography>
					
					<GridList style={{flexWrap: 'wrap'}} cols={this.getGridListCols()} spacing={15}>
					{moviesList.filter(movie => new Date(movie.dateReleased) < new Date()).map(movie => 
					<GridListTile style={{height:'100%'}}>
						<MovieCard key={movie.movieId} movie ={movie} handleSelectedMovie={this.handleSelectedMovie}/> 
					</GridListTile>
					)}
					</GridList>
				 </div>
				 
				<div style={{margin:25, padding: 10}}>
					<Typography gutterBottom variant="h6" component="h2" style={{fontWeight:'bold'}}>
						Upcoming Movies
					</Typography>
					
					<GridList style={{flexWrap: 'nowrap'}} cols={this.getGridListCols()} spacing={15}>
					{moviesList.filter(movie => new Date(movie.dateReleased) > new Date()).map(movie => 
					<GridListTile style={{height:'100%'}}>
						<MovieCard key={movie.movieId} movie ={movie} handleSelectedMovie={this.handleSelectedMovie}/> 
					</GridListTile>
					)}
					</GridList>
				 </div>
            </div>
        )
    }
}

function mapStateToProps({moviesList}) {
    return {
        moviesList
    }
}

export default withWidth()(connect(mapStateToProps)(MovieContainer))
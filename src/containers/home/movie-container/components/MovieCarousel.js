import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-material-ui-carousel'

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    minWidth: 100
  },
});

export default function MovieCarousel(props) {
  const classes = useStyles();
  const {moviesList, handleSelectedMovie} = props;

  return (
        <div style={{width:'60%',margin: 'auto',padding:15}}>
            <Carousel style={{flex:1, height:'250px'}} fullHeightHover={false} autoPlay={false} navButtonsAlwaysVisible={true}>
            {moviesList.map((movie, index) => 
            <div key={movie.movieId}>
                {index %2===0 ? <img src='/logo192.png' width={'100%'} onClick={() =>handleSelectedMovie(movie)}
                                      alt={`${movie.name} Poster`}/>
                : <img src='/moviePoster.jpg' width={'100%'} onClick={() =>handleSelectedMovie(movie)}
                        alt={`${movie.name} Poster`}/> }
            </div>
            )}
            </Carousel>
        </div>
      )
}
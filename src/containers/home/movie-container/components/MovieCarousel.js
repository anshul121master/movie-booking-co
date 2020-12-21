import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-material-ui-carousel'
import { moviePosters } from '../../../../config/apiConfig'
import { mockEnabled } from '../../../../utils/api'

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    minWidth: 100
  },
});

export default function MovieCarousel(props) {
  const classes = useStyles();
  const { moviesList, handleSelectedMovie } = props;

  return (
        <div className="carousel">
          {(moviesList.length > 0 && 
            <Carousel style={{flex:1, height:'250px'}} fullHeightHover={false} autoPlay={true} navButtonsAlwaysVisible={true}>
            {moviesList.map((movie, index) => 
                <img key={movie.movieId} src={mockEnabled ? "moviePoster.jpg" : `${moviePosters}${movie.moviePoster}`} 
                                      height='250px' width={'100%'} onClick={() =>handleSelectedMovie(movie)}
                                      alt={`${movie.name} Poster`}/>
            )}
            </Carousel>
            )}
        </div>
      )
}
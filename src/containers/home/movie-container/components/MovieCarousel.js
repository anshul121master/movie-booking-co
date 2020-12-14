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
      <Carousel style={{ flex: 1 }} fullHeightHover={false} autoPlay={false} navButtonsAlwaysVisible={true}>
        {moviesList.map((movie, index) =>
          <div key={movie.movieId} style={{ height: '50%' }}>
            <img src={mockEnabled ? "moviePoster.jpg" : `${moviePosters}${movie.moviePoster}`} width={'100%'} height='50%' onClick={() => handleSelectedMovie(movie)}
              alt={`${movie.name} Poster`} />
          </div>
        )}
      </Carousel>
    </div>
  )
}
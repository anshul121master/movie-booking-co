import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { moviePosters } from '../../../../config/apiConfig'
import { mockEnabled } from '../../../../utils/api'
import { Button } from '@material-ui/core'
import GradeIcon from '@material-ui/icons/Grade';
import {header} from '../../../../theme'
import { titleCase } from '../../../../utils/helper'

const useStyles = makeStyles({
  root: {
    maxwidth: '100%',
    minWidth: 100,
    height: '100%'
  },
  media: {
    height: 140,
    objectFit: 'initial'
  },
  rating: {
    marginBottom: 0
  },
  materialIcons: {
    display: 'inline-flex',
    verticalAlign: 'top',
    fontSize: '1.3rem',
    color: 'gold'
  },
  actions: {
    justifyContent: 'space-between',
    padding: '0.5em 1em'
  },
  button: {
    background: header,
    color: 'white',
    padding: '0.8em',
    border: '2px solid '+header,
    borderRadius: '5px',
    '&:hover': {
      background: '#132f3f'
  },
  },
  movieTitle: {
    fontWeight: 700
  }
});

export default function MovieCard(props) {
  const classes = useStyles();
  const {movie, handleSelectedMovie} = props;

  return (
      (movie !== undefined &&
    <Card variant="outlined" className={classes.root} raised={true}>
      <CardActionArea disableRipple style={{height: '80%'}}>
        <CardMedia
          className={classes.media}
          component="img"
          alt={movie.name}
          image={mockEnabled ? "moviePoster.jpg" : `${moviePosters}${movie.moviePoster}`}
          title="Movie"
        />
        <CardContent style={{height: 'inherit'}}>
          <Typography className={classes.movieTitle} gutterBottom variant="h5" component="h2">
            {titleCase(movie.name)}
          </Typography>
          <Typography gutterBottom variant="body1" component="h4">
            {movie.movieDimension.split('_')[1] }
          </Typography>
          <Typography gutterBottom variant="body1" component="h4">
            {movie.genre}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.actions}>
      <Typography className={classes.rating} gutterBottom variant="body1" component="h5">
                {movie.rating}
                <GradeIcon className={classes.materialIcons}/>
      </Typography>
        <Button className={classes.button} size="small" 
                color="primary" 
                onClick={()=> handleSelectedMovie(movie)}>
          Book Tickets
        </Button>
      </CardActions>
    </Card>
      )
  );
}
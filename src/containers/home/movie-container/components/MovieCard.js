import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Paper } from '@material-ui/core'
import { moviePosters } from '../../../../config/apiConfig'
import { mockEnabled } from '../../../../utils/api'

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    minWidth: 100,
  },
});

export default function MovieCard(props) {
  const classes = useStyles();
  const {movie, handleSelectedMovie} = props;

  return (
      (movie !== undefined &&
        <Paper style={{width:'100%'}} onClick={()=> handleSelectedMovie(movie)} >
    <Card variant="outlined" className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={movie.name}
          height="140"
          image={mockEnabled ? "moviePoster.jpg" : `${moviePosters}${movie.moviePoster}`}
          title="Movie"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {movie.name}
          </Typography>
          <Typography gutterBottom variant="body1" component="h4">
            {movie.movieDimension}
          </Typography>
          <Typography gutterBottom variant="body1" component="h4">
            {movie.genre}
          </Typography>
          <Typography gutterBottom variant="body1" component="h5">
                {movie.rating}
            </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Paper>
      )
  );
}
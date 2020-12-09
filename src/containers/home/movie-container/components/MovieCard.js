import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/Star';
import {Paper } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    minWidth: 100
  },
});

export default function MovieCard(props) {
  const classes = useStyles();
  const {movie, handleSelectedMovie} = props;

  return (
      (movie !== undefined &&
        <Paper style={{width:'100%'}} onClick={()=> handleSelectedMovie(movie)} >
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={movie.name}
          height="140"
          image="/moviePoster.jpg"
          //{movie.moviePoster}
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
      {/* <CardActions>
        <IconButton aria-label="rating">
            <StarIcon />
            </IconButton>
            <Typography gutterBottom variant="body1" component="h5">
                {movie.rating}
            </Typography>
      </CardActions> */}
    </Card>
    </Paper>
      )
  );
}
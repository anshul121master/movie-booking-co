import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        marginTop: 5,
        marginBottom: 5,
        width: '100%',
        height: '25%',
        border: "none",
        boxShadow: "none",
        borderRadius: 0
    },
    media: {
        height: 250,
        width: '60%'
    },
    content: {
        width: '40%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    nestedcontent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    actionarea: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    }
});

export default function MovieDetails(props) {
    const classes = useStyles();
    return (
        <Card className={classes.root} >
            <CardActionArea className={classes.actionarea} disableRipple>
                <CardMedia
                    className={classes.media}
                    image="/movieposter.jpg"
                    title="Avengers Endgame"
                />
                <CardContent className={classes.content}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {/*props.selectedMovie.name*/}Avengers Endgame
                    </Typography>
                    <Typography className={classes.nestedcontent}>
                        <Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Genre: {/*props.selectedMovie.genre*/}Suspense Thriller
                        </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Length: {/*props.selectedMovie.duration*/}2 hrs
                        </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Rating: {/*props.selectedMovie.rating*/}3.4
                            </Typography>
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {/*props.selectedMovie.rating*/}Cast/Crew
                        <Typography variant="body2" color="textSecondary" component="li">
                                {/*props.selectedMovie.rating*/}Robert Downey Jr.
                        </Typography>
                            <Typography variant="body2" color="textSecondary" component="li">
                                {/*props.selectedMovie.rating*/}Scarlett Johansson
                        </Typography>
                            <Typography variant="body2" color="textSecondary" component="li">
                                {/*props.selectedMovie.rating*/}Chris Evans
                        </Typography>
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {/*props.selectedMovie.rating*/}Languages
                        <Typography variant="body2" color="textSecondary" component="li">
                                {/*props.selectedMovie.rating*/}English
                        </Typography>
                            <Typography variant="body2" color="textSecondary" component="li">
                                {/*props.selectedMovie.rating*/}Hindi
                        </Typography>
                        </Typography>

                    </Typography>
                    {/* {props.selectedMovie.casts.map(cast => 
                <Typography variant="body2" color="textSecondary" component="p">
                </Typography>)} */}
                    {/* {selectedMovie.languages.map(cast => 
                <Typography variant="body2" color="textSecondary" component="p">
                </Typography>)} */}
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

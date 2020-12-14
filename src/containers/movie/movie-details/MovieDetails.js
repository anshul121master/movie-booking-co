import React from 'react'
import Typography from '@material-ui/core/Typography';
import { moviePosters } from '../../../config/apiConfig'
import { mockEnabled } from '../../../utils/api'
import { Paper } from '@material-ui/core';


export default function MovieDetails(props) {
    return (
        <Paper className="rootstyle" style={{ backgroundImage: mockEnabled ? "url(moviePoster.jpg)" : `url(${moviePosters}${props.selectedMovie.moviePoster})` }}>
            <div className="content" >
                <Typography style={{ color: "#FFFFFF" }} gutterBottom variant="h5" component="h2">
                    {props.selectedMovie.name}
                </Typography>
                <Typography className="nestedcontent">
                    <Typography>
                        <Typography style={{ color: "#FFFFFF", fontSize: '0.75em' }} className='contenttext' variant="body2" color='headerText' component="p">
                            Genre: {props.selectedMovie.genre}
                        </Typography>
                        <Typography style={{ color: "#FFFFFF", fontSize: '0.75em' }} className='contenttext' variant="body2" color='headerText' component="p">
                            Length: {props.selectedMovie.duration}
                        </Typography>
                        <Typography style={{ color: "#FFFFFF", fontSize: '0.75em' }} className='contenttext' variant="body2" color='headerText' component="p">
                            Rating: {props.selectedMovie.rating}
                        </Typography>
                    </Typography>
                    <Typography style={{ color: "#FFFFFF", fontSize: '0.75em' }} className='contenttext' variant="body2" color='headerText' component="p">
                        Cast/Crew
                        {props.selectedMovie.casts.map(cast =>
                        <Typography style={{ color: "#FFFFFF", fontSize: '0.75em' }} className='contenttext' variant="body2" color='headerText' component="li">
                            {cast}
                        </Typography>)}
                    </Typography>
                    <Typography style={{ color: "#FFFFFF", fontSize: '0.75em' }} className='contenttext' variant="body2" color='headerText' component="p">
                        Languages
                            {props.selectedMovie.languages.map(language =>
                        <Typography style={{ color: "#FFFFFF", fontSize: '0.75em' }} className='contenttext' variant="body2" color='headerText' component="li">
                            {language}
                        </Typography>)}
                    </Typography>
                </Typography>
            </div>
        </Paper>
    )
}

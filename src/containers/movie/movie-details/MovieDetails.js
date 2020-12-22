import React from 'react'
import { moviePosters } from '../../../config/apiConfig'
import { mockEnabled } from '../../../utils/api'
import { Paper } from '@material-ui/core';
import { titleCase } from '../../../utils/helper'


export default function MovieDetails(props) {
    return (
        <Paper className="rootstyle" style={{ backgroundImage: mockEnabled ? "url(moviePoster.jpg)" : `url("${moviePosters}${props.selectedMovie.moviePoster}")` }}>
            <div className="content" >
                <div className='contenttextheader'>
                    {titleCase(props.selectedMovie.name)}
                </div>
                <div className="nestedcontent">
                    <div>
                        <div className='contenttext'>
                            Genre: <span style={{fontSize: '0.9em'}}>{props.selectedMovie.genre}</span>
                        </div>
                        <div className='contenttext'>
                            Length: <span style={{fontSize: '0.9em'}}>{props.selectedMovie.duration}</span>
                        </div>
                        <div className='contenttext'>
                            Rating: <span style={{fontSize: '0.9em'}}>{props.selectedMovie.rating}</span>
                        </div>
                    </div>
                    <div className='contenttext'>
                        Cast/Crew :
                        {props.selectedMovie.casts.map(cast =>
                        <div className='contenttext'>
                            <span style={{fontSize: '0.9em'}}>{cast}</span>
                        </div>)}
                    </div>
                    <div className='contenttext'>
                        Languages :
                            {props.selectedMovie.languages.map(language =>
                        <div className='contenttext'>
                            <span style={{fontSize: '0.9em'}}>{language}</span>
                        </div>)}
                    </div>
                </div>
            </div>
        </Paper>
    )
}

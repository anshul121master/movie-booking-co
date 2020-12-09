import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { footer } from '../../theme'
import { DoneRounded } from '@material-ui/icons'
import { Button } from '@material-ui/core'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        maxWidth: 350,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    action: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: footer
    }
});

export default function Ticket(props) {
    const { movie, theater, selectedSeats, price, time, date } = props
    const classes = useStyles();
    return (
        <div className='ticket-container'>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="h2">
                        TICKET SUMMARY
                       <span style={{ fontSize: '15px' }}>  ( M-ticket )</span>
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography variant="h6" component="h4">
                        {movie.name.toUpperCase()}
                       { (movie.genre !== '' && (<span style={{ fontSize: '15px' }}> `,${movie.genre}` </span>))}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography variant="h6" component="h3">
                        {selectedSeats.map(seat => seat + ', ')}
                        <span style={{ fontSize: '12px' }}>({selectedSeats.length} Tickets)</span>
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography className={classes.pos} color="textSecondary">
                        {theater.theaterDetails}, Screen : {theater.screenName.toUpperCase()}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        Time : {time.split('S')[1]}:00
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        Date : {date}
                    </Typography>
                    <div style={{display: 'flex',justifyContent:'space-between', alignItems:'center'}}> 
                    {props.bookingStatus !== '' ?
                        (<Typography style={{display:'inline-block', marginBottom: 0}} className={classes.pos} color="textSecondary">{props.bookingStatus}
                        {(props.bookingStatus.toUpperCase() === 'BOOKED' && <DoneRounded style={{color:'green'}} fontSize='small'/>)}</Typography>) :
                        <Typography className={classes.pos} color="textSecondary">Pending Payment</Typography>}
                    {(props.cancelTicket !== undefined  && props.bookingStatus.toUpperCase()==='BOOKED')&& 
                        <Button variant="contained" color="secondary" style={{display:'inline-block', alignSelf:'flex-end'}}
                            onClick={()=>props.cancelTicket(props.bookingId)}>
                            Cancel Ticket
                        </Button>}
                    </div>
                </CardContent>
                <CardActions className={classes.action}>
                    <Typography variant="h5" component="h2">
                        Total Amount:
                    </Typography>
                    <Typography variant="h5" component="h2">
                        Rs. {price}
                    </Typography>
                </CardActions>
            </Card>
            
        </div >
    )
}
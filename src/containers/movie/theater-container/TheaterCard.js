import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getScreens } from '../../../utils/api'
import { setTheaterAndSeatPlan } from '../../../store/actions/shared'
import { withStyles } from "@material-ui/core/styles";
import compose from 'recompose/compose';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { header, headerText } from '../../../theme'
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const styles = (theme) => ({
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: header,
        color: headerText,
        fontSize: '1.1em'
    },
    action: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
});


class TheaterCard extends Component {
    state = {
        expanded: false,
        screens: null,
        screenTimesArray: [],
        time: '',
        redirect: false,
        error: null

    }

    //when show timing btn is clicked
    getScreenObject = (theater) => {
        const { selectedMovie } = this.props;
        if (this.state.screens === null && this.state.screenTimesArray.length === 0) {
            getScreens(selectedMovie.movieId, theater.theaterId)
                .then((screens) => {
                    if (screens.exception === null) {
                        let screenTimeArray = []
                        screens.response.forEach(screen => {
                            screenTimeArray = screenTimeArray.concat(screen.screenTimes.map(time => time.showTiming))
                        })

                        this.setState(currentState => {
                            return {
                                screens: screens.response,
                                screenTimesArray: screenTimeArray,
                                expanded: !currentState.expanded,
                            }
                        })
                    } else {
                        this.setState({
                            error: screens.exception
                        })
                    }
                })
        }
        else {
            this.setState(currentState => {
                return {
                    expanded: !currentState.expanded,
                }
            })
        }
    }

    //when clicked on any show time
    handleSelectedShowTime = (theater, time, selectedDate) => {
        // format YYYY-MM-DD
        const { screens } = this.state;
        const screen = screens.filter(screen => screen.screenTimes
            .map(screenTime => screenTime.showTiming).includes(time))
        const screenTime = screen[0].screenTimes.filter(screenTime => screenTime.showTiming === time)
        const seatPlanId = screenTime[0].showDateList.filter
            ((showDate => showDate.moviePlayingDate.split('T')[0] === selectedDate))[0].seatPlanId
        //get seatPlanId from state based on time(S20) and date(2020-11-30)

        this.props.dispatch(setTheaterAndSeatPlan(theater, seatPlanId, screen[0]))
        //navigate to seat plan page
    }

    handleExpandClick = () => {
        if (!this.state.expanded) {
            this.getScreenObject(this.props.theater)
        }
        else {
            this.setState({
                expanded: false
            })
        }
    }

    handleClickOpen = (theater, time, selectedDate) => {
        this.handleSelectedShowTime(theater, time, selectedDate)
        this.setState({
            time: time,
            redirect: true
        })
    };

    render() {
        const { theater, classes, selectedDate } = this.props;
        const { screenTimesArray, error } = this.state;
        return (
            (error === null) ?
                (this.state.redirect ? (<Redirect to={{ pathname: '/screen' }} />) :
                    (
                        <div><Card className="theater-card">
                            <CardHeader
                                avatar={
                                    <Avatar className={classes.avatar}>
                                        {theater.rating + " "} <FontAwesomeIcon color='gold' size="xs" icon={faStar} />
                                    </Avatar>
                                }
                                title={theater.theaterName}
                                subheader={theater.address.area + ", " + theater.address.city + ", " + theater.address.pincode + ", " + theater.address.state}
                            />
                            <CardActions className={classes.action}>
                                <Tooltip title="Click on arrow to check on movie screening times" aria-label="add">
                                    <Button onClick={this.handleExpandClick} className='expandbutton'>
                                        {!this.state.expanded ? 'Check Timings' : 'Hide Timings'}
                                        <IconButton
                                            className={clsx(classes.expand, {
                                                [classes.expandOpen]: this.state.expanded,
                                            })}
                                            aria-expanded={this.state.expanded}
                                            disabled
                                            disableRipple
                                            style={{ color: 'white' }}
                                        >
                                            <ExpandMoreIcon style={{ fontSize: 15 }} />
                                        </IconButton>
                                    </Button>
                                </Tooltip>
                            </CardActions>
                            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                                <CardContent className='cardcontent'>
                                    <Typography variant="body2" color="textSecondary" component="p">Show Timings :</Typography>
                                    <div>{screenTimesArray.sort().map(time =>
                                        <Button className='timebutton' size='small' style={{ margin: 7 }} onClick={() => this.handleClickOpen(theater, time, selectedDate)}
                                            disabled={selectedDate > new Date().toISOString().split('T')[0] || (selectedDate === new Date().toISOString().split('T')[0] && new Date().getHours() >= time.split('S')[1])}>
                                            {time.split('S')[1]}:00
                                </Button>
                                    )}</div>
                                </CardContent>
                            </Collapse>
                        </Card>
                        </div>)
                ) : <Redirect to={{
                    pathname: '/error',
                    state: {
                        exception: error
                    }
                }} />)
    }
}

function mapStateToProps({ selectedMovie }, ownProps) {
    const { theater, selectedDate } = ownProps;
    return {
        theater,
        selectedMovie,
        selectedDate
    }
}

export default compose(withStyles(styles), connect(mapStateToProps))(TheaterCard);



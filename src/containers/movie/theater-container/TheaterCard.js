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
import { header, headerText, buttonAvailable, buttonAvailableText } from '../../../theme'

const styles = (theme) => ({
    root: {
        width: '60%',
        height: '10%',
        margin: '10px',
        fontSize: '0.75em'
    },
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
        color: headerText
    },
    action: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        color: buttonAvailableText,
        backgroundColor: buttonAvailable,
        margin: 7
    }
});


class TheaterCard extends Component {
    state = {
        expanded: false,
        screens: null,
        screenTimesArray: ['S12', 'S15', 'S18', 'S21', 'S23']
    }

    //when show timing btn is clicked
    getScreenObject = (theater) => {
        const { selectedMovie } = this.props;
        getScreens(selectedMovie.movieId, theater.theaterId)
            .then((screens) => {

                let screenTimeArray = []
                screens.forEach(screen => {
                    screenTimeArray = screenTimeArray.concat(screen.screenTimes.map(time => time.showTiming))
                })

                this.setState({
                    screens: screens,
                    screenTimeArray: screenTimeArray
                })
            })
    }

    //when clicked on any show time
    handleSelectedShowTime = (theater, time) => {
        const { selectedDate } = this.props; // format YYYY-MM-DD
        const { screens } = this.state;
        const screen = screens.filter(screen => screen.screenTimes
            .map(screenTime => screenTime.showTiming).includes(time))
        const screenTime = screen[0].screenTimes.filter(screenTime => screenTime.showTiming === time)
        const seatPlanId = screenTime[0].showDateList.filter
            ((showDate => showDate.moviePlayingDate.split('T')[0] === selectedDate))[0].seatPlanId
        //get seatPlanId from state based on time(S20) and date(2020-11-30)

        setTheaterAndSeatPlan(theater, seatPlanId);
        //navigate to seat plan page
    }

    handleExpandClick = () => {
        this.setState(currentState => {
            return {
                expanded: !currentState.expanded
            }
        })

        //this.getScreenObject(this.props.theater)
    }

    render() {
        const { theater, classes } = this.props;
        const { screenTimesArray } = this.state;
        return (
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {/* {theater.rating} */}4.5
                        </Avatar>
                    }
                    title="PVR Cinemas"
                    subheader="Near CST Railway Station, Mumbai - 201006, Maharashtra"
                />
                <CardActions className={classes.action}>
                    <Tooltip title="Expand to check on movie screening times" aria-label="add">
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: this.state.expanded,
                            })}
                            onClick={this.handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </Tooltip>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent className={classes.content}>
                        <Typography variant="body2" color="textSecondary" component="p">Show Timings :</Typography>
                        {screenTimesArray.map(time =>
                            <Button className={classes.button}>
                                {time.split('S')[1]}:00
                            </Button>)}
                    </CardContent>
                </Collapse>
            </Card>
        )
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



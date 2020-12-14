import React, { Component } from 'react'
import { connect } from 'react-redux'
import { header, headerText } from '../../theme'
import { AppBar, Toolbar, Avatar, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { setCityAndMoviesList, setMovieAndTheaterList } from '../../store/actions/shared'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import { Link, Redirect } from 'react-router-dom'
import '../../../src/index.css'
import { handleLogoutUser }  from "../../store/actions/authedUser"
import Loader from "../Loader"

const drawerWidth = 240;
const styles = (theme) => ({
    logo: {
        height: 80,
        width: 300
    },
    color: {
        backgroundColor: header,
        color: headerText
    },
    toolBar: {
        justifyContent: 'space-between'
    },
    leftDiv: {
        justifyContent: 'space-around',
        width: '35%',
        padding: '10px',
        alignItems: 'center',
        margin: '10px',
        display: 'flex',
        flexDirection: 'row'
    },
    userName: {
        flexDirection: 'column',
        display: 'contents'
    },
    hide: {
        display: 'none',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
        backgroundColor: header,
        color: headerText,
        height: '95px'
    },
    select: {
        color: headerText,
        '&:before': {
            borderColor: headerText,
        },
        '&:after': {
            borderColor: headerText,
        }
    },
    icon: {
        fill: headerText,
    },
})


class Header extends Component {
    state = {
        open: false,
    }
    handleLogout = () =>{
        const { dispatch } = this.props;
        dispatch(handleLogoutUser());
    }

    handleDrawerOpen = () => {
        this.setState({
            open: true
        });
    }

    handleDrawerClose = () => {
        this.setState({
            open: false
        });
    }

    onCityChange = (event) => {
        const cityId = event.target.value;
        const { listOfCities, dispatch, selectedMovie } = this.props; // from home component
        const selectedCityObject = listOfCities.filter(city => city.id === cityId);
        if (Object.keys(selectedMovie).length === 0) {
            dispatch(setCityAndMoviesList(selectedCityObject[0]))
        }
        else {
            dispatch(setCityAndMoviesList(selectedCityObject[0]))
            dispatch(setMovieAndTheaterList(selectedMovie, false))
        }
        sessionStorage.setItem('city', JSON.stringify(selectedCityObject[0]))
    }

    render() {
        const { classes, listOfCities, selectedCity, authedUser, loading } = this.props;
        const { open } = this.state;
        if(loading) return <Loader />
        return (
            <header>
                <AppBar position="static" className={clsx([classes.appBar, classes.color], {
                    [classes.appBarShift]: open
                })}>
                    <Toolbar className="toolBar">
                        <div>
                            <Link to='/'>
                                <img className={classes.logo} src="/brand.png" alt="moviebooking" />
                            </Link>
                        </div>
                        <div className="leftDiv">
                            {(listOfCities !== undefined && <Select className={classes.select}
                                inputProps={{
                                    classes: {
                                        icon: classes.icon,
                                    },
                                }}
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={selectedCity.id}
                                onChange={this.onCityChange}
                            >
                                {listOfCities.map(city =>
                                    <MenuItem key={city.id} value={city.id}><em>{city.cityName}</em></MenuItem>
                                )}
                            </Select>)}
                            {(authedUser === null || authedUser === undefined) && (
                                <Link to='/login' style={{ textDecoration: 'none' }}>
                                    <ButtonGroup>
                                        <Button style={{ backgroundColor: header, color: headerText, border: `1px solid ${headerText}` }}>
                                            Log In
                        </Button>
                                    </ButtonGroup>
                                </Link>
                            )}

                            {authedUser !== null && authedUser !== undefined
                                ? <React.Fragment>
                                    <Typography variant="body1">Welcome {authedUser.response.fullName}</Typography>
                                    {(authedUser.response.imageUrl !== null
                                        ? <Avatar alt="user" src="/icon.png" /*src={authedUser.response.imageUrl}*/ style={{ backgroundColor: '#F5F4F2', color: headerText }} />
                                        : <AccountCircleIcon style={{ fontSize: '2.5em' }} />)}
                                    <IconButton
                                        color="inherit"
                                        aria-label="open drawer"
                                        onClick={this.handleDrawerOpen}
                                        className={clsx(open && classes.hide)}
                                        edge="start"
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                </React.Fragment>
                                : <React.Fragment>
                                    <Typography variant="body1">Welcome Guest</Typography>
                                    <AccountCircleIcon style={{ fontSize: '2.5em' }} />
                                </React.Fragment>
                            }
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="right"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose} style={{ color: headerText }}>
                            <ChevronRightIcon />
                            <Typography variant="subtitle1" component="h5">Hi!</Typography>
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItem button key='profile' component={Link} to="/profile">
                            <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                            <ListItemText primary='My Profile' />
                        </ListItem>
                        <ListItem button key='bookingsHistory' component={Link} to="/upcoming">
                            <ListItemIcon><ConfirmationNumberIcon /></ListItemIcon>
                            <ListItemText primary='My Bookings' />
                        </ListItem>
                        <ListItem button key='signout' onClick={this.handleLogout}
                            style={{ backgroundColor: header, color: headerText, textAlign: 'center' }}>
                            <ListItemText primary='Sign Out' />
                        </ListItem>
                    </List>
                </Drawer>
            </header>
        )
    }
}

function mapStateToProps({ authedUser, selectedCity, selectedMovie, loading }, ownProps) {
    const { listOfCities } = ownProps;

    return {
        listOfCities,
        selectedCity,
        authedUser,
        selectedMovie,
        loading
    }
}

export default withStyles(styles)(connect(mapStateToProps)(Header))
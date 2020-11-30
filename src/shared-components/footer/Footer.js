import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Facebook } from '@material-ui/icons';
import { Twitter } from '@material-ui/icons';
import { LinkedIn } from '@material-ui/icons';
import { GitHub } from '@material-ui/icons';
import { footerText, footer } from '../../theme'
import { Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    appBar: {
        top: 'auto',
        bottom: 0,
        backgroundColor: footer,
        color: footerText,
    }
}));

export default function Footer() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="absolute" color="primary" className={classes.appBar}>
                <Toolbar>
                    <Typography>All Copyrights Reserved ©® : </Typography>
                    <IconButton edge="start" color="inherit">
                        <Facebook></Facebook>
                    </IconButton>
                    <IconButton edge="start" color="inherit">
                        <Twitter></Twitter>
                    </IconButton>
                    <IconButton edge="start" color="inherit">
                        <LinkedIn></LinkedIn>
                    </IconButton>
                    <IconButton edge="start" color="inherit">
                        <GitHub></GitHub>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}
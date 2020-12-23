import React, {Component} from 'react';
import { Dialog, ListItemText, DialogContent, DialogTitle, Divider } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import { header, headerText } from '../../theme'


const styles = (theme) => ({
    container: {
        width:'60%', 
        margin: 'auto'
    },
    list: {
        cursor: 'pointer',
        '&:hover': {
            background: headerText,
         },
    },
    title: {
        backgroundColor: header,
        color: headerText
    }
})

class City extends Component {
    state = {
        open: false
    }

    componentDidMount() {
        this.setState({ open: true})
    }


  render() {
    const {listOfCities, setCityInStorage, classes} = this.props;
    return (
      <Dialog className = {classes.container} disableBackdropClick={true} disableEscapeKeyDown={true}   aria-labelledby="city-dialog" 
                open={this.state.open} >
      <DialogTitle className = {classes.title} id="city-select-dialog">Please select a city</DialogTitle>
      <Divider />
      <DialogContent>
            <List style={{display:'grid'}}>
                {listOfCities.map(city => 
                <ListItem className ={classes.list} key= {city.id} onClick={(event) => {
                    if(event.target.nodeName === 'SPAN'){
                        setCityInStorage(city)
                        this.setState({
                            open: false
                        })
                    }
                    }}>
                     <ListItemText>
                        {city.cityName}
                    </ListItemText>
                </ListItem>
                )}
            </List>
        </DialogContent>
      </Dialog>
  )
}
}


export default withStyles(styles)(City)
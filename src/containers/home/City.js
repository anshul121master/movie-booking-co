import React, {Component} from 'react';
import { Dialog, ListItemText, DialogContent, DialogTitle } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

export default class City extends Component {
    state = {
        open: false
    }

    componentDidMount() {
        this.setState({ open: true})
    }

  render() {
    const {listOfCities, setCityInStorage} = this.props;
    return (
      <Dialog disableBackdropClick={true} disableEscapeKeyDown={true}  aria-labelledby="city-dialog" 
                open={this.state.open} style={{width:'60%', margin: 'auto'}}>
      <DialogTitle id="city-select-dialog">Select a city</DialogTitle>
      <DialogContent>
            <List>
                {listOfCities.map(city => 
                <ListItem key= {city.id} onClick={(event) => {
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
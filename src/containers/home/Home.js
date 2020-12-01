import React, {Component} from 'react'
import MovieContainer from './movie-container/MovieContainer';
import Header  from '../../shared-components/header/Header';

export default class Home extends Component {
    render() {
        const { listOfCities } = this.props; // from app component
        return (
            <div>
                <Header listOfCities={listOfCities} />
                {/* <Carousel /> */}
                <MovieContainer />
                <Footer />
            </div>
        )
    }
}


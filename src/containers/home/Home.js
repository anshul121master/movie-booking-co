import React, { Component } from 'react'
import MovieContainer from './movie-container/MovieContainer';
import Header from '../../shared-components/header/Header';
import Footer from '../../shared-components/footer/Footer';
import City from './City'
import { connect } from 'react-redux';
import { setCityAndMoviesList } from '../../store/actions/shared'
import { Redirect } from 'react-router-dom'

class Home extends Component {
    state = {
        citySelected: false
    }

    componentDidMount() {
        const { dispatch } = this.props;
        const city = sessionStorage.getItem('city');
        if (city !== undefined && city !== null) {
            this.setState({
                citySelected: true
            })
            dispatch(setCityAndMoviesList(JSON.parse(city)));
        }
    }

    setCityInStorage = (selectedCity) => {
        const { listOfCities, dispatch } = this.props;
        sessionStorage.setItem('city', JSON.stringify(selectedCity))
        const selectedCityObject = listOfCities.response.filter((city) => city.cityName === selectedCity.cityName);
        dispatch(setCityAndMoviesList(selectedCityObject[0]))
        this.setState({
            citySelected: true,
        })
    }


    render() {
        const { listOfCities } = this.props; // from app component
        const { citySelected } = this.state;
        return (
            <div>
                {(listOfCities.exception === null) ?
                    ((citySelected === true) ? (
                        <React.Fragment>
                            <Header listOfCities={listOfCities.response} />
                            <MovieContainer />
                            <Footer />
                        </React.Fragment>
                    )
                        : (
                            <City listOfCities={listOfCities.response} setCityInStorage={this.setCityInStorage} />
                        ))
                    : <Redirect to={{
                        pathname: '/error',
                        state: {
                            exception: listOfCities.exception
                        }
                    }} />}
            </div>
        )
    }
}

export default connect()(Home)
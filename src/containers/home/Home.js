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
        const { dispatch, moviesList, listOfCities } = this.props;
        const city = sessionStorage.getItem('city');
        if (city !== undefined && city !== null) {
            this.setState({
                citySelected: true
            })
            if(Object.keys(moviesList).length === 0){
                dispatch(setCityAndMoviesList(JSON.parse(city)));
            }
        }
        else {
            if(listOfCities.response !== null && listOfCities.response !== undefined) {
                dispatch(setCityAndMoviesList(listOfCities.response[0]));
            }
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
            <div style={{minHeight: "100vh"}}>
                {(listOfCities.exception === null) ?
                    ((citySelected === true) ? (
                        <React.Fragment>
                            <Header listOfCities={listOfCities.response}/>
                            <MovieContainer />
                            <Footer />
                        </React.Fragment>
                    )
                        : (
                            <React.Fragment>
                                <Header listOfCities={listOfCities.response} />
                                <MovieContainer />
                                <Footer />
                                <City listOfCities={listOfCities.response} setCityInStorage={this.setCityInStorage} />
                            </React.Fragment>
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


function mapStateToProps({ moviesList }) {
    return {
        moviesList
    }
}

export default connect(mapStateToProps)(Home)
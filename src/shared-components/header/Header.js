import React, {Component} from 'react'
import { getMovies } from '../../utils/api'
import { connect } from 'react-redux'
import { setCityAndMoviesList } from '../../store/actions/shared'

class Header extends Component {
    onCityChange = (event) => {
        const cityId= event.target.value;
        const { listOfCities, dispatch } = this.props; // from home component
        const selectedCityObject = listOfCities.filter(city => city.id === cityId);
        dispatch(setCityAndMoviesList(selectedCityObject[0]))
    }

    render() {
        return (
            <div>
                Header
                {/* populate city dropdown based on listOfCities */}
            </div>
        )
    }
}

function mapStateToProps({ authedUser }, ownProps) {
    const { listOfCities } = ownProps;
    return { 
        listOfCities
    }
}

export default connect(mapStateToProps)(Header)
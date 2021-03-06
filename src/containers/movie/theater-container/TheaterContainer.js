import React, { Component } from 'react'
import { connect } from 'react-redux'
import TheaterCard from './TheaterCard'
import { Redirect } from 'react-router-dom'
import Loader from "../../../shared-components/Loader";
import { mockEnabled } from '../../../utils/api'

class TheaterContainer extends Component {

    state = {
        selectedDate: '',
        initialCalendar: true,
        filteredtheatersList: []
    }

    getDateValue = (value) => {
        const d = new Date(this.props.selectedDate)
        d.setDate(d.getDate() + value)
        const todaysDate = new Date();
        const tommorowsDate = new Date();
        tommorowsDate.setDate(todaysDate.getDate() + 1)
        console.log(todaysDate, tommorowsDate, d)
        return {
            day: d.getDate(),
            name: d.getDate() === todaysDate.getDate() ? 'Today' :
                d.getDate() === tommorowsDate.getDate() ? 'Tom' : d.toString().split(' ')[0],
            date: d.toISOString().split('T')[0],
            month: d.toLocaleString("default", { month: "short" })
        }
    }

    filterTheatres = (date, theaterList, selectedMovie) => {
        theaterList = theaterList.filter(theater => {
            const movie = theater.movies.filter(movie => movie.id === selectedMovie.movieId)[0]
            return (movie.startDate.split('T')[0] === date || movie.endDate.split('T')[0] === date || (movie.startDate.split('T')[0] < date && movie.endDate.split('T')[0] > date))
        })

        return theaterList
    }

    render() {
        const { theatersList, selectedMovie, sortedTheatersList } = this.props;
        const { exception } = theatersList;
        const { selectedDate, initialCalendar } = this.state;
        return (
            (exception === null || exception === undefined ?
                (this.props.selectedDate === '' ? <Loader /> :
                    this.props.selectedDate === 'No Theatres' ? (
                        <div>
                            <div className='date-container'>
                            </div>
                            <div className='theatre-container' style={{ fontSize: '1.2em', paddingTop: '1.5em', paddingBottom: '1.5em' }}>
                                No Theatres available for {selectedMovie.name} in the your location
                </div>
                        </div>
                    ) :
                        (<div>
                            {console.log("state: " + selectedDate + " props:  " + this.props.selectedDate)}
                            <div className='date-container'>
                                {Array.from(Array(7).keys()).map((value) =>
                                    selectedDate === this.getDateValue(value).date
                                        || (this.props.selectedDate === this.getDateValue(value).date && initialCalendar) ?
                                        <div className='date active' key={value} onClick={() =>
                                            this.setState({
                                                selectedDate: this.getDateValue(value).date,
                                                initialCalendar: false,
                                                filteredtheatersList: this.filterTheatres(this.getDateValue(value).date, sortedTheatersList, selectedMovie)
                                            })
                                        }>
                                            <span className='span-date'>{this.getDateValue(value).day}</span>
                                            <span className='span-name'>{this.getDateValue(value).month}</span>
                                            <span className='span-name'>{this.getDateValue(value).name}</span>
                                        </div> :
                                        <div className='date' key={value} onClick={() =>
                                            this.setState({
                                                selectedDate: this.getDateValue(value).date,
                                                initialCalendar: false,
                                                filteredtheatersList: this.filterTheatres(this.getDateValue(value).date, sortedTheatersList, selectedMovie)
                                            })
                                        }>
                                            <span className='span-date'>{this.getDateValue(value).day}</span>
                                            <span className='span-name'>{this.getDateValue(value).month}</span>
                                            <span className='span-name'>{this.getDateValue(value).name}</span>
                                        </div>)}
                            </div>
                            {/* iterate over theatersList and render theater cards */}
                            <div className='theatre-container'>
                                {
                                    this.state.initialCalendar ?
                                        this.filterTheatres(this.props.selectedDate, sortedTheatersList, selectedMovie).length === 0 ?
                                            <div style={{ fontSize: '1.2em', paddingTop: '2em', paddingBottom: '2em', paddingLeft: '2em' }}>
                                                No theaters available on this day for {selectedMovie.name}</div> :
                                            <div style={{ fontSize: '1.2em', paddingTop: '2em', paddingBottom: '2em', paddingLeft: '2em' }}>
                                                Available Theatres:
                                            {this.filterTheatres(this.props.selectedDate, sortedTheatersList, selectedMovie).map(
                                                theater =>
                                                    <TheaterCard key={theater.theaterId} theater={theater} selectedDate={this.props.selectedDate} />
                                            )}
                                            </div>
                                        :
                                        this.state.filteredtheatersList.length === 0 ?
                                            <div style={{ fontSize: '1.2em', paddingTop: '2em', paddingBottom: '2em', paddingLeft: '2em' }}>
                                                No theaters available on this day for {selectedMovie.name}</div> :
                                            <div style={{ fontSize: '1.2em', paddingTop: '2em', paddingBottom: '2em', paddingLeft: '2em' }}>
                                                Available Theatres:
                                                {
                                                    this.state.filteredtheatersList.map(
                                                        theater =>
                                                            <TheaterCard key={theater.theaterId} theater={theater} selectedDate={selectedDate} />
                                                    )}
                                            </div>
                                }
                            </div>
                        </div>))
                : <Redirect to={{
                    pathname: '/error',
                    state: {
                        exception: exception
                    }
                }} />
            )

        )
    }
}

function mapStateToProps({ theatersList, selectedMovie }) {

    let selectedDate;
    let sortedTheatersList = []
    let theaterFlag = false;
    if (theatersList.response !== null) {
        if (theatersList.response === undefined) {
            selectedDate = ''
        }
        else if (theatersList.response.length === 0) {
            selectedDate = 'No Theatres'
        }
        else {
            for (let i = 0; i < theatersList.response.length; i++) {
                if (theatersList.response[i].movies.filter(movie => movie.id === selectedMovie.movieId).length === 0) {
                    theaterFlag = true;
                    break;
                }
            }
            if (theaterFlag) {
                selectedDate = ''
            }
            else {
                sortedTheatersList = theatersList.response.sort((theaterA, theaterB) => {
                    const theaterAstartDate = theaterA.movies.filter(movie => movie.id === selectedMovie.movieId)[0].startDate
                    const theaterBstartDate = theaterB.movies.filter(movie => movie.id === selectedMovie.movieId)[0].startDate
                    return (theaterBstartDate - theaterAstartDate)
                })

                selectedDate = sortedTheatersList[0].movies.filter(movie => movie.id === selectedMovie.movieId)[0].startDate.split('T')[0]
                const todaysDate = new Date().toISOString().split('T')[0]
                selectedDate = selectedDate < todaysDate ? mockEnabled ? selectedDate : todaysDate : selectedDate
            }
        }
    }

    return {
        theatersList, selectedMovie, selectedDate, sortedTheatersList
    }
}

export default connect(mapStateToProps)(TheaterContainer)
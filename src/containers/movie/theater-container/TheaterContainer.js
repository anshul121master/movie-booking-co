import React, { Component } from 'react'
import { connect } from 'react-redux'
import TheaterCard from './TheaterCard'

class TheaterContainer extends Component {
    state = {
        selectedDate: new Date(new Date()).toISOString().split('T')[0]
    }

    getDateValue = (value) => {
        const d = new Date()
        d.setDate(d.getDate() + value)
        return {
            day: d.getDate(),
            name: d.toString().split(' ')[0],
            date: d.toISOString().split('T')[0]
        }
    }

    render() {
        const { theatersList } = this.props;
        const { selectedDate } = this.state;
        return (
            <div>
                {/* calender Component render and pass the value to theatercard- 1 week */
                    console.log(selectedDate)
                }
                <div className='date-container'>
                    {Array.from(Array(7).keys()).map((value) =>
                        selectedDate === this.getDateValue(value).date ?
                            <div className='date active' key={value} onClick={() =>
                                this.setState({
                                    selectedDate: this.getDateValue(value).date
                                })
                            }>
                                <span className='span-date'>{this.getDateValue(value).day}</span>
                                <span className='span-name'>{this.getDateValue(value).name}</span>
                            </div> :
                            <div className='date' key={value} onClick={() =>
                                this.setState({
                                    selectedDate: this.getDateValue(value).date
                                })
                            }>
                                <span className='span-date'>{this.getDateValue(value).day}</span>
                                <span className='span-name'>{this.getDateValue(value).name}</span>
                            </div>)}
                </div>
                {/* iterate over theatersList and render theater cards */}
                <div className='theatre-container'>
                    {Array.from(Array(3).keys()).map(theater =>
                        <TheaterCard key={theater} theater={theater} selectedDate={selectedDate} />
                    )}
                </div>
            </div>
        )
    }
}

function mapStateToProps({ theatersList }) {
    return {
        theatersList
    }
}

export default connect(mapStateToProps)(TheaterContainer)
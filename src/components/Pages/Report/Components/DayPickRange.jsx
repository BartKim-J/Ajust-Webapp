/* eslint-disable no-unused-vars */
// Standard Import
import React, { Component } from 'react';

import DatePicker from 'react-datepicker'

import "./Stylesheet/react-datepicker.scss";

class DayPickRange extends Component {
  constructor(props) {
    super(props);

    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
  }

  handleChangeStart(startDate) {
    this.props.onDateChange(startDate, this.props.dateRange.endDate);
  }

  handleChangeEnd(endDate) {
    this.props.onDateChange(this.props.dateRange.startDate, endDate);
  }

  render() {
    return (
      <div className="day-pick-range">
        <span className="start-date">
          <DatePicker
            selected={this.props.dateRange.startDate}
            selectsStart
            startDate={this.props.dateRange.startDate}
            endDate={this.props.dateRange.endDate}
            onChange={this.handleChangeStart}
            popperPlacement="auto-right"
          />
        </span>
        <span className="end-date">
          <DatePicker
            selected={this.props.dateRange.endDate}
            selectsEnd
            startDate={this.props.dateRange.startDate}
            endDate={this.props.dateRange.endDate}
            onChange={this.handleChangeEnd}
            minDate={this.props.dateRange.startDate}
            popperPlacement="auto-right"
          />
        </span>
      </div>
    );
  }
}

export default DayPickRange;
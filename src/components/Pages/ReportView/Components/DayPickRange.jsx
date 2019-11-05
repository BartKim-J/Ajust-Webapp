import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import DatePicker from 'react-datepicker';

import './Stylesheet/react-datepicker.scss';

export class DayPickRange extends PureComponent {
  constructor(props) {
    super(props);

    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
  }

  handleChangeStart(startDate) {
    const { onDateChange, dateRange } = this.props;
    onDateChange(startDate, dateRange.endDate);
  }

  handleChangeEnd(endDate) {
    const { onDateChange, dateRange } = this.props;
    onDateChange(dateRange.startDate, endDate);
  }

  render() {
    const { dateRange } = this.props;

    return (
      <div className="day-pick-range">
        <span className="start-date">
          <DatePicker
            selected={dateRange.startDate}
            selectsStart
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            onChange={this.handleChangeStart}
            popperPlacement="auto-right"
          />
        </span>
        <span className="end-date">
          <DatePicker
            selected={dateRange.endDate}
            selectsEnd
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            onChange={this.handleChangeEnd}
            minDate={dateRange.startDate}
            popperPlacement="auto-right"
          />
        </span>
      </div>
    );
  }
}

DayPickRange.propTypes = {
  dateRange: PropTypes.object.isRequired,
  onDateChange: PropTypes.func.isRequired,
}

export default DayPickRange;

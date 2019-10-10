import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Doughnut } from 'react-chartjs-2';
import { DayPickRange } from './DayPickRange';

import './Stylesheet/RangePieChart.scss';

const PieChartOptions = {
  maintainAspectRatio: false,
  legend: { display: false },
  responsive: true,
  title: {
    display: false,
    text: 'Bar Chart Title',
  },
  animation: {
    duration: 0,
  },
  scales: {
    yAxes: [
      {
        display: false,
      },
    ],
    xAxes: [
      {
        display: false,
      },
    ],
  },
};

class RangePieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    const { dataChange } = this.props;
    
    this.dataChange = dataChange;
    this.onDateChange = this.onDateChange.bind(this);
  }

  componentDidMount() {}

  onDateChange(startDate, endDate) {
    const dateRange = {
      startDate,
      endDate,
    };

    this.dateChange(dateRange);
  }

  render() {
    const { title, data, dateRange } = this.props
    return (
      <div className="pie-chart">
        <div className="title">
          {title}
          <div className="daypicker">
            <DayPickRange dateRange={dateRange} onDateChange={this.onDateChange} />
          </div>
        </div>
        <div className="pie-chart">
          <Doughnut data={data} options={PieChartOptions} />
        </div>
      </div>
    );
  }
}

RangePieChart.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  dateRange: PropTypes.object.isRequired,

  dataChange: PropTypes.func,
}

RangePieChart.defaultProps = {
  dataChange: undefined,
}

export default RangePieChart;

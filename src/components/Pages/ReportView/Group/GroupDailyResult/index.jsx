import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { updateWeekRange, updateMonthRange, resetDateRange } from 'actions';

import { Bar } from 'react-chartjs-2';


import RangePieChart from '../../Components/RangePieChart';


import './GroupDailyResult.scss';

const BarChartOptions = {
  maintainAspectRatio: false,
  legend: {
    display: false,
    labels: {
      fontColor: '#ffffff',
    },
  },
  responsive: true,
  title: {
    display: false,
    text: 'Pie Chart Title',
  },
  scales: {
    // X,Y axis options
    xAxes: [
      {
        stacked: true,
        display: true,
        gridLines: {
          color: '#ffffff',
          borderDash: [5, 8],
        },
        scaleLabel: {
          display: true,
          labelString: 'Hour',
          fontColor: '#ffffff',
        },
        ticks: {
          fontColor: '#ffffff',
          beginAtZero: true,
        },
      },
    ],
    yAxes: [
      {
        stacked: true,
        display: true,
        gridLines: {
          color: '#ffffff',
          borderDash: [5, 8],
        },
        scaleLabel: {
          display: true,
          labelString: 'Count',
          fontColor: '#ffffff',
        },
        ticks: {
          fontColor: '#ffffff',
          beginAtZero: true,
        },
      },
    ],
  },
};

class GroupDailyResult extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.chartReference = {};

    const { onUpdateWeekRange, onUpdateMonthRange } = this.props;

    this.onUpdateWeekRange = onUpdateWeekRange.bind(this);
    this.onUpdateMonthRange = onUpdateMonthRange.bind(this);
  }

  componentDidMount() {
    const { resetAllDate } = this.props;
    resetAllDate();

    // console.log(this.chartReference); // returns a Chart.js instance reference
    // const timerId = setInterval(async () => {
    setInterval(async () => {
      if (this.chartReference) {
        const BarChartInstance = this.chartReference.chartInstance;

        BarChartInstance.update();
      }
    }, 3000);
  }

  render() {
    const {
      weekRange,
      monthRange,
      WeeklyResultData,
      MonthlyResultData,
      DailyResultData,
    } = this.props;

    return (
      <div className="group-daily-result-container">
        <div className="group-daily-result-inner">
          {/* Daily Chart Box */}
          <div className="group-daily-result-chart-box">
            <div className="group-daily-result-chart">
              <Bar
                ref={reference => {
                  this.chartReference = reference;
                }}
                data={DailyResultData}
                options={BarChartOptions}
              />
            </div>
          </div>

          {/* Weekly & Monthly Chart Box */}
          <div className="group-other-result-chart-box">
            <div className="group-vertical-line" />

            {/* Weekly Result Chart */}
            <RangePieChart
              title="Weekly Result"
              data={WeeklyResultData}
              dateRange={weekRange}
              dateChange={this.onUpdateWeekRange}
            />

            {/* Monthly Result Chart */}
            <RangePieChart
              title="Monthly Result"
              data={MonthlyResultData}
              dateRange={monthRange}
              dateChange={this.onUpdateMonthRange}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    weekRange: state.dayRangePicker.weekRange,
    monthRange: state.dayRangePicker.monthRange,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateWeekRange: dateRange => dispatch(updateWeekRange(dateRange)),
    onUpdateMonthRange: dateRange => dispatch(updateMonthRange(dateRange)),
    resetAllDate: () => dispatch(resetDateRange()),
  };
};

GroupDailyResult.propTypes = {
  onUpdateWeekRange: PropTypes.func.isRequired,
  onUpdateMonthRange: PropTypes.func.isRequired,
  resetAllDate: PropTypes.func.isRequired,

  weekRange: PropTypes.object.isRequired,
  monthRange: PropTypes.object.isRequired,

  DailyResultData: PropTypes.object.isRequired,
  WeeklyResultData: PropTypes.object.isRequired,
  MonthlyResultData: PropTypes.object.isRequired,
};

GroupDailyResult = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroupDailyResult);

export default GroupDailyResult;
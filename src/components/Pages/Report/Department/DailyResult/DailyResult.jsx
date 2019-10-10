import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Bar } from 'react-chartjs-2';

import { connect } from 'react-redux';
import { updateWeekRange, updateMonthRange, resetDateRange } from 'actions';

import RangePieChart from 'components/Pages/Report/Components/RangePieChart';

import './DailyResult.scss';

const WeeklyResultData = {
  type: 'doughnut',
  datasets: [
    {
      borderWidth: 0,
      data: [1, 1, 1],
      backgroundColor: ['#7ed321', '#ff7700', '#ff0000'],
    },
  ],

  // These labels appear in the legend and in the tooltips when hovering different arcs
  labels: ['Optmal', 'Safie', 'Warning'],
};

const MonthlyResultData = {
  type: 'doughnut',
  datasets: [
    {
      borderWidth: 0,
      data: [1, 1, 1],
      backgroundColor: ['#7ed321', '#ff7700', '#ff0000'],
    },
  ],

  // These labels appear in the legend and in the tooltips when hovering different arcs
  labels: ['Optmal', 'Safie', 'Warning'],
};

const BarChartOptions = {
  maintainAspectRatio: false,
  legend: {
    display: true,
    labels: {
      fontColor: '#ffffff',
      fontStyle: 'bold',
      boxWidth: 12,
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

class DailyResult extends Component {
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
  }

  shouldComponentUpdate(nextProps) {
    const { DailyResultData } = nextProps;

    if (DailyResultData) {
      let BarChartInstance;
      if (this.chartReference) {
        BarChartInstance = this.chartReference.chartInstance;
        BarChartInstance.data = DailyResultData;
        BarChartInstance.update(0);
      }
    }
    return false;
  }

  render() {
    const { DailyResultData, weekRange, monthRange } = this.props;

    return (
      <div className="daily-result-container">
        <div className="daily-result-inner">
          {/* Daily Chart Box */}
          <div className="daily-result-chart-box">
            <div className="daily-result-chart">
              <Bar
                ref={reference => {
                  this.chartReference = reference;
                }}
                data={DailyResultData}
                options={BarChartOptions}
                redraw
              />
            </div>
          </div>

          {/* Weekly & Monthly Chart Box */}
          <div className="other-result-chart-box">
            <div className="vertical-line" />

            {/* Weekly Result Chart */}
            <RangePieChart
              title="Weekly Result"
              data={WeeklyResultData}
              dateRange={weekRange}
              dateChange={this.onUpdateWeekRange}
              redraw
            />

            {/* Monthly Result Chart */}
            <RangePieChart
              title="Monthly Result"
              data={MonthlyResultData}
              dateRange={monthRange}
              dateChange={this.onUpdateMonthRange}
              redraw
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
    DailyResultData: state.dailyDataUpdater.DailyResultData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateWeekRange: dateRange => dispatch(updateWeekRange(dateRange)),
    onUpdateMonthRange: dateRange => dispatch(updateMonthRange(dateRange)),
    resetAllDate: () => dispatch(resetDateRange()),
  };
};

DailyResult.propTypes = {
  resetAllDate: PropTypes.func.isRequired,
  onUpdateWeekRange: PropTypes.func.isRequired,
  onUpdateMonthRange: PropTypes.func.isRequired,

  weekRange: PropTypes.object.isRequired,
  monthRange: PropTypes.object.isRequired,
  DailyResultData: PropTypes.object.isRequired,
  // DailyResultStatus: PropTypes.object.isRequired,
};

DailyResult = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DailyResult);

export default DailyResult;

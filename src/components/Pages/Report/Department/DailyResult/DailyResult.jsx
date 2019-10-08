/* eslint-disable no-class-assign */
/* eslint-disable no-unused-vars */
/*
  @file: DailyResult.js
  @auther: ben kim
  @email: jaehwankim07120@gmail.com

  @note
  @todo
  @debug
*/
// Standard Import
import React, { Component } from 'react';

// NPM Import
import { Bar } from 'react-chartjs-2';
import RangePieChart from '../../Components/RangePieChart';

//Redux
import { connect } from 'react-redux';
import { updateWeekRange, updateMonthRange, resetDateRange } from 'actions';

// Style Sheets
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
    //X,Y axis options
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
    this.state = {
      refresh: false,
    };

    this.chartReference = {};

    this.onWeekRangeChange = this.onWeekRangeChange.bind(this);
    this.onMonthRangeChange = this.onMonthRangeChange.bind(this);
  }

  componentDidMount() {
    this.props._resetAllDate();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps._DailyResultData) {
      let BarChartInstance = undefined;
      if (this.chartReference) {
        BarChartInstance = this.chartReference.chartInstance;
        BarChartInstance.data = this.props._DailyResultData;
        BarChartInstance.update(0);
      }
    }
    return false;
  }

  onWeekRangeChange(dateRange) {
    this.props._onUpdateWeekRange(dateRange);
  }

  onMonthRangeChange(dateRange) {
    this.props._onUpdateMonthRange(dateRange);
  }

  render() {
    return (
      <div className="daily-result-container">
        <div className="daily-result-inner">
          {/* Daily Chart Box */}
          <div className="daily-result-chart-box">
            <div className="daily-result-chart">
              <Bar
                ref={reference => (this.chartReference = reference)}
                data={this.props._DailyResultData}
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
              dateRange={this.props.weekRange}
              dateChange={this.onWeekRangeChange}
              redraw
            />

            {/* Monthly Result Chart */}
            <RangePieChart
              title="Monthly Result"
              data={MonthlyResultData}
              dateRange={this.props.monthRange}
              dateChange={this.onMonthRangeChange}
              redraw
            />
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    weekRange: state.dayRangePicker.weekRange,
    monthRange: state.dayRangePicker.monthRange,
    _DailyResultData: state.dailyDataUpdater.DailyResultData,
    _DailyResultStatus: state.dailyDataUpdater.DailyResultStatus,
  };
};

let mapDispatchToProps = dispatch => {
  return {
    _onUpdateWeekRange: dateRange => dispatch(updateWeekRange(dateRange)),
    _onUpdateMonthRange: dateRange => dispatch(updateMonthRange(dateRange)),
    _resetAllDate: () => dispatch(resetDateRange()),
  };
};

DailyResult = connect(mapStateToProps, mapDispatchToProps,)(DailyResult);

export default DailyResult;

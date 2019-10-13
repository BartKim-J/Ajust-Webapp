import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Bar } from 'react-chartjs-2';

import { connect } from 'react-redux';
import { updateWeekRange, updateMonthRange, resetDateRange } from 'actions';

import './Realtime.scss';

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

class Realtime extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.chartReference = {};
  }

  componentDidMount() {}

  shouldComponentUpdate(nextProps) {
    const { DailyResultStatus } = nextProps;

    if (DailyResultStatus.RealtimeData) {
      let BarChartInstance;
      if (this.chartReference) {
        BarChartInstance = this.chartReference.chartInstance;
        BarChartInstance.data = DailyResultStatus.RealtimeData;
        BarChartInstance.update(0);
      }
    }
    return false;
  }

  render() {
    const { DailyResultStatus } = this.props;

    return (
      <div className="realtime-result-container">
        <div className="realtime-result-inner">
          {/* realtime Chart Box */}
          <div className="realtime-result-chart-box">
            <div className="realtime-result-chart">
              <Bar
                ref={reference => {
                  this.chartReference = reference;
                }}
                data={DailyResultStatus.RealtimeData}
                options={BarChartOptions}
                redraw
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    DailyResultStatus: state.dailyDataUpdater.DailyResultStatus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateWeekRange: dateRange => dispatch(updateWeekRange(dateRange)),
    onUpdateMonthRange: dateRange => dispatch(updateMonthRange(dateRange)),
    resetAllDate: () => dispatch(resetDateRange()),
  };
};

Realtime.propTypes = {
  DailyResultStatus: PropTypes.object.isRequired,
};

Realtime = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Realtime);

export default Realtime;

/* eslint-disable no-class-assign */
// Standard Import
import {Component} from 'react';

// NPM Import

// Redux
import {connect} from 'react-redux';
import {updateWeekRange, updateMonthRange, resetDateRange} from 'actions';

// Style Sheets
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
    this.onWeekRangeChange = this.onWeekRangeChange.bind(this);
    this.onMonthRangeChange = this.onMonthRangeChange.bind(this);
  }

  componentDidMount() {
    const { _resetAllDate } = this.props;
    _resetAllDate();

    // console.log(this.chartReference); // returns a Chart.js instance reference
    // const timerId = setInterval(async () => {
    setInterval(async () => {
      let BarChartInstance = undefined;
      if (this.chartReference) {
        BarChartInstance = this.chartReference.chartInstance;

        BarChartInstance.update();
      }
    }, 3000);
  }

  onWeekRangeChange(dateRange) {
    this.props._onUpdateWeekRange(dateRange);
  }

  onMonthRangeChange(dateRange) {
    this.props._onUpdateMonthRange(dateRange);
  }

  render() {
    return (
      <div className="group-daily-result-container">
        <div className="group-daily-result-inner">
          {/* Daily Chart Box */}
          <div className="group-daily-result-chart-box">
            <div className="group-daily-result-chart">
              <Bar
                ref={reference => (this.chartReference = reference)}
                data={this.props.DailyResultData}
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
              data={this.props.WeeklyResultData}
              dateRange={this.props.weekRange}
              dateChange={this.onWeekRangeChange}
            />

            {/* Monthly Result Chart */}
            <RangePieChart
              title="Monthly Result"
              data={this.props.MonthlyResultData}
              dateRange={this.props.monthRange}
              dateChange={this.onMonthRangeChange}
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
  };
};

let mapDispatchToProps = dispatch => {
  return {
    _onUpdateWeekRange: dateRange => dispatch(updateWeekRange(dateRange)),
    _onUpdateMonthRange: dateRange => dispatch(updateMonthRange(dateRange)),
    _resetAllDate: () => dispatch(resetDateRange()),
  };
};

GroupDailyResult = connect(mapStateToProps, mapDispatchToProps,)(GroupDailyResult);

export default GroupDailyResult;

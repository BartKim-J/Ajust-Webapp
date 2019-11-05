import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { updateWeekRange, updateMonthRange, resetDateRange } from 'actions';

import RangePieChart from '../../Components/RangePieChart';

import './GroupMap.scss';

import imgDummyMap from './Images/DummyMap@3x.png';

export class GroupMap extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};

    const { onUpdateWeekRange, onUpdateMonthRange } = this.props;

    this.onUpdateWeekRange = onUpdateWeekRange.bind(this);
    this.onUpdateMonthRange = onUpdateMonthRange.bind(this);
  }

  componentDidMount() {
    const { resetAllDate } = this.props;
    resetAllDate();
  }

  render() {
    const { DeviceResultData, monthRange } = this.props;

    return (
      <div className="group-map-container">
        <div className="group-map-inner">
          {/* Daily Chart Box */}
          <div className="group-map-box">
            <div className="group-map-chart">
              <div className="group-dummy-map-wrap">
                <img className="group-dummy-map" src={imgDummyMap} alt="dummy map" />
              </div>
            </div>
          </div>

          {/* Device Result Chart Box */}
          <div className="group-other-result-chart-box">
            <div className="group-vertical-line" />

            {/* Device Result Chart */}
            <div className="group-chart-wrap">
              <RangePieChart
                title="Device Result"
                data={DeviceResultData}
                dateRange={monthRange}
                dateChange={this.onUpdateMonthRange}
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
    weekRange: state.dayRangePicker.weekRange,
    monthRange: state.dayRangePicker.monthRange,
    DailyResultData: state.dailyDataUpdater.DailyResultData,
    // DailyResultStatus: state.dailyDataUpdater.DailyResultStatus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateWeekRange: dateRange => dispatch(updateWeekRange(dateRange)),
    onUpdateMonthRange: dateRange => dispatch(updateMonthRange(dateRange)),
    resetAllDate: () => dispatch(resetDateRange()),
  };
};

GroupMap.propTypes = {
  resetAllDate: PropTypes.func.isRequired,
  onUpdateWeekRange: PropTypes.func.isRequired,
  onUpdateMonthRange: PropTypes.func.isRequired,

  // weekRange: PropTypes.object.isRequired,
  monthRange: PropTypes.object.isRequired,
  DeviceResultData: PropTypes.object.isRequired,

  // DailyResultData: PropTypes.object.isRequired,
  // DailyResultStatus: PropTypes.object.isRequired,
};

GroupMap = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroupMap);

export default GroupMap;

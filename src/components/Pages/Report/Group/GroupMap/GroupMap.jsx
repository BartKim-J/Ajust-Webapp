/* eslint-disable no-class-assign */
/* eslint-disable no-unused-vars */
// Standard Import
import React, { Component } from 'react';

// NPM Import
import RangePieChart from '../../Components/RangePieChart'

//Redux
import { connect } from 'react-redux';
import { updateWeekRange, updateMonthRange, resetDateRange } from 'actions'

// Style Sheets
import './GroupMap.scss';

//Images

import imgDummyMap from './Images/DummyMap@3x.png'

class GroupMap extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.onWeekRangeChange = this.onWeekRangeChange.bind(this);
    this.onMonthRangeChange = this.onMonthRangeChange.bind(this);
  }

  componentDidMount() {
    this.props._resetAllDate();
  }

  onWeekRangeChange(dateRange) {
    this.props._onUpdateWeekRange(dateRange);
  }

  onMonthRangeChange(dateRange) {
    this.props._onUpdateMonthRange(dateRange);
  }

  render() {
    return (
      <div className="group-map-container">
        <div className="group-map-inner">

          {/* Daily Chart Box */}
          <div className="group-map-box">
            <div className="group-map-chart">
              <div className="group-dummy-map-wrap">
                <img className="group-dummy-map" src={imgDummyMap} alt="dummy map"/>
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
                data={this.props.DeviceResultData}

                dateRange={this.props.monthRange}
                dateChange={this.onMonthRangeChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    weekRange: state.dayRangePicker.weekRange,
    monthRange: state.dayRangePicker.monthRange,
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    _onUpdateWeekRange: (dateRange) => dispatch(updateWeekRange(dateRange)),
    _onUpdateMonthRange: (dateRange) => dispatch(updateMonthRange(dateRange)),
    _resetAllDate: () => dispatch(resetDateRange())
  };
}

GroupMap = connect(mapStateToProps, mapDispatchToProps)(GroupMap);

export default GroupMap;
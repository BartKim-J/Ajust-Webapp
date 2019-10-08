// Standard Import
import React, { Component } from 'react';

// NPM Import
import RangePieChart from '../../Components/RangePieChart'

//Redux
import { connect } from 'react-redux';
import { updateWeekRange, updateMonthRange, resetDateRange } from 'actions'

// Style Sheets
import './Map.scss';

//Images

import imgDummyMap from './Images/DummyMap@3x.png'

const GroupResultData = {
  type: 'doughnut',
  datasets: [{
    borderWidth: 0,
    data: [1, 1, 1],
    backgroundColor: ["#7ed321", "#ff7700", "#ff0000",],
  }],

  // These labels appear in the legend and in the tooltips when hovering different arcs
  labels: ['Optmal', 'Safie', 'Warning']
};

const DeviceResultData = {
  type: 'doughnut',
  datasets: [{
    borderWidth: 0,
    data: [1, 1, 1],
    backgroundColor: ["#7ed321", "#ff7700", "#ff0000",],
  }],

  // These labels appear in the legend and in the tooltips when hovering different arcs
  labels: [
    'Optmal',
    'Safie',
    'Warning'
  ]
};

class Map extends Component {
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
      <div className="map-container">
        <div className="map-inner">

          {/* Map Box */}
          <div className="map-box">
            <div className="map-chart">
              <div className="dummy-map-wrap">
                <img className="dummy-map" src={imgDummyMap} alt="dummy map"/>
              </div>
            </div>
          </div>

          {/* Group & Device Chart Box */}
          <div className="other-result-chart-box">

            <div className="vertical-line" />

            {/* Group Result Chart */}
            <RangePieChart
              title="Group Result"
              data={GroupResultData}

              dateRange={this.props.weekRange}
              dateChange={this.onWeekRangeChange}
            />

            {/* Device Result Chart */}
            <RangePieChart
              title="Device Result"
              data={DeviceResultData}

              dateRange={this.props.monthRange}
              dateChange={this.onMonthRangeChange}
            />

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

Map = connect(mapStateToProps, mapDispatchToProps)(Map);

export default Map;
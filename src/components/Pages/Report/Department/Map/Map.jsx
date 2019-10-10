import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import RangePieChart from 'components/Pages/Report/Components/RangePieChart';

import { connect } from 'react-redux';
import { updateWeekRange, updateMonthRange, resetDateRange } from 'actions';

import './Map.scss';

import imgDummyMap from './Images/DummyMap@3x.png';

const GroupResultData = {
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

const DeviceResultData = {
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

class Map extends PureComponent {
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

  onWeekRangeChange(dateRange) {
    const { onUpdateWeekRange } = this.props;
    onUpdateWeekRange(dateRange);
  }

  onMonthRangeChange(dateRange) {
    const { onUpdateMonthRange } = this.props;
    onUpdateMonthRange(dateRange);
  }

  render() {
    const { weekRange, monthRange } = this.props;

    return (
      <div className="map-container">
        <div className="map-inner">
          {/* Map Box */}
          <div className="map-box">
            <div className="map-chart">
              <div className="dummy-map-wrap">
                <img className="dummy-map" src={imgDummyMap} alt="dummy map" />
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
              dateRange={weekRange}
              dateChange={this.onUpdateWeekRange}
            />

            {/* Device Result Chart */}
            <RangePieChart
              title="Device Result"
              data={DeviceResultData}
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

Map.propTypes = {
  resetAllDate: PropTypes.func.isRequired,
  onUpdateWeekRange: PropTypes.func.isRequired,
  onUpdateMonthRange: PropTypes.func.isRequired,

  weekRange: PropTypes.object.isRequired,
  monthRange: PropTypes.object.isRequired,
};

Map = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);

export default Map;

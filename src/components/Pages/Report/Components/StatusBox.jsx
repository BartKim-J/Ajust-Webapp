import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from 'shards-react';

import { connect } from 'react-redux';

import './Stylesheet/StatusBox.scss';
import SmallStats from './SmallStats';

const SmallStateAttrs = {
  md: '4',
  sm: '6',
  lg: '0',
};

class StatusBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.smallStatsForm = this.smallStatsForm.bind(this);
  }

  componentDidMount() {}

  smallStatsForm() {
    const { DailyResultStatus, UserInfo } = this.props;

    return [
      {
        label: 'Realtime Count',
        value: DailyResultStatus.dataByRealTime,
        percentage: DailyResultStatus.dataByRealTime,
        increase: true,
        decrease: !this.increase,
        chartLabels: Array(DailyResultStatus.dataByRealTimeData.length),
        attrs: SmallStateAttrs,
        datasets: [
          {
            label: 'Today',
            fill: 'start',
            borderWidth: 1.5,
            backgroundColor: 'rgba(0, 184, 216, 0.5)',
            borderColor: 'rgb(0, 184, 216)',
            data: DailyResultStatus.dataByRealTimeData,
          },
        ],
      },
      {
        label: 'Daily Count',
        value: DailyResultStatus.dataByTotal,
        percentage: DailyResultStatus.dataByTotal,
        increase: true,
        decrease: !this.increase,
        chartLabels: Array(DailyResultStatus.dataByTime.length),
        attrs: SmallStateAttrs,
        datasets: [
          {
            label: 'Today',
            fill: 'start',
            borderWidth: 1.5,
            backgroundColor: 'rgba(23,198,113,0.5)',
            borderColor: 'rgb(23,198,113)',
            data: DailyResultStatus.dataByTime,
          },
        ],
      },
      {
        label: 'Daily Hygiene',
        value: UserInfo.hygieneLevel,
        percentage: UserInfo.hygieneLevel,
        increase: false,
        decrease: !this.increase,
        chartLabels: [null],
        attrs: SmallStateAttrs,
        datasets: [
          {
            label: 'Today',
            fill: 'start',
            borderWidth: 1.5,
            backgroundColor: 'rgba(255,180,0,0.5)',
            borderColor: 'rgb(255,180,0)',
            data: [0],
          },
        ],
      },
      {
        label: 'Hygiene Level',
        value: UserInfo.hygieneLevel,
        percentage: UserInfo.hygieneLevel,
        increase: false,
        decrease: !this.increase,
        chartLabels: [null],
        attrs: SmallStateAttrs,
        datasets: [
          {
            label: 'Today',
            fill: 'start',
            borderWidth: 1.5,
            backgroundColor: 'rgb(0,123,255,0.5)',
            borderColor: 'rgb(0,123,255)',
            data: [0],
          },
        ],
      },
      {
        label: 'Staff',
        value: UserInfo.staff,
        percentage: UserInfo.staff,
        increase: true,
        decrease: !this.increase,
        chartLabels: [null],
        attrs: SmallStateAttrs,
        datasets: [
          {
            label: 'Today',
            fill: 'start',
            borderWidth: 1.5,
            backgroundColor: 'rgba(255,65,105,0.5)',
            borderColor: 'rgb(255,65,105)',
            data: [0],
          },
        ],
      },
      {
        label: 'Device',
        value: UserInfo.device,
        percentage: UserInfo.device,
        increase: true,
        decrease: !this.increase,
        chartLabels: [null, null, null],
        attrs: SmallStateAttrs,
        datasets: [
          {
            label: 'Today',
            fill: 'start',
            borderWidth: 1.5,
            backgroundColor: 'rgb(0,123,255,0.5)',
            borderColor: 'rgb(0,123,255)',
            data: [0, 1, 1],
          },
        ],
      },
    ];
  }

  render() {
    return (
      <div className="status-chart">
        <div className="status-chart-inner">
          <Container fluid className="status-boxs">
            <Row>
              {this.smallStatsForm().map((stats, idx) => (
                <div className="col-lg-2 col-md-3 col-sm-4" key={stats.label} {...stats.attrs}>
                  <SmallStats
                    id={`small-stats-${idx}`}
                    variation="1"
                    chartData={stats.datasets}
                    chartLabels={stats.chartLabels}
                    label={stats.label}
                    value={stats.value}
                    percentage={stats.percentage}
                    increase={stats.increase}
                    decrease={stats.decrease}
                  />
                </div>
              ))}
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    DailyResultData: state.dailyDataUpdater.DailyResultData,
    DailyResultStatus: state.dailyDataUpdater.DailyResultStatus,
  };
};

StatusBox.propTypes = {
  UserInfo: PropTypes.object.isRequired,
  DailyResultStatus: PropTypes.object.isRequired,
}

StatusBox = connect(
  mapStateToProps,
)(StatusBox);

export default StatusBox

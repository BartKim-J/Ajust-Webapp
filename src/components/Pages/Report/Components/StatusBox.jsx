// Standard Import
import React, { Component } from 'react';
import { Container, Row, Col } from 'shards-react';

//Redux
import { connect } from 'react-redux';

// Style Sheets
import './Stylesheet/StatusBox.scss';
import SmallStats from './SmallStats'


const SmallStateAttrs = {
  md: "4", sm: "6", lg: "0",
}



class StatusBox extends Component {
  constructor(props) {
    super(props);


    this.state = {
      smallStats: undefined,
    };

    this.smallStatsForm = this.smallStatsForm.bind(this);
  }

  componentDidMount() {

  }

  smallStatsForm() {
    let StatusByProps   = this.props._DailyResultStatus;
    let UserInfoByProps = this.props.UserInfo; 

    return [
      {
        label: "Realtime Count",
        value: StatusByProps.dataByRealTime,
        percentage: StatusByProps.dataByRealTime,
        increase: true,
        decrease: !this.increase,
        chartLabels: Array(StatusByProps.dataByRealTimeData.length),
        attrs: SmallStateAttrs,
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(0, 184, 216, 0.5)",
            borderColor: "rgb(0, 184, 216)",
            data: StatusByProps.dataByRealTimeData,
          }
        ]
      },
      {
        label: "Daily Count",
        value: StatusByProps.dataByTotal,
        percentage: StatusByProps.dataByTotal,
        increase: true,
        decrease: !this.increase,
        chartLabels: Array(StatusByProps.dataByTime.length),
        attrs: SmallStateAttrs,
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(23,198,113,0.5)",
            borderColor: "rgb(23,198,113)",
            data: StatusByProps.dataByTime,
          }
        ]
      },
      {
        label: "Daily Hygiene",
        value: UserInfoByProps.hygieneLevel,
        percentage: UserInfoByProps.hygieneLevel,
        increase: false,
        decrease: !this.increase,
        chartLabels: [null, ],
        attrs: SmallStateAttrs,
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(255,180,0,0.5)",
            borderColor: "rgb(255,180,0)",
            data: [0]
          }
        ]
      },
      {
        label: "Hygiene Level",
        value: UserInfoByProps.hygieneLevel,
        percentage: UserInfoByProps.hygieneLevel,
        increase: false,
        decrease: !this.increase,
        chartLabels: [null, ],
        attrs: SmallStateAttrs,
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgb(0,123,255,0.5)",
            borderColor: "rgb(0,123,255)",
            data: [0]
          }
        ]
      },
      {
        label: "Staff",
        value: UserInfoByProps.staff,
        percentage: UserInfoByProps.staff,
        increase: true,
        decrease: !this.increase,
        chartLabels: [null, ],
        attrs: SmallStateAttrs,
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(255,65,105,0.5)",
            borderColor: "rgb(255,65,105)",
            data: [0]
          }
        ]
      },
      {
        label: "Device",
        value: UserInfoByProps.device,
        percentage: UserInfoByProps.device,
        increase: true,
        decrease: !this.increase,
        chartLabels: [null, null, null],
        attrs: SmallStateAttrs,
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgb(0,123,255,0.5)",
            borderColor: "rgb(0,123,255)",
            data: [0, 1, 1,]
          }
        ]
      },
    ];
  }

  shouldComponentUpdate(nextProps, nextState) {

    return true;
  }

  render() {
    return (
      <div className="status-chart">
        <div className="status-chart-inner">
          <Container fluid className="status-boxs px-4">
            <Row>
              {this.smallStatsForm().map((stats, idx) => (
                <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
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
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    _DailyResultData: state.dailyDataUpdater.DailyResultData,
    _DailyResultStatus: state.dailyDataUpdater.DailyResultStatus,
  }
}

let mapDispatchToProps = (dispatch) =>{
  return {
  };
}

StatusBox = connect(mapStateToProps, mapDispatchToProps)(StatusBox);


export default StatusBox;


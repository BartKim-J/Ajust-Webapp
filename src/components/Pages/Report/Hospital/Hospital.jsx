/* eslint-disable no-class-assign */
/* eslint-disable no-unused-vars */
/*
  @file: Hospital.js
  @auther: ben kim
  @email: jaehwankim07120@gmail.com

  @note
  @todo
  @debugreact
*/
// Standard Import
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// Standard Stylesheet
import "shards-ui/dist/css/shards.min.css";

//Redux
import { connect } from 'react-redux';
import { updateDailyResult, updateDailyStatus, resetDailyDatas } from 'actions';

// Components
import CategoryButtons from 'components/Library/CategoryButtons/CategoryButtons';
import { getDailyData } from 'components/Library/utils';
import StatusBox from '../Components/StatusBox';

// Style Sheets
import './Hospital.scss';

const buttonStats = [
  {
    label: "CATEGORY 1",
    link: "CATEGORY 1"
  },
  {
    label: "CATEGORY 2",
    link: "CATEGORY 2"
  }
];

class ReportHospital extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,

      DailyResultData: undefined,
      DailyResultStatus: undefined,
      UserInfo: undefined,

      isLoaded: false,
    };


    this.onClickCategoryButtons = this.onClickCategoryButtons.bind(this);

    this.onUpdateDailyResult = this.props._onUpdateDailyResult.bind(this);
    this.onUpdateDailyStatus = this.props._onUpdateDailyStatus.bind(this);
    this.getDailyData = getDailyData.bind(this);
  }

  componentDidMount() {
    this.getDailyData();

    /*
    setInterval(async () =>{
      this.getDailyData();
    }, 3000);
    */
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }


  onClickCategoryButtons(value) { this.setState({ selected: value, }); }

  render() {
    const isLoaded = this.state.isLoaded;

    if (isLoaded === false) {
      return null;// note you can also return null here to render nothingNoEventsView />;
    }
    else {
      //const GroupDatasets = this.props._DailyResultData.datasets;
      const UserInfo = this.state.UserInfo;

      return (
        <div className="hospital-section">
          <div className="hospital-inner">

            {/* Status Boxs */}
            <div className="hospital-top-container">
              <StatusBox
                DailyResultStatus={this.props._DailyResultStatus}
                UserInfo={UserInfo}
              />
            </div>

            <div className="hospital-bottom-container">
              <div className="button-box">
                <CategoryButtons
                  buttonStats={buttonStats}
                  currentPath={`/Report/Hospital`}
                  selected={this.state.selected}
                  clickHandler={this.onClickCategoryButtons}
                />
              </div>

              <Switch>
                <Route exact path="/Report/Hospital" render={() => (
                  <Redirect to="/Report/Hospital/?" />
                )} />
              </Switch>

            </div>
          </div>
        </div>
      );
    }
  }
}

let mapStateToProps = (state) => {
  return {
    _DailyResultData: state.dailyDataUpdater.DailyResultData,
    _DailyResultStatus: state.dailyDataUpdater.DailyResultStatus,
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    _onUpdateDailyResult: (dailyResult) => dispatch(updateDailyResult(dailyResult)),
    _onUpdateDailyStatus: (dailyStatus) => dispatch(updateDailyStatus(dailyStatus)),
    _resetAllDate: () => dispatch(resetDailyDatas())
  };
}

ReportHospital = connect(mapStateToProps, mapDispatchToProps)(ReportHospital);

export default ReportHospital;
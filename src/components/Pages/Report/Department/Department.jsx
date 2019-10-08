/* eslint-disable no-class-assign */
/* eslint-disable no-unused-vars */
/*
  @file: Department.js
  @auther: ben kim
  @email: jaehwankim07120@gmail.com

  @note
  @todo
  @debug
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

// View
import DailyResult from './DailyResult/DailyResult';
import GroupList from './GroupList/GroupList';
import Map from './Map/Map';

// Style Sheets
import './Department.scss';

const buttonStats = [
  { label: "Daily Results", link: "DailyResult" },
  { label: "Group List", link: "GroupList" },
  { label: "Map", link: "Map" }
];

class ReportDepartment extends Component {
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

    setInterval(async () =>{
      this.getDailyData();
    }, 1000); 

  }

  shouldComponentUpdate(nextProps, nextState) {
    if ((this.state.isLoaded === false) && (nextState.isLoaded === true)) {
      if ((nextProps._DailyResultData !== undefined) && (nextProps._DailyResultStatus !== undefined)) {
        return true;
      }
    }
   
    if(this.state.selected !== nextState.selected) {
      return true;
    }
    return false;
  }

  onClickCategoryButtons(value) { this.setState({ selected: value, }); }

  render() {
    const isLoaded = this.state.isLoaded;

    if (isLoaded === false) {
      return null;// note you can also return null here to render nothingNoEventsView />;
    }
    else {
      const GroupDatasets = this.props._DailyResultData.datasets;
      const UserInfo = this.state.UserInfo;

      return (
        <div className="department-section">
          <div className="department-inner">
            {/* Status Boxs */}
            <div className="department-top-container">
              <StatusBox
                DailyResultStatus={this.props._DailyResultStatus}
                UserInfo={UserInfo}
              />
            </div>

            <div className="department-bottom-container">
              {/* Category Buttons */}
              <div className="button-box">
                <CategoryButtons
                  buttonStats={buttonStats}
                  currentPath={`/Report/Department`}
                  selected={this.state.selected}
                  clickHandler={this.onClickCategoryButtons}
                />
              </div>

              {/* Router */}
              <Switch>
                <Route exact path={`/Report/Department`} render={() => (
                  <Redirect to={`/Report/Department/DailyResult`} />
                )} />

                <Route exact path={`/Report/Department/DailyResult`}
                  render={props => <DailyResult/>}
                />
                <Route path={`/Report/Department/GroupList`}
                  render={props =>
                    <GroupList
                      GroupDatas={GroupDatasets}
                    />
                  }
                />
                <Route path={`/Report/Department/Map`}
                  render={props =>
                    <Map
                    />
                  }
                />
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

let mapDispatchToProps = (dispatch) =>{
  return {
      _onUpdateDailyResult: (dailyResult) => dispatch(updateDailyResult(dailyResult)),
      _onUpdateDailyStatus: (dailyStatus) => dispatch(updateDailyStatus(dailyStatus)),
      _resetAllDate: () => dispatch(resetDailyDatas())
  };
}

ReportDepartment = connect(mapStateToProps, mapDispatchToProps)(ReportDepartment);

export default ReportDepartment;
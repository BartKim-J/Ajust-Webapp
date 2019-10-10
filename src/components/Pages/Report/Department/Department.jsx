import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';

import 'shards-ui/dist/css/shards.min.css';

import { connect } from 'react-redux';
import { updateDailyResult, updateDailyStatus, resetDailyDatas } from 'actions';

import CategoryButtons from 'components/Library/CategoryButtons/CategoryButtons';
import { getDailyData } from 'components/Library/utils';

import StatusBox from 'components/Pages/Report/Components/StatusBox';

import DailyResult from './DailyResult/DailyResult';
import GroupList from './GroupList/GroupList';
import Map from './Map/Map';

import './Department.scss';

const buttonStats = [
  { label: 'Daily Results', link: 'DailyResult' },
  { label: 'Group List', link: 'GroupList' },
  { label: 'Map', link: 'Map' },
];

class ReportDepartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      UserInfo: undefined,
      isLoaded: false,
    };

    this.onClickCategoryButtons = this.onClickCategoryButtons.bind(this);

    const { onUpdateDailyResult, onUpdateDailyStatus } = this.props;

    this.onUpdateDailyResult = onUpdateDailyResult.bind(this);
    this.onUpdateDailyStatus = onUpdateDailyStatus.bind(this);
    this.getDailyData = getDailyData.bind(this);
  }

  componentDidMount() {
    this.getDailyData();

    setInterval(async () => {
      this.getDailyData();
    }, 1000);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { isLoaded, selected } = this.state;

    if (isLoaded === false && nextState.isLoaded === true) {
      if (nextProps.DailyResultData !== undefined && nextProps.DailyResultStatus !== undefined) {
        return true;
      }
    }

    if (selected !== nextState.selected) {
      return true;
    }
    return false;
  }

  onClickCategoryButtons = value => {
    this.setState({ selected: value });
  };

  render() {
    const { isLoaded, selected } = this.state;
    const { DailyResultData, DailyResultStatus } = this.props;

    if (isLoaded === false) {
      return null; // note you can also return null here to render nothingNoEventsView />;
    }
    const GroupDatasets = DailyResultData.datasets;
    const { UserInfo } = this.state;

    return (
      <div className="department-section">
        <div className="department-inner">
          {/* Status Boxs */}
          <div className="department-top-container">
            <StatusBox DailyResultStatus={DailyResultStatus} UserInfo={UserInfo} />
            
            {/* Category Buttons */}
            <div className="button-box">
              <CategoryButtons
                buttonStats={buttonStats}
                currentPath="/Report/Department"
                selected={selected}
                clickHandler={this.onClickCategoryButtons}
              />
            </div>
          </div>

          <div className="department-bottom-container">
            {/* Router */}
            <Switch>
              <Route
                exact
                path="/Report/Department"
                render={() => <Redirect to="/Report/Department/DailyResult" />}
              />

              <Route exact path="/Report/Department/DailyResult" render={() => <DailyResult />} />

              <Route
                path="/Report/Department/GroupList"
                render={() => <GroupList GroupDatas={GroupDatasets} />}
              />

              <Route path="/Report/Department/Map" render={() => <Map />} />
            </Switch>
          </div>
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

const mapDispatchToProps = dispatch => {
  return {
    onUpdateDailyResult: dailyResult => dispatch(updateDailyResult(dailyResult)),
    onUpdateDailyStatus: dailyStatus => dispatch(updateDailyStatus(dailyStatus)),
    resetDailyDatas: () => dispatch(resetDailyDatas()),
  };
};

ReportDepartment.propTypes = {
  onUpdateDailyResult: PropTypes.func.isRequired,
  onUpdateDailyStatus: PropTypes.func.isRequired,

  DailyResultData: PropTypes.object,
  DailyResultStatus: PropTypes.object,
};

ReportDepartment.defaultProps = {
  DailyResultData: undefined,
  DailyResultStatus: undefined,
};

ReportDepartment = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReportDepartment);

export default ReportDepartment;

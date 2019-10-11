import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';

import 'shards-ui/dist/css/shards.min.css';

import { connect } from 'react-redux';
import { updateDailyResult, updateDailyStatus, resetDailyDatas } from 'actions';

import LoadingView from 'components/Layouts/Loading/Loading';

import CategoryButtons from 'components/Library/CategoryButtons/CategoryButtons';
import { getDailyData } from 'components/Library/utils';
import StatusBox from '../Components/StatusBox';

import './Hospital.scss';

const buttonStats = [
  {
    label: 'CATEGORY 1',
    link: 'CATEGORY 1',
  },
  {
    label: 'CATEGORY 2',
    link: 'CATEGORY 2',
  },
];

class ReportHospital extends Component {
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
  }

  onClickCategoryButtons(value) {
    this.setState({ selected: value });
  }

  render() {
    const { isLoaded, selected } = this.state;
    const { DailyResultStatus } = this.props;

    if (isLoaded === false) {
      return <LoadingView />;
    }
    // const GroupDatasets = this.props._DailyResultData.datasets;
    const { UserInfo } = this.state;

    return (
      <div className="hospital-section">
        <div className="hospital-inner">
          {/* Status Boxs */}
          <div className="hospital-top-container">
            <StatusBox DailyResultStatus={DailyResultStatus} UserInfo={UserInfo} />

            <div className="button-box">
              <CategoryButtons
                buttonStats={buttonStats}
                currentPath="/Report/Hospital"
                selected={selected}
                clickHandler={this.onClickCategoryButtons}
              />
            </div>
          </div>

          <div className="hospital-bottom-container">
            <Switch>
              <Route
                exact
                path="/Report/Hospital"
                render={() => <Redirect to="/Report/Hospital/?" />}
              />
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
    resetAllDate: () => dispatch(resetDailyDatas()),
  };
};

ReportHospital.propTypes = {
  onUpdateDailyResult: PropTypes.func,
  onUpdateDailyStatus: PropTypes.func,

  DailyResultStatus: PropTypes.object,
};

ReportHospital.defaultProps = {
  onUpdateDailyResult: undefined,
  onUpdateDailyStatus: undefined,

  DailyResultStatus: undefined,
};

ReportHospital = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReportHospital);

export default ReportHospital;

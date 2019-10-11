import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import { FormSelect } from 'shards-react';

import 'shards-ui/dist/css/shards.min.css';

import { connect } from 'react-redux';
import { updateDailyResult, updateDailyStatus, resetDailyDatas } from 'actions';

import LoadingView from 'components/Layouts/Loading/Loading';

import CategoryButtons from 'components/Library/CategoryButtons/CategoryButtons';
import { getDailyData } from 'components/Library/utils';
import StatusBox from '../Components/StatusBox';

import GroupDailyResult from './GroupDailyResult/GroupDailyResult';
import { GroupMap } from './GroupMap/GroupMap';

// Style Sheets
import './Group.scss';

const WeeklyResultData = {
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

const MonthlyResultData = {
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

const buttonStats = [
  {
    label: 'Daily Results',
    link: 'DailyResult',
  },
  {
    label: 'Map',
    link: 'Map',
  },
];

class ReportGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      selectedGroup: 0,

      UserInfo: undefined,

      isLoaded: false,
    };

    const { onUpdateDailyResult, onUpdateDailyStatus } = this.props;

    this.onUpdateDailyResult = onUpdateDailyResult.bind(this);
    this.onUpdateDailyStatus = onUpdateDailyStatus.bind(this);
    this.getDailyData = getDailyData.bind(this);

    this.onClickCategoryButtons = this.onClickCategoryButtons.bind(this);
    this.onChangeGroupForm = this.onChangeGroupForm.bind(this);

    this.selectGroupForm = this.selectGroupForm.bind(this);
    this.getGroupData = this.getGroupData.bind(this);
  }

  componentDidMount() {
    this.getDailyData();
  }

  onClickCategoryButtons(value) {
    this.setState({
      selected: value,
    });

    this.getGroupData = this.getGroupData.bind(this);
  }

  onChangeGroupForm(event) {
    const { history } = this.props;

    this.setState({ selectedGroup: event.target.value });
    history.push(`${history.location.pathname}?${event.target.value}`);
  }

  getGroupData(index) {
    const { DailyResultData } = this.props;

    const retDailyResultData = {
      type: 'bar',
      labels: DailyResultData.labels,
      datasets: [DailyResultData.datasets[index]],
    };

    return retDailyResultData;
  }

  selectGroupForm() {
    const { DailyResultData } = this.props;
    const GroupDatas = DailyResultData.datasets;

    return (
      <FormSelect onChange={this.onChangeGroupForm} className="group-select-form">
        {GroupDatas.map((data, index) => (
          <option key={data.label} value={index}>
            {data.label}
          </option>
        ))}
      </FormSelect>
    );
  }

  render() {
    const { isLoaded, selected } = this.state;
    const { DailyResultStatus } = this.props;

    if (isLoaded === false) {
      return <LoadingView />;
    }
    const { UserInfo, selectedGroup } = this.state;

    return (
      <div className="group-section">
        <div className="group-inner">
          {/* Top Container */}
          <div className="group-top-container">
            <StatusBox DailyResultStatus={DailyResultStatus} UserInfo={UserInfo} />

            {/* Category Button Box */}
            <div className="button-box">
              <CategoryButtons
                buttonStats={buttonStats}
                currentPath="/Report/Group"
                selected={selected}
                clickHandler={this.onClickCategoryButtons}
              />
            </div>
          </div>

          {/* Bottom Container */}
          <div className="group-bottom-container">
            {/* Group Select Form */}
            <div className="group-select-box">{this.selectGroupForm()}</div>

            <Switch>
              {/* Router */}
              <Route
                exact
                path="/Report/Group"
                render={() => <Redirect to="/Report/Group/DailyResult" />}
              />

              <Route
                path="/Report/Group/DailyResult"
                render={() => (
                  <GroupDailyResult
                    DailyResultData={this.getGroupData(selectedGroup)}
                    WeeklyResultData={WeeklyResultData}
                    MonthlyResultData={MonthlyResultData}
                  />
                )}
              />

              <Route
                path="/Report/Group/Map"
                render={() => (
                  <GroupMap
                    GroupResultData={MonthlyResultData}
                    DeviceResultData={WeeklyResultData}
                  />
                )}
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

ReportGroup.propTypes = {
  onUpdateDailyResult: PropTypes.func.isRequired,
  onUpdateDailyStatus: PropTypes.func.isRequired,

  DailyResultData: PropTypes.object,
  DailyResultStatus: PropTypes.object,

  history: PropTypes.object.isRequired,
};

ReportGroup.defaultProps = {
  DailyResultData: undefined,
  DailyResultStatus: undefined,
};

ReportGroup = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReportGroup);

export default ReportGroup;

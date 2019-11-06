import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Route, Switch, Redirect } from 'react-router-dom';

import mediaConf from 'configure/mediaConfig';

import 'shards-ui/dist/css/shards.min.css';

import { connect } from 'react-redux';
import { updateDailyResult, updateDailyStatus, resetDailyDatas } from 'actions';

import LoadingView from 'components/Layouts/Loading';

import CategoryButtons from 'components/Library/CategoryButtons';
import { getDailyData } from 'components/Library/utils';

import StatusBox from '../Components/StatusBox';

import DailyResult from './Components/DailyResult';
import Realtime from './Components/Realtime';
import GroupList from './Components/GroupList';
import Map from './Components/Map';

const buttonStats = [
  { label: 'Daily', link: 'Daily' },
  { label: 'Realtime', link: 'Realtime' },
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

    this.TimerId = setInterval(async () => {
      this.getDailyData();
    }, 6000);
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

  componentWillUnmount() {
    clearInterval(this.TimerId);
  }

  onClickCategoryButtons = value => {
    this.setState({ selected: value });
  };

  render() {
    const { isLoaded, selected } = this.state;
    const { DailyResultData, DailyResultStatus } = this.props;

    if (isLoaded === false) {
      return <LoadingView />;
    }
    const GroupDatasets = DailyResultData.datasets;
    const { UserInfo } = this.state;

    return (
      <Styled.Section>
        <Styled.Container>
          <Styled.TopContentWrap>
            <Styled.TopContent>
              <StatusBox DailyResultStatus={DailyResultStatus} UserInfo={UserInfo} />

              {/* Category Buttons */}
              <Styled.ButtonBox>
                <CategoryButtons
                  buttonStats={buttonStats}
                  currentPath="/Report/Department"
                  selected={selected}
                  clickHandler={this.onClickCategoryButtons}
                />
              </Styled.ButtonBox>
            </Styled.TopContent>
          </Styled.TopContentWrap>

          <Styled.BottomContentWrap>
            <Styled.BottomContent>
              {/* Router */}
              <Switch>
                <Route
                  exact
                  path="/Report/Department"
                  render={() => <Redirect to="/Report/Department/Daily" />}
                />

                <Route path="/Report/Department/Daily" render={() => <DailyResult />} />

                <Route path="/Report/Department/Realtime" render={() => <Realtime />} />

                <Route
                  path="/Report/Department/GroupList"
                  render={() => <GroupList GroupDatas={GroupDatasets} />}
                />

                <Route path="/Report/Department/Map" render={() => <Map />} />
              </Switch>
            </Styled.BottomContent>
          </Styled.BottomContentWrap>
        </Styled.Container>
      </Styled.Section>
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

const Styled = {};

Styled.Section = styled.div`
  width: 100%;
  height: 100%;

  background: #555d6b;

  transition-duration: 1s;
`;
Styled.Container = styled.div`
  position: relative;

  width: 100%;
  height: 100%;
`;

Styled.TopContentWrap = styled.div`
  position: relative;

  width: 100%;
  max-width: ${mediaConf.MEDIA_WIDTH_DESKTOP_CONTENT};
  margin: 0 auto;

  height: 30%;

  @media (max-aspect-ratio: 1/1) {
    height: 40%;
  }

  background: #555d6b;
`;

Styled.TopContent = styled.div`
  width: 100%;
  height: 100%;
  max-width: ${mediaConf.MEDIA_WIDTH_DESKTOP_CONTENT};
  margin: 0 auto;
`;

Styled.ButtonBox = styled.div`
  position: absolute;
  bottom: 0;
`;

Styled.BottomContentWrap = styled.div`
  position: relative;
  bottom: 0;

  width: 100%;
  height: 70%;

  @media (max-aspect-ratio: 1/1) {
    height: 60%;
  }

  background: #353b46;
`;

Styled.BottomContent = styled.div`
  width: 100%;
  height: 100%;
  max-width: ${mediaConf.MEDIA_WIDTH_DESKTOP_CONTENT};
  margin: 0 auto;

  @media all and (max-width: ${mediaConf.MEDIA_WIDTH_DESKTOP_CONTENT}) {
    padding: 0 ${mediaConf.MEDIA_WIDTH_DESKTOP_CONTENT_PADDING};
  }
`;

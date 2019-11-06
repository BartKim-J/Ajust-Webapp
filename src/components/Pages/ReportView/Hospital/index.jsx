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
      <Styled.Section>
        <Styled.Container>
          <Styled.TopContentWrap>
            <Styled.TopContent>
              <StatusBox DailyResultStatus={DailyResultStatus} UserInfo={UserInfo} />

              {/* Category Buttons */}
              <Styled.ButtonBox>
                <CategoryButtons
                  buttonStats={buttonStats}
                  currentPath="/Report/Hospital"
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
                  path="/Report/Hospital"
                  render={() => <Redirect to="/Report/Hospital/?" />}
                />
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

  background: #555d6b;
`;

Styled.TopContent = styled.div`
  width: 100%;
  height: 100%;
  max-width: ${mediaConf.MEDIA_WIDTH_DESKTOP_CONTENT};
  margin: 0 auto;
`;

Styled.BottomContentWrap = styled.div`
  position: relative;

  width: 100%;
  height: 70%;

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

Styled.ButtonBox = styled.div`
  position: absolute;
  bottom: 0;

  width: 100%;
  height: 15%;
  max-height: 42px;

  @media (max-aspect-ratio: 1/1) {
    height: 7%;
    max-height: 18px;
  }
`;
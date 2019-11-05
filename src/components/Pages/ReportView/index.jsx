import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import mediaConf from 'configure/mediaConfig';

import 'shards-ui/dist/css/shards.min.css';

import ReportHospital from './Hospital';
import ReportDepartment from './Department';
import ReportGroup from './Group';

class ReportView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPath: '/Report',
      defaultCategory: '/Department',
    };
  }

  componentDidMount() {
    const { history } = this.props;
    const { currentPath, defaultCategory } = this.state;

    history.push(`${currentPath}${defaultCategory}`);
  }

  render() {
    return (
      <Styled.Section>
        <Styled.Container>
          <Switch>
            <Route path="/Report/Hospital" component={ReportHospital} />
            <Route path="/Report/Hospital/:category" component={ReportHospital} />

            <Route path="/Report/Department" component={ReportDepartment} />
            <Route path="/Report/Department/:category" component={ReportDepartment} />

            <Route path="/Report/Group" component={ReportGroup} />
            <Route path="/Report/Group/:category" component={ReportGroup} />
          </Switch>
        </Styled.Container>
      </Styled.Section>
    );
  }
}

ReportView.propTypes = {
  history: PropTypes.object.isRequired,
};

export default ReportView;

const Styled = {};

Styled.Section = styled.section`
  width: 100%;
  height: 100%;

  background: white;
`;
Styled.Container = styled.div`
  position: relative;

  width: 100%;
  height: 100%;
`;

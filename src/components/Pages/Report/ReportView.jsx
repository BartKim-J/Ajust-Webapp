import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import 'shards-ui/dist/css/shards.min.css';

import ReportHospital from './Hospital/Hospital';
import ReportDepartment from './Department/Department';
import ReportGroup from './Group/Group';

import './ReportView.scss';

class ReportView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPath: '/Report',
    };
  }

  componentDidMount() {
    const { history } = this.props;
    const { currentPath } = this.state;

    history.push(`${currentPath}/`);
  }

  render() {
    return (
      <div className="report-view">
        <div className="report-inner">
          <Switch>
            <Route path="/Report/Hospital" component={ReportHospital} />
            <Route path="/Report/Hospital/:category" component={ReportDepartment} />

            <Route path="/Report/Department" component={ReportDepartment} />
            <Route path="/Report/Department/:category" component={ReportDepartment} />

            <Route path="/Report/Group" component={ReportGroup} />
            <Route path="/Report/Group/:category" component={ReportDepartment} />
          </Switch>
        </div>
      </div>
    );
  }
}

ReportView.propTypes = {
  history: PropTypes.object.isRequired,
};

export default ReportView;

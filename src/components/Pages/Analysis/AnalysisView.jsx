import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import 'shards-ui/dist/css/shards.min.css';

import AnalysisData from './Data/Data';

import './AnalysisView.scss';

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
      <div className="analysis-view">
        <div className="analysis-inner">
          <Switch>
            <Route path="/Analysis/Data" component={AnalysisData} />
          </Switch>
        </div>
      </div>
    );
  }
}

ReportView.propTypes = {
  history: PropTypes.object.isRequired,
}

export default ReportView;

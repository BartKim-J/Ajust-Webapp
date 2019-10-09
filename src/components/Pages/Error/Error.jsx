import React, { Component } from 'react';
import PropTypes from 'prop-types';

import 'shards-ui/dist/css/shards.min.css';

import './Error.scss';

class ReportView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPath: '/404',
    };
  }

  componentDidMount() {
    const { history } = this.props;
    const {currentPath } = this.state
    history.push(`${currentPath}`);
  }

  render() {
    return (
      <div className="error-view">
        <div className="error-inner">404 not found.</div>
      </div>
    );
  }
}

ReportView.propTypes = {
  history: PropTypes.object.isRequired,
}

export default ReportView;

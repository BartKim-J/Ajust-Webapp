/* eslint-disable no-unused-vars */
// Standard Import
import React, { Component } from 'react';

// Standard Stylesheet
import "shards-ui/dist/css/shards.min.css"

//Components

//Views

//Image

//Style Sheets
import './Error.scss';

class ReportView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPath: "/404",
    }
  }

  componentDidMount() {
    this.props.history.push(`${this.state.currentPath}`);
  }

  render() {
    return (
      <div className="error-view">
        <div className="error-inner">
            404 not found.
        </div>
      </div>
    );
  }
}

export default ReportView;
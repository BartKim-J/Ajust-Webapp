// Standard Import
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// Standard Stylesheet
import "shards-ui/dist/css/shards.min.css"

//Components

//Views
import AnalysisData   from './Data/Data'

//Image

//Style Sheets
import './AnalysisView.scss';

class ReportView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPath: "/Report",
    }
  }

  componentDidMount() {
    this.props.history.push(`${this.state.currentPath}/Analysis`);
  }

  render() {
    return (
      <div className="analysis-view">
        <div className="analysis-inner">
          <Switch>
            <Route path="/Analysis/Data"    component={AnalysisData} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default ReportView;
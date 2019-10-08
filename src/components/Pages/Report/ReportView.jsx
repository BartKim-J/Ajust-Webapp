// Standard Import
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// Standard Stylesheet
import 'shards-ui/dist/css/shards.min.css';

//Components

//Views
import ReportHospital from './Hospital/Hospital';
import ReportDepartment from './Department/Department';
import ReportGroup from './Group/Group';

//Image

//Style Sheets
import './ReportView.scss';

class ReportView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPath: '/Report',
        };
    }

    componentDidMount() {
        this.props.history.push(`${this.state.currentPath}/Department`);
    }

    render() {
        return (
            <div className="report-view">
                <div className="report-inner">
                    <Switch>
                        <Route
                            path="/Report/Hospital"
                            component={ReportHospital}
                        />
                        <Route
                            path="/Report/Hospital/:category"
                            component={ReportDepartment}
                        />

                        <Route
                            path="/Report/Department"
                            component={ReportDepartment}
                        />
                        <Route
                            path="/Report/Department/:category"
                            component={ReportDepartment}
                        />

                        <Route path="/Report/Group" component={ReportGroup} />
                        <Route
                            path="/Report/Group/:category"
                            component={ReportDepartment}
                        />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default ReportView;

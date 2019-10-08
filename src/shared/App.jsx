/* eslint-disable no-unused-vars */
// Standard Include
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

//Style
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import {
    ReportView,
    //SettingView,
    AnalysisView,
    ErrorView,
} from 'components/Pages/PageIndex';

import { SideMenu, NavMenu } from 'components/Layouts/Menu/Menu';

// Style Sheets
import './App.scss';
import './Stylesheet/shards-dashboards.scss';

//Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import ajustApp from 'reducers';

const store = createStore(ajustApp);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div id="outer-container" className="out-container">
                    <NavMenu />
                    <SideMenu
                        pageWrapId={'page-wrap'}
                        outerContainerId={'outer-container'}
                    />
                    <div id="page-wrap" className="inner-container">
                        <div id="contents" className="contents">
                            <Switch>
                                <Route
                                    exact
                                    path="/"
                                    render={() => <Redirect to="/Report" />}
                                />
                                <Route path="/Report" component={ReportView} />
                                <Route
                                    path="/Report/:view"
                                    component={ReportView}
                                />
                                {/*
                                    <Route path="/Setting" component={SettingView} />
                                */}
                                <Route
                                    path="/Analysis"
                                    component={AnalysisView}
                                />

                                <Route component={ErrorView} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </Provider>
        );
    }
}

export default App;

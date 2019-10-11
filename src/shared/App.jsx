import React, { PureComponent } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
  ReportView,
  // SettingView,
  // AnalysisView,
  ErrorView,
} from 'components/Pages/PageIndex';

import NavMenu from 'components/Layouts/Menu/NavMenu';
import SideMenu from 'components/Layouts/Menu/SideMenu';

// Style Sheets
import './App.scss';
import './Stylesheet/shards-dashboards.scss';

// Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import ajustApp from 'reducers';

const store = createStore(ajustApp);

class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <div id="outer-container" className="out-container">
          <NavMenu />
          <SideMenu pageWrapId="page-wrap" outerContainerId="outer-container" />
          <div id="page-wrap" className="inner-container">
            <div id="contents" className="contents">
              <Switch>
                <Route exact path="/" render={() => <Redirect to="/Report" />} />
                <Route path="/Report" component={ReportView} />
                {/* <Route path="/Setting" component={SettingView} /> */}
                {/* <Route path="/Analysis" component={AnalysisView} /> */}

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

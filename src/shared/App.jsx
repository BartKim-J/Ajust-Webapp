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

import './App.scss';
import './Stylesheet/shards-dashboards.scss';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import styled from 'styled-components';

import ajustApp from 'reducers';

const store = createStore(ajustApp);

class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <Styled.Section id="section">
          <NavMenu />
          <SideMenu pageWrapId="container" outerContainerId="section" />
          <Styled.Container id="container">
            <Styled.Contents id="contents">
              <Switch>
                <Route exact path="/" render={() => <Redirect to="/Report" />} />
                <Route path="/Report" component={ReportView} />
                {/* <Route path="/Setting" component={SettingView} /> */}
                {/* <Route path="/Analysis" component={AnalysisView} /> */}

                <Route component={ErrorView} />
              </Switch>
            </Styled.Contents>
          </Styled.Container>
        </Styled.Section>
      </Provider>
    );
  }
}

const Styled = {};


Styled.Section = styled.section`
  position: relative;
  width: 100vw;
  height: 100vh;

  overflow: hidden;
`;

Styled.Container = styled.div`
  width: calc(100vw - 64.1px);
  position: relative;
`;

Styled.Contents = styled.div`
  display: block;
`;

export default App;

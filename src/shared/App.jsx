import React from 'react';
import styled from 'styled-components';
import { Route, Switch, Redirect } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
  ReportView,
  // SettingView,
  // AnalysisView,
  ErrorView,
} from 'components/Pages/PageIndex';

import Menu from 'components/Layouts/Menu';
import SideBar from 'components/Layouts/SideBar';

import './Stylesheet/shards-dashboards.scss';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import ajustApp from 'reducers';

import mediaConf from 'configure/mediaConfig';

const store = createStore(ajustApp);

export default function App() {
  return (
    <Provider store={store}>
      <GlobalStyle>
        <Styled.Section id="section">
          <Menu />
          <SideBar pageWrapId="container" outerContainerId="section" />
          <Styled.Container id="container">
            <Styled.Content id="content">
              <Switch>
                <Route exact path="/" render={() => <Redirect to="/Report" />} />
                <Route path="/Report" component={ReportView} />
                {/* <Route path="/Setting" component={SettingView} /> */}
                {/* <Route path="/Analysis" component={AnalysisView} /> */}
                <Route component={ErrorView} />
              </Switch>
            </Styled.Content>
          </Styled.Container>
        </Styled.Section>
      </GlobalStyle>
    </Provider>
  );
}

const Styled = {};

Styled.Section = styled.section`
  @media all and (min-width: ${mediaConf.MEDIA_WIDTH_DESKTOP_MIN}) and (max-width: ${mediaConf.MEDIA_WIDTH_DESKTOP_MAX}) {
    position: relative;
  }
  @media all and (min-width: ${mediaConf.MEDIA_WIDTH_TABLET_MIN}) and (max-width: ${mediaConf.MEDIA_WIDTH_TABLET_MAX}) {
    position: relative;
  }
  @media all and (min-width: ${mediaConf.MEDIA_WIDTH_MOBILE_MIN}) and (max-width: ${mediaConf.MEDIA_WIDTH_MOBILE_MAX}) {
    position: relative;
  }
  position: relative;
  width: 100vw;
  height: 100vh;

  overflow: hidden;
`;

Styled.Container = styled.div`
  position: absolute;
  bottom: 0;

  width: calc(100vw - 64px);
  height: calc(100vh - 58px);

  @media (max-aspect-ratio: 1/1) {
    width: calc(100vw - 6.4vw);
  }
`;

Styled.Content = styled.div`
  position: relative;

  width: 100%;
  height: 100%;
`;

const GlobalStyle = styled.div`
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  input {
    border: none;
    outline: none;
  }

  a {
    color: #222222;
    outline: none;
  }

  a:hover {
    color: inherit;
  }

  a:active {
    color: inherit;
  }

  button {
    outline: none;
    border: none;

    background: none;
    padding: 0;

    cursor: pointer;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  li {
    list-style-type: none;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  input {
    border: none;
    outline: none;
  }
`;

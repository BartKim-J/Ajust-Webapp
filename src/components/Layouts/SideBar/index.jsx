import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

import ImgReport from './Images/ReportSymbol@3x.png';
import ImgSetting from './Images/SettingSymbol@3x.png';
import ImgAnalysis from './Images/AnalysisSymbol@3x.png';

import './Menu.scss';
import './Sidebar.min.scss';

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.initMenu = this.initMenu.bind(this);
  }

  componentDidMount() {
    const { pageWrapId } = this.props;
    this.initMenu(pageWrapId);
  }

  initMenu = pageWrapId => {
    const elms = document.getElementById(pageWrapId);
    elms.classList.add('sidenav--wrap---close');
  };

  openMenu = pageWrapId => {
    const elms = document.getElementById(pageWrapId);

    elms.classList.toggle('sidenav--wrap---open');
    elms.classList.toggle('sidenav--wrap---close');
  };

  closeMenu = pageWrapId => {
    const elms = document.getElementById(pageWrapId);

    elms.classList.toggle('sidenav--wrap---close');
    elms.classList.toggle('sidenav--wrap---open');
  };

  render() {
    const { pageWrapId } = this.props;

    return (
      <div>
        <Route
          render={({ location, history }) => (
            <SideNav
              onSelect={selected => {
                const to = `/${selected}`;
                if (location.pathname !== to) {
                  history.push(to);
                }
              }}
              onToggle={isOpen => {
                if (isOpen) {
                  this.openMenu(pageWrapId);
                } else {
                  this.closeMenu(pageWrapId);
                }
              }}
            >
              <SideNav.Toggle />
              <SideNav.Nav defaultSelected="Report/Hostpital">
                <NavItem className="side_var-item" eventKey="Report/Department">
                  <NavIcon>
                    <div className="side_bar-item-icon">
                      <img className="side_bar-item-icon" src={ImgReport} alt="report" />
                    </div>
                  </NavIcon>

                  <NavText>
                    <div className="side_var-item-title">Report </div>
                  </NavText>

                  <NavItem eventKey="Report/Hospital">
                    <NavText>
                      <div className="side_var-item-text">Hospital </div>
                    </NavText>
                  </NavItem>

                  <NavItem eventKey="Report/Department">
                    <NavText>
                      <div className="side_var-item-text">Department </div>
                    </NavText>
                  </NavItem>

                  <NavItem eventKey="Report/Group">
                    <NavText>
                      <div className="side_var-item-text">Group </div>
                    </NavText>
                  </NavItem>
                </NavItem>

                <NavItem eventKey="Setting">
                  <NavIcon>
                    <div className="side_bar-item-icon">
                      <img className="side_bar-item-icon" src={ImgSetting} alt="setting" />
                    </div>
                  </NavIcon>

                  <NavText>
                    <div className="side_var-item-title">Setting </div>
                  </NavText>

                  <NavItem eventKey="Setting/Device">
                    <NavText>
                      <div className="side_var-item-text">Device </div>
                    </NavText>
                  </NavItem>

                  <NavItem eventKey="Setting/Group">
                    <NavText>
                      <div className="side_var-item-text">Group </div>
                    </NavText>
                  </NavItem>
                </NavItem>

                <NavItem eventKey="Analysis">
                  <NavIcon>
                    <div className="side_bar-item-icon">
                      <img className="side_bar-item-icon" src={ImgAnalysis} alt="analysis" />
                    </div>
                  </NavIcon>
                  <NavText>
                    <div className="side_var-item-title">Analysis </div>
                  </NavText>
                  <NavItem eventKey="Analysis/Data">
                    <NavText>
                      <div className="side_var-item-text">Data </div>
                    </NavText>
                  </NavItem>
                </NavItem>
              </SideNav.Nav>
            </SideNav>
          )}
        />
      </div>
    );
  }
}

SideMenu.propTypes = {
  pageWrapId: PropTypes.string.isRequired,
};

export default SideMenu;

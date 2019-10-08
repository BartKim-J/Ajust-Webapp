// Standard Include
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { Navbar, Nav } from 'react-bootstrap';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

import ImgLogo     from "./Images/Logo@3x.png";
import ImgReport   from "./Images/ReportSymbol@3x.png";
import ImgSetting  from "./Images/SettingSymbol@3x.png";
import ImgAnalysis from "./Images/AnalysisSymbol@3x.png";

// Components

// Style Sheets
// Be sure to include styles at some point, probably during your bootstraping
import './Menu.scss';
import './Sidebar.min.scss';


class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDataFromChild: null,
            menuState: false,
        };    

        this.openMenu  = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    componentDidMount() {
        this.closeMenu(this.props.pageWrapId, "64px", "6vh");
    }

    openMenu(pageWrapId, width, height) {
        let elms = document.getElementById(pageWrapId);

        elms.style.paddingLeft  = {width}
        elms.style.transform    = `translate3d(${width}, ${height}, 0px)`;
        elms.style.transition   = `all .15s ease 0s`;
    }

    closeMenu(pageWrapId, width, height) {
        let elms = document.getElementById(pageWrapId);

        elms.style.paddingLeft  = {width}
        elms.style.transform    = `translate3d(${width}, ${height}, 0px)`;
        elms.style.transition   = `all .15s ease 0s`;
    }
    
    render() {      
        return (
            <div>
                <Route render={({ location, history }) => (
                    <SideNav
                        onSelect={(selected) => {
                            const to = '/' + selected;
                            if (location.pathname !== to) {
                                history.push(to);
                            }
                        }}
                        onToggle={(isOpen) => {
                            if(isOpen) {
                                this.openMenu(this.props.pageWrapId, "320px", "6vh")
                            } else {
                                this.closeMenu(this.props.pageWrapId, "64px", "6vh")
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
                                    <div className="side_var-item-title">
                                        Report
                                    </div>
                                </NavText>
                                <NavItem eventKey="Report/Hospital">
                                    <NavText>
                                        <div className="side_var-item-text">
                                            Hospital
                                        </div>
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="Report/Department">
                                    <NavText>
                                        <div className="side_var-item-text">
                                           Department
                                        </div>
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="Report/Group">
                                    <NavText>
                                        <div className="side_var-item-text">
                                            Group
                                        </div>
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
                                    <div className="side_var-item-title">
                                        Setting
                                    </div>
                                </NavText>
                                <NavItem eventKey="Setting/Device">
                                    <NavText>
                                        <div className="side_var-item-text">
                                            Device
                                        </div>
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="Setting/Group">
                                    <NavText>
                                        <div className="side_var-item-text">
                                            Group
                                        </div>
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
                                    <div className="side_var-item-title">
                                        Analysis
                                    </div>
                                </NavText>
                                <NavItem eventKey="Analysis/Data">
                                    <NavText>
                                        <div className="side_var-item-text">
                                            Data
                                        </div>
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

class NavMenu extends Component {
    render() {
        return (
            <div className="nav_var-wrap">
                <Navbar className="nav_var">
                    <Navbar.Brand href="/">
                        <img
                            alt="ajust"
                            src={ImgLogo}

                            className="d-inline-block align-top nav_menu-logo"
                        />
                    </Navbar.Brand>
                    <Nav className="mr-auto nav_menu-items">
                        <Nav.Link className="nav_menu-item" href="/">Admin</Nav.Link>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}
export { SideMenu, NavMenu };

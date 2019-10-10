import React, { PureComponent } from 'react';


import { Navbar, Nav } from 'react-bootstrap';

import ImgLogo from './Images/Logo@3x.png';

class NavMenu extends PureComponent {
  render() {
    return (
      <div className="nav_var-wrap">
        <Navbar className="nav_var">
          <Navbar.Brand href="/">
            <img alt="ajust" src={ImgLogo} className="d-inline-block align-top nav_menu-logo" />
          </Navbar.Brand>

          <Nav className="mr-auto nav_menu-items">
            <Nav.Link className="nav_menu-item" href="/">
              Admin
            </Nav.Link>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default NavMenu;

import React from 'react';
import styled from 'styled-components';

import mediaConf from 'configure/mediaConfig';

import { Navbar, Nav } from 'react-bootstrap';

import ImgLogo from 'resource/Images/Logo@3x.png';

export default function Menu() {
  return (
    <Styled.Section>
      <Styled.Container>
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
      </Styled.Container>
    </Styled.Section>
  );
}

const Styled = {};

Styled.Section = styled.section`
  position: absolute;
  z-index: ${mediaConf.LAYOUT_DEFAULT_Z_INDEX};

  width: 100%;
  height: 58px;

  background-color: #e2e2e2;
`;

Styled.Container = styled.div`
  position: relative;

  width: 100%;
  height: 100%;

  max-width: ${mediaConf.MEDIA_WIDTH_DESKTOP_CONTENT};
  margin: 0 auto;

  @media all and (max-width: ${mediaConf.MEDIA_WIDTH_DESKTOP_CONTENT}) {
    padding: 0 ${mediaConf.MEDIA_WIDTH_DESKTOP_CONTENT_PADDING};
  }

  .nav_var {
    position: relative;
    height: 100%;
  }

  .navbar-brand {
    position: absolute;
  }

  .nav_menu-logo {
    width: 4vw;
    max-height: 58px;

    img {
      width: 100%;
    }
  }

  .nav_menu-items {
    display: table;
    position: absolute;
    right: 0;

    height: 100%;
  }

  .nav_menu-item {
    display: table-cell;
    vertical-align: middle;

    margin-left: 10%;

    font-size: 1.2vw;
    font-family: 'S-CoreDream-5';

    @media all and (min-width: ${mediaConf.MEDIA_WIDTH_DESKTOP_CONTENT}) {
      font-size: 18px;
    }

    color: #353b46 !important;
    text-decoration: none !important;
  }
`;

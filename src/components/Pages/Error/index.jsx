import React from 'react';
import styled from 'styled-components';

import mediaConf from 'configure/mediaConfig';

function ErrorResultBox() {
  return (
    <Styled.ErrorResultBoxWrap>
      <Styled.ErrorResultBox>
        <span className="error-text">Oops!</span>
        <br />
        <span className="error-code">404 - Page Not Found.</span>
      </Styled.ErrorResultBox>
    </Styled.ErrorResultBoxWrap>
  );
}

export default function Error() {
  return (
    <Styled.Section>
      <Styled.Container>
        <ErrorResultBox />
      </Styled.Container>
    </Styled.Section>
  );
}

const Styled = {};

Styled.Section = styled.section`
  position: absolute;
  top: 0;
  left: 0;

  background-color: #555d6b;

  width: 100%;
  height: 100vh;

  @media all and (max-width: ${mediaConf.MEDIA_WIDTH_DESKTOP_CONTENT}) {
    padding: 0vh ${mediaConf.MEDIA_WIDTH_DESKTOP_CONTENT_PADDING};
  }
`;

Styled.Container = styled.div`
  max-width: ${mediaConf.MEDIA_WIDTH_DESKTOP_CONTENT};
  margin: 0 auto;
`;

Styled.ErrorResultBoxWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

Styled.ErrorResultBox = styled.div`
  position: relative;

  text-align: center;

  font-family: 'S-CoreDream-7';

  .error-text {
    font-family: 'S-CoreDream-7';
    color: #1c1c1c;
    line-height: 1.3;
    font-size: 10em;
  }
  .error-code {
    font-family: 'S-CoreDream-7';
    color: #1c1c1c;
    font-size: 2em;
  }
`;

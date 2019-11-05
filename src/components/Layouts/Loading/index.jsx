import React from 'react';
import styled from 'styled-components';

import mediaConf from 'configure/mediaConfig';

import LoadingScreen from 'react-loading-screen';

export default function LoadingView() {
  const isLoading = true;
  return (
    <Styled.Section>
      <Styled.Container>
        <Styled.LoadingBox>
          <LoadingScreen
            loading={isLoading}
            bgColor="#555d6b"
            spinnerColor="#f1f1f1"
            textColor="white"
            text="Loading..."
          >
            Succecess.
          </LoadingScreen>
        </Styled.LoadingBox>
      </Styled.Container>
    </Styled.Section>
  );
}

const Styled = {};

Styled.Section = styled.section`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100vh;

  background-color: #555d6b;
`;

Styled.Container = styled.div`
  position: relative;

  width: 100%;
  height: 100%;

  max-width: ${mediaConf.MEDIA_WIDTH_DESKTOP_CONTENT};
  margin: 0 auto;
`;

Styled.LoadingBox = styled.div`
  position: relative;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  font-size: 1.5vw;
  line-height: 1.9;
  font-family: 'S-CoreDream-5';
`;

import React, { PureComponent } from 'react';
import LoadingScreen from 'react-loading-screen';

import imgLoading from './images/loading.gif';

import './Loading.scss';

class LoadingView extends PureComponent {
  render() {
    const isLoading = true;
    return (
      <div className="loading-section">
        <div className="loading-inner">
          <div className="loading-box">
            <LoadingScreen
              loading={isLoading}
              bgColor="#f1f1f1"
              spinnerColor="#f1f1f1"
              textColor="white"
              logoSrc={imgLoading}
              text="Loading..."
            >
            Succecess.
            </LoadingScreen>
          </div>
        </div>
      </div>
    );
  }
}

export default LoadingView;

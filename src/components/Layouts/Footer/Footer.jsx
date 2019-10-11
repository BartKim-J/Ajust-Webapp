import React, { PureComponent } from 'react';

import './Footer.scss';

class Footer extends PureComponent {
  render() {
    return (
      <div>
        <footer className="footer">
          <div className="title">
            <p>이것은 푸터입니다.</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;

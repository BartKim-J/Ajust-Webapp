/* eslint-disable no-unused-vars */
// Standard Include
import React from 'react';
import ReactDOM from 'react-dom';

// Components
import Root from './client/Root';

// Style Sheets
import './index.scss';

import * as ServiceWorker from './server/ServiceWorker';

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
ServiceWorker.unregister();

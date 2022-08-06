import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import './index.css';

import '../src/styles/utils.css';
import '../src/styles/core.css';
import '../src/styles/colors.css';
import '../src/styles/transitions.css';
import '../src/styles/half-fill.css';

ReactDOM.render(
	<StrictMode>
		<App />
	</StrictMode>,
	document.getElementById('root')
);

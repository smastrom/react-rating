import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

import './index.css';

import '../src/styles/utils.css';
import '../src/styles/core.css';
import '../src/styles/colors.css';
import '../src/styles/transitions.css';
import '../src/styles/half-fill.css';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);

root.render(<App />);

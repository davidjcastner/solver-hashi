// wraps the library for easy display in a web browser

import React from 'react';
import { render } from 'react-dom';
import { HashiSolver } from './index';

// construct a div for react to hook onto
const reactTarget = document.createElement('div');
reactTarget.setAttribute('id', 'react-target');
document.body.appendChild(reactTarget);

// render example components
render(<HashiSolver />, reactTarget);

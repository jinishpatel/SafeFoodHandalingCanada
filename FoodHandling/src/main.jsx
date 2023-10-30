/** @format */

import React from 'react';
// import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store.jsx';

const root = document.getElementById('root');
const reactRoot = createRoot(root);

reactRoot.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>,
);

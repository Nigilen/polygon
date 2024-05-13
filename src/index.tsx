// import './assets/images/file.jpg';
import style from './index.module.css';
import './index.css';
import { createRoot } from 'react-dom/client';
import { App } from './components/app/app';
import { Provider } from 'react-redux';
import store from './services/store';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

const rootNode = document.getElementById('root') as HTMLDivElement;

const root = createRoot(rootNode);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);

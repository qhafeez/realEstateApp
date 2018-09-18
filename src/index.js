import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {HashRouter} from "react-router-dom";
import registerServiceWorker from './registerServiceWorker';

import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import listingsReducer from "./store/reducers/listingReducer";



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
	listings:listingsReducer
});


const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));




ReactDOM.render(
	<Provider store={store}>
		<HashRouter>
			<App />
		</HashRouter>
	</Provider>, document.getElementById('root'));
registerServiceWorker();

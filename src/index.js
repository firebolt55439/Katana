import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './store/reducers';
import promise from 'redux-promise';
import App from './containers/App';
import {FIREBASE_AUTH_ENABLED, auth, firestore, provider} from './auth-enabled';
// Import main sass file to apply global styles
import './static/sass/style.scss';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

/* Start Firebase Authentication -- you can remove this block if you do not want Firebase Auth */
if (FIREBASE_AUTH_ENABLED) {
	auth.onAuthStateChanged(function(userObj) {
		if (!auth.currentUser) {
			auth.signInWithRedirect(provider);
		} else {
			console.log("Current user:", auth.currentUser);
		}
	});
}
/* End Firebase Authentication */

const app = (
   <Provider store={createStoreWithMiddleware(reducers)}>
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </Provider>
);

ReactDOM.render(app, document.getElementById('app'));

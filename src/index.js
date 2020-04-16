import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './store/reducers';
import promise from 'redux-promise';
import App from './containers/App';

import Swal from 'sweetalert2/src/sweetalert2.js';
import {FIREBASE_AUTH_ENABLED, auth, firestore, provider} from './auth-enabled';

// Import main sass file to apply global styles
import './static/sass/style.scss';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

/* Start Firebase Authentication -- you can remove this block if you do not want Firebase Auth */
if (FIREBASE_AUTH_ENABLED) {
	/* Define custom SWAL toast mix-in */
	const Toast = Swal.mixin({
	  toast: true,
	  position: 'top-end',
	  showConfirmButton: false,
	  timer: 2500,
	  timerProgressBar: true,
	  customClass: 'swal-toaster',
	  onOpen: (toast) => {
	    toast.addEventListener('mouseenter', Swal.stopTimer);
	    toast.addEventListener('mouseleave', Swal.resumeTimer);
	  },
	});

	/* Define our helper function to fetch the database secret with provided authorization */
	const attemptAuthorizedDatabaseAccess = () => {
		/* Attempt to read access token from database */
		firestore.collection("secrets").doc("secret").get().then((snapshot) => {
			/* Let user know they have been verified to access this information. */
			console.log(snapshot.data());
			Toast.fire({
			  icon: 'success',
			  title: 'Your authorization has been verified.'
			});
		}).catch((err) => {
			/* Let user know they do not have authorization to access. */
			console.log("Caught error:", err);
			Swal.fire({
			  icon: "error",
			  title: 'Unauthorized',
			  html: 'You are not authorized to access this. Redirecting to login...',
			  customClass: "swal-bigger",
			  onBeforeOpen: () => {
			    Swal.showLoading();
			  }
			});

			/* Sign them out and let them sign back in with a different account. */
			setTimeout(() => {
				auth.signOut().then(() => {
					auth.signInWithRedirect(provider);
				});
			}, 750);
		});
	};

	/* Define our authentication state change handler. */
	const authChangeHandler = (userObj) => {
		/* Let user know we are processing their authentication info */
		console.log("Current user:", auth.currentUser);
		Swal.fire({
		  title: 'Authorizing...',
		  html: 'Checking your access permissions...',
		  timer: 1000,
		  customClass: "swal-bigger",
		  onBeforeOpen: () => {
		    Swal.showLoading();
		  }
		});

		/* Process their authentication after a UI delay */
		setTimeout(attemptAuthorizedDatabaseAccess, 1000);
	};

	/* Listen for authentication state changes */
	auth.onAuthStateChanged(authChangeHandler);
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

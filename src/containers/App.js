import React, { Component } from 'react';
import Layout from './Layout';

import Swal from 'sweetalert2/src/sweetalert2.js';

import {FIREBASE_AUTH_ENABLED, auth, firestore, provider, analytics, logEvent, logCustomEvent } from '../auth-enabled';
import {AuthContext} from '../auth-context';

class App extends Component {
	state = {
		secret: null,
	};

	componentDidMount() {
		/* Start Firebase Authentication -- you can remove this block if you do not want Firebase Auth */
		const that = this;
		if (FIREBASE_AUTH_ENABLED) {
			/* Define custom SWAL toast mix-in */
			const Toast = Swal.mixin({
			  toast: true,
			  position: 'top-end',
			  showConfirmButton: false,
			  timer: 2200,
			  timerProgressBar: true,
			  customClass: 'swal-toaster',
			  onOpen: (toast) => {
			    toast.addEventListener('mouseenter', Swal.stopTimer);
			    toast.addEventListener('mouseleave', Swal.resumeTimer);
			  },
			});

			/* Define our helper function to fetch the database secret with provided authorization */
			const attemptAuthorizedDatabaseAccess = () => {
				/* Set user ID for analytics */
				if (auth.currentUser && auth.currentUser.email) {
					analytics.setUserId(btoa(auth.currentUser.email));
				}

				/* Attempt to read access token from database */
				firestore.collection("secrets").doc("secret").get().then((snapshot) => {
					/* Let user know they have been verified to access this information. */
					const userToken = snapshot.data()["secret"];
					this.setState({
						secret: userToken
					});
					Toast.fire({
					  icon: 'success',
					  title: 'Your authorization has been verified.'
					});
					logEvent("Login", "Success", {
						"name": auth.currentUser.displayName,
						"email": auth.currentUser.email
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
					logEvent("Login", "Failure", {
						"name": (auth.currentUser ? auth.currentUser.displayName : "<none>"),
						"email": (auth.currentUser ? auth.currentUser.email : "<none>")
					});
				});
			};

			/* Define our authentication state change handler. */
			const authChangeHandler = (userObj) => {
				/* Let user know we are processing their authentication info */
				console.log("Current user:", auth.currentUser);
				Swal.fire({
				  title: 'Authorizing...',
				  html: 'Checking your access permissions...',
				  timer: 700,
				  customClass: "swal-bigger",
				  onBeforeOpen: () => {
				    Swal.showLoading();
				  }
				});

				/* Process their authentication after a UI delay */
				setTimeout(attemptAuthorizedDatabaseAccess, 700);
			};

			/* Listen for authentication state changes */
			auth.onAuthStateChanged(authChangeHandler);
		}
		/* End Firebase Authentication */
	}

	render() {
		return (
			<AuthContext.Provider value={this.state.secret}>
				<Layout />
			</AuthContext.Provider>
		)
	}
}

export default App;

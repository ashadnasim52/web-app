import React, { useEffect } from 'react';
import firebase from 'firebase';
import { firebaseConfig } from './utils/firebase.config';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Header from './layout/Header';
import { useDispatch } from 'react-redux';
import { CHECKING_AUTH, SET_USER } from './actions/action.types';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
var app = firebase.initializeApp(firebaseConfig);

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				// User is signed in.
				var displayName = user.displayName;
				var email = user.email;
				var emailVerified = user.emailVerified;
				var photoURL = user.photoURL;
				var isAnonymous = user.isAnonymous;
				var uid = user.uid;
				var providerData = user.providerData;
				console.log({
					displayName,
					email,
					emailVerified,
					photoURL,
					uid,
					providerData,
				});
				dispatch({
					type: SET_USER,
					payload: {
						displayName,
						email,
						emailVerified,
						photoURL,
						uid,
						providerData,
					},
				});
			} else {
				dispatch({
					type: SET_USER,
					payload: null,
				});
			}

			dispatch({
				type: CHECKING_AUTH,
				payload: false,
			});
		});
	}, []);
	return (
		<>
			<ToastContainer
				position='bottom-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<Router>
				<Header />
				<Switch>
					<Route path='/signin'>
						<SignIn />
					</Route>
					<Route path='/'>
						<Home />
					</Route>
				</Switch>
			</Router>
		</>
	);
};

export default App;

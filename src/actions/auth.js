import firebase from 'firebase/app';
import 'firebase/auth';
import { toast } from 'react-toastify';
import { CHECKING_AUTH } from './action.types';

export const doSignIn = () => {
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase
		.auth()
		.signInWithPopup(provider)
		.then(function (result) {
			// This gives you a Google Access Token. You can use it to access the Google API.
			var token = result.credential.accessToken;
			// The signed-in user info.
			var user = result.user;
			toast('Signin successfull! ');
		})
		.catch(function (error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			toast(errorMessage, {
				type: 'error',
			});
			// The email of the user's account used.
			var email = error.email;
			// The firebase.auth.AuthCredential type that was used.
			var credential = error.credential;
			// ...
		});
};
export const doSignOut = async () => {
	firebase
		.auth()
		.signOut()
		.then(function () {
			toast('SignOut successfully! ', { type: 'dark' });
		})
		.catch(function (error) {
			toast('something wents wrong', {
				type: 'error',
			});
		});
};

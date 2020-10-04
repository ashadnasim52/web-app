import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { Container, Button } from 'reactstrap';
import { doSignIn } from '../actions/auth';
import { toast } from 'react-toastify';

import Login from '../assests/login.svg';
const SignIn = ({ auth }) => {
	const history = useHistory();
	if (auth.userData?.uid && !auth.isChecking) {
		toast('You are already authenticated! ');
		history.push('/');
	}
	return (
		<Container className='d-flex flex-column	align-items-center'>
			<h1 className='text-primary text-center mt-3'>
				Signin via google to get started
			</h1>
			<img src={Login} alt='' className='img-fluid img-login mt-3 mb-3' />
			<Button
				className='btn btn-primary mt-3 mb-5'
				color='primary'
				onClick={doSignIn}
			>
				Signin via Google{' '}
			</Button>
		</Container>
	);
};
const mapState = (state) => {
	return { auth: state.auth };
};

export default connect(mapState)(SignIn);

import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { Container, Button } from 'reactstrap';
import { doSignIn } from '../actions/auth';
import { toast } from 'react-toastify';
const SignIn = ({ auth }) => {
	const history = useHistory();
	if (auth.userData?.uid && !auth.isChecking) {
		toast('You are already authenticated! ');
		history.push('/');
	}
	return (
		<Container>
			<Button onClick={doSignIn}>Signin</Button>
		</Container>
	);
};
const mapState = (state) => {
	return { auth: state.auth };
};

export default connect(mapState)(SignIn);

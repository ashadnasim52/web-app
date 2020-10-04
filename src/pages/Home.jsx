import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Col, Container, Row, ListGroup, ListGroupItem } from 'reactstrap';

const Home = ({ auth }) => {
	const [order, setOrder] = useState([]);
	const history = useHistory();
	if (!auth.userData?.uid && !auth.isChecking) {
		toast('Please Signin again ');
		history.push('/signin');
	}
	const getData = async () => {
		const localData = await localStorage.getItem('data');
		console.log(localData);
		if (localData) setOrder(JSON.parse(localData));
		else toast('No local data found please add in this test app');
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<Container>
			<Row>
				<Col md='7'>
					<ListGroup>
						{order.map((singleOrder) => (
							<ListGroupItem>
								<div>
									<h1>{singleOrder.customer_name}</h1>
									<p>{singleOrder.customer_email}</p>
									<p>{singleOrder.product}</p>
									<p>{singleOrder.quantity}</p>
								</div>
								<div></div>
							</ListGroupItem>
						))}
					</ListGroup>
				</Col>
			</Row>
		</Container>
	);
};

const mapState = (state) => {
	return { auth: state.auth };
};

export default connect(mapState)(Home);

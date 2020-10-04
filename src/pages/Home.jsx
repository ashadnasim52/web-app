import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
	Col,
	Container,
	Row,
	ListGroup,
	ListGroupItem,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	FormGroup,
	Label,
	Input,
} from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import DummyData from '../utils/DummyData.json';
import Add from '../assests/add.svg';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { IoIosAddCircle } from 'react-icons/io';
const Home = ({ auth }) => {
	const [order, setOrder] = useState([]);
	const [itemToShow, setItemToShow] = useState(10);

	// form fields state
	const [customer_name, setCustomer_name] = useState('');
	const [customer_email, setCustomer_email] = useState('');
	const [product, setProduct] = useState('Product 1');
	const [quantity, setQuantity] = useState(0);
	const [id, setId] = useState(null);
	const history = useHistory();

	const [modal, setModal] = useState(false);

	const toggle = () => setModal(!modal);

	const getData = async () => {
		const localData = await localStorage.getItem('data');
		console.log(localData);
		if (localData) setOrder(JSON.parse(localData));
		else toast('No local data found please add in this test app');
	};

	const handleShowMore = () => {
		setItemToShow(itemToShow + 20);
	};

	useEffect(() => {
		getData();
	}, []);

	const addOrder = async () => {
		toggle();
		const updatedOrder = [
			{
				id: uuidv4(),
				customer_name,
				customer_email,
				product,
				quantity,
			},
			...order,
		];
		console.log(updatedOrder);
		setOrder(updatedOrder);
		await localStorage.setItem('data', JSON.stringify(updatedOrder));
		toast('Added your order', { type: 'info' });
	};

	const setFormtoUpdate = async (singleOrder) => {
		toggle();
		setId(singleOrder.id);
		setCustomer_email(singleOrder.customer_email);
		setCustomer_name(singleOrder.customer_name);
		setQuantity(singleOrder.quantity);
	};
	const updateOrder = async () => {
		toggle();
		const updatedOrder = {
			id,
			customer_name,
			customer_email,
			product,
			quantity,
		};

		console.log(updatedOrder);

		order.map((singleOrder) => {
			if (singleOrder.id === id) {
				singleOrder.customer_name = customer_name;
				singleOrder.customer_email = customer_email;
				singleOrder.product = product;
				singleOrder.quantity = quantity;
			}
		});

		toast('updated your order', { type: 'info' });
	};
	const deleteOrder = async (id) => {
		setOrder(order.filter((singleOrder) => singleOrder.id !== id));

		toast('deleted your order', { type: 'error' });
	};

	if (!auth.userData?.uid && !auth.isChecking) {
		toast('Please Signin again ');
		history.push('/signin');
	}
	return (
		<Container className='mt-3'>
			<Row>
				<Col md='7'>
					<ListGroup>
						{order.slice(0, itemToShow).map((singleOrder) => (
							<ListGroupItem
								className='d-flex  justify-content-around  align-items-center'
								key={singleOrder.id}
							>
								<div>
									<h4 className=' text-uppercase text-primary'>
										{singleOrder.customer_name}
									</h4>
									<div>{singleOrder.customer_email}</div>
									<div>
										<span className='text-muted'>Product:-</span>{' '}
										{singleOrder.product}
									</div>
									<div>
										{' '}
										<span className='text-muted'>Quantity:- </span>{' '}
										{singleOrder.quantity}
									</div>
								</div>

								<div className='d-flex'>
									<div>
										<AiOutlineEdit
											onClick={() => {
												setFormtoUpdate(singleOrder);
											}}
											className='icon text-primary mr-4'
										/>
									</div>
									<div>
										<AiOutlineDelete
											onClick={() => deleteOrder(singleOrder.id)}
											className='icon text-danger'
										/>
									</div>
								</div>
							</ListGroupItem>
						))}
					</ListGroup>
					<div className='text-center'>
						<Button
							className='btn btn-primary mt-3 mb-5'
							color='primary'
							onClick={handleShowMore}
						>
							Show more!
						</Button>
					</div>
				</Col>
				<Col className='d-flex flex-column	align-items-center'>
					<h1 className='text-primary text-center mt-3'>
						Some new order to add?{' '}
					</h1>
					<img src={Add} alt='' className='img-fluid mt-3 mb-3' />
					<Button
						className='btn btn-primary mt-3 mb-5'
						color='primary'
						onClick={toggle}
					>
						Add New Order
					</Button>
				</Col>
			</Row>

			<Modal isOpen={modal} toggle={toggle} closeTimeoutMS={500}>
				<ModalHeader toggle={toggle}>
					<span className='text-center text-primary'>
						{id ? 'Update Order' : 'Add Order'}
					</span>
				</ModalHeader>
				<ModalBody>
					<Form>
						<FormGroup>
							<Label for='name'>Customer Name</Label>
							<Input
								type='text'
								name='name'
								id='name'
								onChange={(e) => setCustomer_name(e.target.value)}
								value={customer_name}
								placeholder='Enter your customer name'
							/>
						</FormGroup>
						<FormGroup>
							<Label for='email'>Customer Email</Label>
							<Input
								type='email'
								name='email'
								id='email'
								onChange={(e) => setCustomer_email(e.target.value)}
								value={customer_email}
								placeholder='Enter your customer email'
							/>
						</FormGroup>
						<FormGroup>
							<Label for='exampleSelect'>Product</Label>
							<Input
								type='select'
								name='select'
								id='exampleSelect'
								onChange={(e) => setProduct(e.target.value)}
							>
								<option>Product 1</option>
								<option>Product 2</option>
								<option>Product 3</option>
							</Input>
						</FormGroup>
						<FormGroup>
							<Label for='quantity'>Quantity</Label>
							<Input
								type='number'
								name='quantity'
								id='quantity'
								onChange={(e) => setQuantity(e.target.value)}
								value={quantity}
								placeholder='Enter your quantity'
							/>
						</FormGroup>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button
						color='primary'
						onClick={() => {
							if (id) updateOrder();
							else addOrder();
						}}
					>
						{id ? 'Update Order' : 'Add Order'}
					</Button>{' '}
					<Button color='secondary' onClick={toggle}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</Container>
	);
};

const mapState = (state) => {
	return { auth: state.auth };
};

export default connect(mapState)(Home);

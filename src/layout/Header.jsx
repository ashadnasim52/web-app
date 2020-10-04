import React, { useState } from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	NavbarText,
	Button,
} from 'reactstrap';
import { connect } from 'react-redux';
import { doSignOut } from '../actions/auth';
import { Link } from 'react-router-dom';

const Header = ({ auth }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div>
			<Navbar color='info' dark expand='md'>
				<NavbarBrand tag={Link} to='/'>
					reactstrap
				</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav
						className='w-100 d-flex justify-content-end align-items-center'
						navbar
					>
						<NavItem>
							<NavbarText className='text-white'>
								{auth?.userData?.displayName}
							</NavbarText>
							<img
								className='rounded-circle rounded-sm mr-4 ml-4'
								src={auth?.userData?.photoURL}
								alt=''
								style={{
									height: 40,
								}}
							/>
						</NavItem>

						{!auth.isChecking && (
							<>
								{auth?.userData ? (
									<NavItem onClick={doSignOut}>
										<Button className='btn btn-danger' color='danger'>
											Log Out
										</Button>
									</NavItem>
								) : (
									<NavItem>
										<Button
											tag={Link}
											to='/signin'
											className='btn btn-info'
											color='info'
										>
											{' '}
											Sign In Now
										</Button>
									</NavItem>
								)}
							</>
						)}
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
};

const mapState = (state) => {
	return { auth: state.auth };
};

export default connect(mapState)(Header);

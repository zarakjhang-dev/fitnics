import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { toast } from "react-toastify";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../assets/images/FITNICS-cropped.jpg"

const Header = () => {
	const { userInfo } = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [logoutApiCall] = useLogoutMutation();

	const logoutHandler = async () => {
		try {
			await logoutApiCall().unwrap();
			dispatch(logout());
			navigate("/");
			toast.success("Logout Successfully!");
		} catch (err) {
			console.error(err);
		}
	};

	const location = useLocation();
	const [activeLink, setActiveLink] = useState(location.pathname);
	const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

	const handleLinkClick = (url) => {
		setActiveLink(url);
		if (isMobileMenuOpen) {
			setMobileMenuOpen(false);
		}
	};

	const handleMobileMenuToggle = () => {
		setMobileMenuOpen(!isMobileMenuOpen);
	};

	const NavLink = ({ to, children }) => {
		const isActive = location.pathname === to;
		return (
			<Nav.Link
				as={Link}
				to={to}
				className={isActive ? "active" : ""}>
				{children}
			</Nav.Link>
		);
	};

	return (
		<Navbar
			bg="white"
			expand="md">
			<Container>
				<Navbar.Brand
					as={Link}
					to="/">
					<img
						src={Logo}
						alt="logo"
						style={{
							width: "100px",
						}}
					/>
				</Navbar.Brand>
				<Navbar.Toggle
					aria-controls="responsive-navbar-nav"
					onClick={handleMobileMenuToggle}>
					{isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
				</Navbar.Toggle>
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						<NavLink to="/">
							<Button variant="outline-success">
								Home
							</Button>
						</NavLink>
						<NavLink to="/pages/features">
							<Button variant="outline-success">
								Features
							</Button>
						</NavLink>
						<NavLink to="/pages/workouts">
							<Button variant="outline-success">
								Workout Database
							</Button>
						</NavLink>
						<NavLink to="/pages/workoutplans">
							<Button variant="outline-success">
								Workout Plans
							</Button>
						</NavLink>
						<NavLink to="/pages/nutrition-checker">
							<Button variant="outline-success">
								Nutrition Checker
							</Button>
						</NavLink>
						<NavLink to="/pages/bmr-calculator">
							<Button variant="outline-success">
								BMR
							</Button>
						</NavLink>
						<NavLink to="/pages/about">
							<Button variant="outline-success">
								About
							</Button>
						</NavLink>
					</Nav>
					<Nav>
						{userInfo ? (
							<NavDropdown
								title={<span style={{ color: '#4ded2d' }}>{userInfo.name}</span>}
								id="username">
								<NavDropdown.Item
									as={Link}
									to="/pages/profile">
									Profile
								</NavDropdown.Item>
								<NavDropdown.Item onClick={logoutHandler}>
									Logout
								</NavDropdown.Item>
							</NavDropdown>
						) : (
							<>
								<Nav.Link
									as={Link}
									to="/pages/register">
									Register
								</Nav.Link>
								<Nav.Link
									as={Link}
									to="/pages/login">
									Login
								</Nav.Link>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;

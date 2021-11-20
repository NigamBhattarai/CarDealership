import React from "react";
import "./header.scss";
import {Nav, NavDropdown, Navbar, Container} from 'react-bootstrap';
import {Link, useLocation as Location} from 'react-router-dom';

function HeaderView() {
    return Location().pathname
}  

function Header() {
    return (
        <React.Fragment>
                <Navbar sticky="top" className="navbar-header" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/"><img src="/images/cobra-logo.png" alt="Car Cobra" width="30" height="30" className="mx-2" /> Cars Cobra</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} className={`navbar-link ${(HeaderView()==="/")?"active":""}`} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} className={`navbar-link ${(HeaderView()==="/arrivals")?"active":""}`} to="/arrivals">Arrivals</Nav.Link>
                        <NavDropdown title="Contact" id="basic-nav-dropdown">
                        <NavDropdown.Item className={`${(HeaderView()==="/contact")?"active":""}`} as={Link} to="/contact">Contact us</NavDropdown.Item>
                        <NavDropdown.Item className={`${(HeaderView()==="/about")?"active":""}`} as={Link} to="/about">About us</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
                </Navbar>
        </React.Fragment>
    );
}
export default Header;
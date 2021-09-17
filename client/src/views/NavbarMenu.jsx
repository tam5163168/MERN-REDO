import { AuthContext } from "context/AuthContext";
import React, { useContext } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavbarMenu() {
    // Context
    const {authState: { user: {username} }, logoutUser} = useContext(AuthContext)

    // Function
    const logout = () => logoutUser()
    
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link to="/dashboard" as={Link}>
                            Dashboard
                        </Nav.Link>
                        <Nav.Link to="/about" as={Link}>
                            About
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link disabled>Welcome { username }</Nav.Link>
                        <Button variant="info" onClick={logout}>Logout</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarMenu;

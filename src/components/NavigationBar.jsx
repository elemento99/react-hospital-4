import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

function NavigationBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Hospital Salvador</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/team">Nuestro equipo</Nav.Link>
          <Nav.Link as={Link} to="/appointments">Agenda tu cita</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;

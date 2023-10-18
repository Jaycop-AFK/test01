import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { GoAlert } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom"
import About from '../pages/About'
import  './styles/text.css'
import  Product from '../pages/Product'
import Home from '../pages/Home'
import Pagination from 'react-js-pagination';
import axios from 'axios';



function Navbarr() {
  const navigate = useNavigate()
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>

        <Link className='navbar-brand' to='/Home' >
          NavLogo
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            <Nav.Link href="/Home" to="/Home">Home</Nav.Link>

            <Link className='navbar-brand' to='/About'>
            <Nav.Link href="#link">about</Nav.Link>
              </Link>

              <Link className='navbar-brand' to='/' >
                Test
              </Link>

              <Link className='navbar-brand' to='/Product' >
                Product
              </Link>

            <NavDropdown title="Workshop" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => navigate('/hospital')}> hospital data(Pagination)</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => navigate('/category')}>
                News (CRUD)
              </NavDropdown.Item>

             

            </NavDropdown>
            <GoAlert />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbarr;
import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {Navbar,Nav, NavDropdown,Form,FormControl,Button} from 'react-bootstrap';
import firebaseContext from '../../Firebase';
const Header = () =>{

    return(
        <header>
            <Navbar bg="dark" expand="lg" variant="dark">
            <Navbar.Brand href="/admin" >Interface administrateur de NOM DU MAGASIN</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
                <Form inline>
                {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button> */}
                </Form>
            </Navbar.Collapse>
            </Navbar>
        </header>
    )
}

export default Header;
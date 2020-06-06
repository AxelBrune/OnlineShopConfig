import React, { useContext,useState, Fragment } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {Navbar,Nav, NavDropdown,Form,FormControl,Button} from 'react-bootstrap';
import {firebaseContext} from '../../Firebase';
import {Helmet} from 'react-helmet'
const Header = () =>{
    const firebase = useContext(firebaseContext);
    const [shopName, setShopName] = useState("");
    firebase.db.collection("ShopName").doc("shop").get()
    .then(function(doc){
        setShopName(doc.data().name);
    });
    return(
        <Fragment>
            <Helmet>
                <title>{shopName}</title>
            </Helmet>
            <header>
            <Navbar bg="dark" expand="lg" variant="dark">
            <Navbar.Brand href="/admin" >Interface administrateur de {shopName}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
                <Form inline>
                {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button> */}
                <Button variant="outline-success" href="/">Accéder au site</Button>
                </Form>
            </Navbar.Collapse>
            </Navbar>
        </header>
        </Fragment>
    )
}

export default Header;
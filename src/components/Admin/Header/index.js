import React, { useContext,useState, Fragment } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {Navbar,Nav, NavDropdown,Form,FormControl,Button} from 'react-bootstrap';
import {firebaseContext} from '../../Firebase';
import {Helmet} from 'react-helmet'
const Header = () =>{
    const firebase = useContext(firebaseContext);
    const [shopName, setShopName] = useState("");
    const [headerColor, setHeaderColor] = useState("");
    firebase.db.collection("ShopName").doc("shop").get()
    .then(function(doc){
        setShopName(doc.data().name);
    });

    const styles={
        headerBack: {
            backgroundColor: headerColor
        }
    }

    firebase.db.collection("customization").doc("color").get()
    .then(function(doc){
        setHeaderColor(doc.data().headerBackground);
    })

    return(
        
        <Fragment>
            <Helmet>
                <title>{shopName}</title>
            </Helmet>
            <header id="adminheader">
            <Navbar expand="lg" variant="dark" id="navAdmin" style={styles.headerBack}>
            <Navbar.Brand href="/admin/home" >Interface administrateur de {shopName}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
                <Form inline>
                {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button> */}
                <Button variant="outline-success" href="/connect">Accéder au site</Button>
                </Form>
            </Navbar.Collapse>
            </Navbar>
        </header>
        </Fragment>
    )
}

export default Header;
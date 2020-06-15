import React, {useContext, useState, Fragment} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {Navbar,Nav,Form,FormControl,Button} from 'react-bootstrap';
import {firebaseContext} from "../../Firebase";
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
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
    
        firebase.db.collection("headerBackground").doc("back").get()
        .then(function(doc){
            setHeaderColor(doc.data().color);
        })

    return(
        <Fragment>
            <Helmet>
                <title>{shopName}</title>
            </Helmet>
            <header>
                <Navbar /*bg="dark"*/ expand="lg" variant="dark" style={styles.headerBack}>
                <Navbar.Brand href="/" >{shopName}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
                </Navbar>
            </header>
        </Fragment>
    )
}

export default Header;
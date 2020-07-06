import React, {useContext, useState, Fragment, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {Navbar,Nav,Form,FormControl,Button, Modal} from 'react-bootstrap';
import {firebaseContext} from "../../Firebase";
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
const Header = (props) =>{
    const firebase = useContext(firebaseContext);
    const [shopName, setShopName] = useState("");
    const [headerColor, setHeaderColor] = useState("");
    const [search, setSearch] = useState("");

    const [userMail, setUserMail] = useState(props.mail);
    const [userPassword, setUserPassword] = useState(props.password);
    const [userId, setUserId] = useState(props.ident);
    const [userCart, setUserCart] = useState(props.cart);
    
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


    const handleDisconnect = () => {
        setUserMail("");
        setUserPassword("");
    }


    return(
        <Fragment>
            
            <Helmet>
                <title>{shopName}</title>
            </Helmet>
            <header>
                <Navbar /*bg="dark"*/ expand="lg" variant="dark" style={styles.headerBack}>
                <Link to={{pathname: `/`, state: {mail: userMail, password: userPassword, ident: userId, cart: userCart}}}><Navbar.Brand href="/" >{shopName}</Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2"
                        value={search} onChange={e => setSearch(e.target.value)}
                    />
                    <Link to={`/search/${search}`}><Button variant="outline-success">Search</Button></Link>
                    &nbsp;&nbsp;
                    {
                        userMail  && userPassword ? <Fragment><Link to={{pathname: `/cart/${userId}`, state: {mail: userMail, password: userPassword, ident: userId, cart: userCart}}}><Button>{userMail}</Button></Link>&nbsp;&nbsp;<Button onClick={handleDisconnect}>Deconnexion</Button></Fragment> 
                        : 
                        <Link to="/connect"><Button>Se connecter / Créer un compte</Button></Link> 
                    }
                    </Form>
                </Navbar.Collapse>
                </Navbar>
            </header>
        </Fragment>
    )
}

export default Header;
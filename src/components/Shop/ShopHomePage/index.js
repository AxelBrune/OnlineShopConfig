import React,{Fragment, useState, useContext, useEffect} from 'react';
import Header from "../Header";
import Footer from "../Footer";
import {firebaseContext} from "../../Firebase";
import 'bootstrap/dist/css/bootstrap.css';
import { Card, Container, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ShopHomePage(){

    const firebase = useContext(firebaseContext);
    const [shopName, setShopName] = useState("");
    const [products, setProducts] = useState([]);
    const [ids, setIds] = useState([]);
    firebase.db.collection("ShopName").doc("shop").get()
        .then(function(doc){
            setShopName(doc.data().name);
        });
    
    const fetchProducts = () =>{
        firebase.getProducts()
        .then(snapshot =>{
            const elements = snapshot.docs.map(doc => doc);
            // const id = snapshot.docs.map(el => el.id);

            setProducts(products.concat(elements));
            //setProducts(products => [...products, elements]);
        })
        .catch(error => console.log(error))
    }

    useEffect(()=>{
        fetchProducts();
    },[])
    return(
        <Fragment>
            <Header/>
            <center><h1>Bienvenue sur {shopName}</h1></center><br/>
            <h3>Liste des produits</h3> <br/>
            <div>
                <Container>
                    <Row>
                    {
                        products.map(item =>(
                                <Col xs="12" md="4" sm="12">
                                    <Card style={{width : '18rem'}}>
                                    <Card.Img variant="top" src={item.data().imageURL} width="288px" heigth="400px"/>
                                    <Card.Body>
                                        <Card.Title>{item.data().productName}</Card.Title>
                                    <Card.Text>
                                        <Container>
                                            <Row>
                                                <Link to={`/product/${item.id}`} style={{ color: 'white' }}><Button variant="success">Voir l'offre</Button></Link>&nbsp;&nbsp; {`${item.data().price} €`}
                                            </Row>
                                        </Container>
                                        
                                    </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                        ))
                    }
                    </Row>
                </Container>
            </div>
            <Footer />
        </Fragment>
    )
}

export default ShopHomePage;
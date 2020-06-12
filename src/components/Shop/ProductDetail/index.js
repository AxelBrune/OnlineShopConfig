import React, {Fragment, useState, useContext, useEffect} from 'react'
import Header from "../Header"
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Container, Row, Col, Image, Card} from 'react-bootstrap';
import {firebaseContext} from "../../Firebase";
const ProductDetail = (props) => {

    const firebase = useContext(firebaseContext);
    const [product, setProduct] = useState("");

    useEffect(()=>{
        var ref=firebase.db.collection("products").doc(`${props.match.params.id}`);

        ref.get().then(function(doc){
            if(doc.exists){
                console.log("Réussi");
                setProduct(doc.data());
            }else{
                console.log("Pas de document");
            }
        }).catch(function(err){
            console.log("Erreur : ", err);
        })
    }, [])

    return(
        <Fragment>
            <Header/>
            <Container>
                <Row>
                    <Col>
                        <center><Image src={product.imageURL} rounded width="300px" height="400px"/></center>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <center><h1>{`${product.productName}`}</h1></center>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <Card.Body className="text-center">
                                {product.description}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
        
    )
}

export default ProductDetail;
import React, {Fragment, useState, useEffect, useContext} from "react";
import Header from "../Header";
import FooterProduct from "../FooterProduct";
import {firebaseContext} from "../../Firebase";
import 'bootstrap/dist/css/bootstrap.css';
import {Button, Container, Row, Col, Image, ListGroup, Form, Card} from 'react-bootstrap';
import {AiFillDelete} from "react-icons/ai";
import {BsCreditCard} from "react-icons/bs";
const UserCart = (props) => {
    const firebase = useContext(firebaseContext);
    const [pseudo, setPseudo] = useState("");
    const {mail, password, ident, cart} = props.location.state;
    const [userMail, setUserMail] = useState(mail);
    const [userPassword, setUserPassword] = useState(password);
    const [userId, setUserId] = useState(ident);
    const [userCart, setUserCart] = useState(cart);
    const [cartDatas, setCartDatas] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    useEffect(()=>{
        firebase.db.collection("users").doc(`${props.match.params.id}`).get()
        .then(function(doc){
            if(doc.exists){
                setPseudo(doc.data().pseudo);
            }
        })
        .catch(function(error){
            console.log("Erreur lors de la récupération du pseudo : ", error);
        })
    }, [])

    useEffect(()=>{
        firebase.db.collection("cart").doc(`${userCart}`).get()
        .then(function(doc){
            if(doc.exists){
                setCartDatas(doc.data().products);
                setCartTotal(doc.data().total);
                console.log("Produits du panier : ",doc.data().products);
                console.log("Total du panier : ",doc.data().total);
            }else{
                console.log("Pas de panier");
            }
        })
        console.log(cartDatas);
    }, [])

    const handleBuy = e => {
        e.preventDefault();
        var order = firebase.db.collection("orders").doc();
        var dt=new Date();
        order.set({
            date: dt,
            products: cartDatas
        })
       .then(function(){
            console.log("Commande enregistrée");
           
        })
        .catch(function(err){
            console.log("Erreur : ", err);
        })
    }
    return(
        <Fragment>
            <Header mail={userMail} password={userPassword} ident={userId} cart={userCart}/>
            <h1>{pseudo}, voici votre panier : </h1>
            <ListGroup>
            {
                cartDatas.map(item =>(
                    <ListGroup.Item>
                        <Container>
                            <Row>
                                <Col><Image src={item.imageURL} height="200px" width="200px" /></Col>
                                <Col><h1>{item.productName}</h1></Col>
                                <Col>Quantité : <h1>{item.quantity}</h1></Col>
                                <Col>Prix : <h1>{parseInt(item.price) * parseInt(item.quantity)} €</h1></Col>
                            </Row>
                        </Container>
                    </ListGroup.Item>
                ))
            }
            </ListGroup>
            <Container>
                <Row>
                    <Col md={{offset: 7}}>
                        <h1>Total : {cartTotal} €</h1>
                    </Col>
                    <Col>
                        <Button onClick={handleBuy}>Acheter</Button>
                    </Col>
                </Row>
            </Container>
            <FooterProduct />
        </Fragment>
    )
}

export default UserCart;
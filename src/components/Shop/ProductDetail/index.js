import React, {Fragment, useState, useContext, useEffect} from 'react'
import Header from "../Header";
import FooterProduct from "../FooterProduct"
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Container, Row, Col, Image, Card} from 'react-bootstrap';
import {firebaseContext} from "../../Firebase";
import {AiOutlineShoppingCart} from "react-icons/ai";
const ProductDetail = (props) => {

    const firebase = useContext(firebaseContext);
    const [product, setProduct] = useState("");
    const {mail, password, ident, cart} = props.location.state;
    const [userMail, setUserMail] = useState(mail);
    const [userPassword, setUserPassword] = useState(password);
    const [userId, setUserId] = useState(ident);
    const [userCart, setUserCart] = useState(cart);
    const [userProducts, setUserProducts] = useState(["Test", "Testo"]);
    const [cartId, setCartId] = useState("");

    const [panier, setPanier] = useState([]);
    const [quantity, setQuantity] = useState(1);


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

    useEffect(()=>{
        //Récupération du panier actuel
        firebase.db.collection("users").doc(`${userId}`).get()
        .then(function(doc){
            if (doc.exists){
                const i=doc.data().cart;
                setCartId(i);
                console.log("Id du panier : ", cartId);
            }           
        })
        .catch(function(error){
            console.log("Erreur lors de la récupération du panier de l'utilisateur : ", error);
        })
    },[])

    const addToCart = (userProducts) => {
        firebase.db.collection("cart").doc(cartId).get()
        .then(function(doc){
            if(doc.exists){
                console.log("Panier avant : ", doc.data().products);
                setPanier(doc.data().products);
                var ref=firebase.db.collection("cart").doc(cartId);
                var tot = doc.data().total+(parseInt(product.price)*quantity);
                console.log(tot);
                const produits = doc.data().products;
                product.quantity=quantity;
                produits.push(product);
                console.log(produits);
                return ref.update({
                    products: produits,
                    total: tot
                })
                .then(function(){
                    window.location.reload(false);
                })
                .catch(function(err){
                    console.log(err);
                })
            }
        })
        console.log("Panier : ", panier);
        
    }

    return(
        <Fragment>
            <Header mail={userMail} password={userPassword} ident={userId} cart={userCart}/>
            <Container style={{marginTop: "2em"}}>
                <Row>
                    <Col>
                        <Image src={product.imageURL} fluid width="300px" height="400px"/>
                    </Col>
                    <Col>
                        <Row>
                            <Col md={{offset:4}}>
                                <h1>{`${product.productName}`}</h1>
                            </Col>
                        </Row>
                        <br /><br/>
                        <Row>
                            <Col>
                                <Card>
                                    <Card.Body className="text-center">
                                        <h3>Description du produit : </h3>
                                        {product.description}
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md={{span: 5}}>
                                <h2>Prix : {product.price} €</h2>
                            </Col>
                            <Col>
                                <input type="text" value={quantity} onChange={e => setQuantity(e.target.value)} />&nbsp;&nbsp;
                            </Col> 
                            <Col>
                                <Button variant= "success" onClick={e => addToCart(userProducts)}><AiOutlineShoppingCart/> Ajouter au panier</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>                
            </Container>
            <FooterProduct />
        </Fragment>
        
    )
}

export default ProductDetail;
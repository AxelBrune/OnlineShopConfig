import React,{Fragment, useState, useContext, useEffect} from 'react';
import Header from "../Header";
import Footer from "../Footer";
import {firebaseContext} from "../../Firebase";
import 'bootstrap/dist/css/bootstrap.css';
import {Container, Row, Col, Card, Form, Button, Modal, ProgressBar} from 'react-bootstrap';
function ShopHomePage(){

    const firebase = useContext(firebaseContext);
    const [shopName, setShopName] = useState("");
    const [products, setProducts] = useState([]);
    firebase.db.collection("ShopName").doc("shop").get()
        .then(function(doc){
            setShopName(doc.data().name);
        });
    
    const fetchProducts = () =>{
        firebase.getProducts()
        .then(snapshot =>{
            const elements = snapshot.docs.map(doc => doc.data());
             setProducts(products.concat(elements));
            //setProducts(products => [...products, elements]);
            console.log(products);
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
                <ul>
                    {
                        products.map(item =>(<li>{item.productName}</li>))
                    }
                </ul>
            </div>
            <Footer />
        </Fragment>
    )
}

export default ShopHomePage;
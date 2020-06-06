import React,{Fragment, useState, useContext} from 'react';
import Header from "../Header";
import Footer from "../Footer";
import {firebaseContext} from "../../Firebase";

function ShopHomePage(){

    const firebase = useContext(firebaseContext);
    const [shopName, setShopName] = useState("");

    firebase.db.collection("ShopName").doc("shop").get()
        .then(function(doc){
            setShopName(doc.data().name);
        });

    return(
        <Fragment>
            <Header/>
            <center><h1>Bienvenue sur {shopName}</h1></center><br/>
            <h3>Liste des produits</h3> <br/>
            <Footer />
        </Fragment>
    )
}

export default ShopHomePage;
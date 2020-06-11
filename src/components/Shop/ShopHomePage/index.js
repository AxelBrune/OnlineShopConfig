import React,{Fragment, useState, useContext, useEffect} from 'react';
import Header from "../Header";
import Footer from "../Footer";
import {firebaseContext} from "../../Firebase";
import 'bootstrap/dist/css/bootstrap.css';
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
                <ul>
                    {
                        products.map(item =>(<li key={item.id}>{item.data().productName}</li>))
                    }
                </ul>
            </div>
            <Footer />
        </Fragment>
    )
}

export default ShopHomePage;
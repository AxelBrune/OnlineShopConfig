import React,{Fragment} from 'react';
import Header from "../Header";
import Footer from "../Footer";
function ShopHomePage(){
    return(
        <Fragment>
            <Header/>
            <center><h1>Bienvenue sur NOM DU MAGASIN</h1></center><br/>
            <h3>Liste des produits</h3> <br/>
            <Footer />
        </Fragment>
    )
}

export default ShopHomePage;
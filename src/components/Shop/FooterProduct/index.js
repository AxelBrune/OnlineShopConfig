import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import { MDBFooter } from 'mdbreact';
import {firebaseContext} from "../../Firebase";
const FooterProduct = () => {
    const firebase = useContext(firebaseContext);
    const [headerColor, setHeaderColor] = useState("#343a40");

    firebase.db.collection("customization").doc("color").get()
        .then(function(doc){
            setHeaderColor(doc.data().footerBackground);
        })

    const styles={
        footerBack: {
            backgroundColor: headerColor
        }
    }

    return(
        <MDBFooter id="foot" style={styles.footerBack} className="fixed-bottom">
            <center>
            Site géré par l'outil &copy;OnlineShopConfig
            </center> <br />
            <center>
                <Link to="/admin" id="footlink">Accéder à l'espace d'administration</Link>
            </center>
        </MDBFooter>
    )
}

export default FooterProduct;
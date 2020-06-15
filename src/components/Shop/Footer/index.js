import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import { MDBFooter } from 'mdbreact';
import {firebaseContext} from "../../Firebase";
const Footer = () => {
    const firebase = useContext(firebaseContext);
    const [headerColor, setHeaderColor] = useState("#343a40");

    firebase.db.collection("footerBackground").doc("back").get()
        .then(function(doc){
            setHeaderColor(doc.data().color);
        })

    const styles={
        footerBack: {
            backgroundColor: headerColor
        }
    }

    return(
        <MDBFooter id="foot" style={styles.footerBack}>
            <center>
            Site géré par l'outil &copy;OnlineShopConfig
            </center> <br />
            <center>
                <Link to="/admin" id="footlink">Accéder à l'espace d'administration</Link>
            </center>
        </MDBFooter>
    )
}

export default Footer;
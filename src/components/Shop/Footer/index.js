import React from 'react';
import {Link} from 'react-router-dom';
import { MDBFooter } from 'mdbreact';
const Footer = () => {
    return(
        <MDBFooter id="foot">
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
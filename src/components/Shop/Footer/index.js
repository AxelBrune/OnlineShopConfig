import React from 'react';
import {Link} from 'react-router-dom';
const Footer = () => {
    return(
        <footer>
            <center>
                Site géré par l'outil &copy;OnlineShopConfig
            </center> <br />
            <center>
                <Link to="/admin" >Accéder à l'espace d'administration</Link>
            </center>
        </footer>
    )
}

export default Footer;
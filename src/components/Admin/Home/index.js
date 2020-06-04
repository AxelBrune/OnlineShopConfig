import React,{Fragment, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Container, Row, Col, Button} from 'react-bootstrap';
import Header from '../Header';
const Home = () =>{

    const [shopName, setShopName] = useState('NOM DU MAGASIN');

    return(
        <Fragment>
            <Header />
            <Container>
                <Row>
                    <Col md={{span: 5}}>
                       <br /> <h2>Changer le nom du magasin</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <input type="text" value={shopName} onChange={e=> setShopName(e.target.value)}/>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default Home;
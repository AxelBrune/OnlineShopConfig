import React, {Fragment, useState, useContext, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Card, Container, Button, Col, Row, Form, Modal} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from "../Header";
import FooterProduct from "../FooterProduct";
import {firebaseContext} from "../../Firebase";
const Connection = () => {
    const firebase = useContext(firebaseContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [connected, setConnected] = useState(false);
    const [showError, setShowError] = useState(false);
    const [ident, setIdent] = useState("");
    const [cart, setCart] = useState("");

    useEffect(()=>{
        firebase.db.collection("users").where("mail", "==", email).where("password", "==", password).get()
        .then(function(querySnapshot){
            if(!querySnapshot.empty){
                querySnapshot.forEach(function(doc){
                    console.log(doc.id, " => ", doc.data());
                    setEmail(doc.data().mail);
                    setPassword(doc.data().password);
                    setIdent(doc.id);
                    setCart(doc.data().cart);
                    setConnected(true);
                });
            }
            else{
                setConnected(false);
            }
        })
    }, [email, password])

    const handleClose = () => {
        setShowError(false);
    }

    return (
        <Fragment>
            <Modal show={showError} onHide={handleClose}>
                <Modal.Title>Erreur lors de la connexion</Modal.Title>
                <Modal.Body>
                    Mot de passe ou adresse mail incorrects. Veuillez rééssayer .
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>Fermer</Button>
                </Modal.Footer>
            </Modal>
            <Header />
            <Container style={{marginTop: "2em"}}>
                <Row>
                    <Col md={{span: 6, offset: 3}}>
                        <Card>
                            <Card.Header className="text-center"><h1>Se Connecter</h1></Card.Header>
                            <Card.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Email : </Form.Label>
                                    <Form.Control type="text" placeholder="email@email.com" value={email} onChange={e => setEmail(e.target.value)}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Mot de passe : </Form.Label>
                                    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password"/>
                                </Form.Group>
                                <h3>Pas encore inscrit ? <Link to="/subscribe">Inscrivez-vous</Link></h3>
                            </Form>
                            </Card.Body>
                            <Card.Footer class="text-center">
                                 {
                                    connected ? <Link to={{pathname: '/', state: {mail: email, password: password, ident: ident, cart: cart}}}><Button>Se connecter</Button></Link> : <Button disabled>Se connecter</Button>
                                 }
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <FooterProduct/>
        </Fragment>
    )
}

export default Connection;
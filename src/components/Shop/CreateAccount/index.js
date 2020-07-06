import React, {Fragment, useState, useContext} from "react";

import 'bootstrap/dist/css/bootstrap.css';
import {Form,Button, Modal, Alert, Card, Container, Col, Row} from 'react-bootstrap';
import Header from "../Header";
import {firebaseContext} from "../../Firebase";

const CreateAccount = () => {

    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmed, setConfirmed] = useState(false);
    const [pseudo, setPseudo] = useState("");

    const firebase = useContext(firebaseContext);

    const handleClick = e =>{
        e.preventDefault();
         if (password === confirmPassword){
             console.log("Connect");
             var user = firebase.db.collection("users").doc();
             user.set({
                 mail,
                 password,
                 pseudo
             })
            .then(function(){
                 console.log("Utilisateur bien inscrit");
                 setMail("");
                 setPassword("");
                 setConfirmPassword("");
                 setConfirmed(true);
                
             })
             .catch(function(err){
                 console.log("Erreur lors de l'inscription de l'utilisateur : ", err);
             })
         }


    }

    const handleClose = () => {
        setConfirmed(false);
    }

    return (
        <Fragment>
            <Modal show={confirmed} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Votre inscription a été validé</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert variant="success">Vous êtes bien inscrit ! Vous pouvez maintenant vous connecter sur le site</Alert>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>Fermer</Button>
                </Modal.Footer>
            </Modal>
            <Header />
            <center><h1 style={{marginTop: "2em"}}>Créer un compte</h1></center> <br />
            <Container>
                <Row>
                    <Col md={{span: 4, offset: 4}}>
                    <Card>
                        <Card.Body>
                                <Form>
                                <Form.Group>
                                    <Form.Label>Adresse mail</Form.Label>
                                    <Form.Control type="email" placeholder="email@email.com" value={mail} onChange={e => setMail(e.target.value)}/> 
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Pseudo : </Form.Label>
                                    <Form.Control type="text" placeholder="pseudo" value={pseudo} onChange={e => setPseudo(e.target.value)}/> 
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Mot de passe : </Form.Label>
                                    <Form.Control type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/> 
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Répéter le mot de passe : </Form.Label>
                                    <Form.Control type="password" placeholder="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/> 
                                </Form.Group>
                                <Button onClick={handleClick}>S'inscrire</Button>
                            </Form>
                            {
                                confirmed ? <Modal>

                                </Modal> : <p></p>
                            }
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default CreateAccount;
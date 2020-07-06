import React, {Fragment, useEffect, useContext, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Card, Table, Button, Modal, Form} from 'react-bootstrap';
import Header from "../Header";
import {firebaseContext} from "../../Firebase";
import {BsPencil} from 'react-icons/bs';
import {FaEraser} from "react-icons/fa";
import {BsPlus} from "react-icons/bs" ;
import { IconContext } from "react-icons";
const ReducCode = () => {

    const firebase = useContext(firebaseContext);

    const [codes, setCodes] = useState([]);
    const [modifCode, setModifCode] = useState("");
    const [modifValue, setModifValue] = useState("");
    const [showModifModal, setShowModifModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedId, setSelectedId] = useState("");

    const fetchCodes = () => {
        firebase.getCodes()
        .then(snapshot =>{
            const elements = snapshot.docs.map(doc => doc);
            setCodes(codes.concat(elements));
        })
        .catch(error => console.log(error))
    }

    useEffect(()=>{
        fetchCodes();
    }, [])

    const handleModif = (choice) => {
        console.log("Modification ", choice.id);
        setModifCode(choice.data().code);
        setModifValue(choice.data().value);
        setSelectedId(choice.id)
        setShowModifModal(true);
    }


    const handleErase = (choice) => {
        console.log("Suppression : ", choice);
        firebase.deleteCode(choice);
    }

    const handleClose = () => {
        setShowModifModal(false);
        setShowAddModal(false);
    }

    const handleCodeModif = e => {
        var ref=firebase.db.collection("Reduc").doc(selectedId);
        return ref.update({
            code: modifCode,
            value: modifValue
        })
        .then(function(){
            setShowModifModal(false);
            setModifCode("");
            setModifValue("");
            window.location.reload(false);
        })
        .catch(function(err){
            console.log(err);
        })
    }

    const addCode = () => {
        setShowAddModal(true);
    }

    const handleAddCode = e => {
        e.preventDefault();
        var reduc = firebase.db.collection("Reduc").doc();
        reduc.set({
            code: modifCode,
            value: modifValue
        })
        .then(function(){
            console.log("Code bien ajouté");
            setModifCode("");
            setModifValue("");
            handleClose();
            window.location.reload(false);
        })
        .catch(function(err){
            console.log("Erreur lors de l'ajout : ", err);
        })
    }

    return(
        <Fragment>
            <Modal show={showModifModal} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Modifier un code de réduction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Code</Form.Label>
                            <Form.Control type="text" placeholder="REDUC10" value={modifCode} onChange={e=>setModifCode(e.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Réduction (en €)</Form.Label>
                            <Form.Control type="text" placeholder="10" value={modifValue} onChange={e=>setModifValue(e.target.value)}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCodeModif}>Modifier</Button>
                    <Button onClick={handleClose}>Fermer</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showAddModal} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Ajouter un code de réduction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Code</Form.Label>
                            <Form.Control type="text" placeholder="REDUC10" value={modifCode} onChange={e=>setModifCode(e.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Réduction (en €)</Form.Label>
                            <Form.Control type="text" placeholder="10" value={modifValue} onChange={e=>setModifValue(e.target.value)}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleAddCode}>Ajouter</Button>
                    <Button onClick={handleClose}>Fermer</Button>
                </Modal.Footer>
            </Modal>
            <Header />
            <center><h1>Gestion des codes de réduction</h1></center>
            <br /> <br />
            <Card>
                <Card.Body>
                    <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Code</th>
                        <th>Réduction (en €)</th>
                        <th>Modifier</th>
                        <th>Supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {                        
                            codes.map(
                                item => (
                                    <tr key={item.id}>
                                        <td>{item.data().code}</td>
                                        <td>{item.data().value}</td>
                                        <IconContext.Provider value={{color: "blue"}}>
                                            <td><button onClick={() => handleModif(item)}><BsPencil/></button></td>
                                        </IconContext.Provider>
                                        <IconContext.Provider value={{color: "red"}}>
                                            <td><button onClick={() => handleErase(item.id)}><FaEraser /></button></td>
                                        </IconContext.Provider>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                    </Table>
                </Card.Body>
                <Card.Footer className="text-right">
                    <IconContext.Provider value={{color: "white", size: "2em"}}>
                        <Button onClick={addCode}><BsPlus/>Ajouter un code</Button>
                    </IconContext.Provider>
                </Card.Footer>
            </Card>
        </Fragment>
    )
}

export default ReducCode;


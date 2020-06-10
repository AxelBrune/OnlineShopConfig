import React,{Fragment, useState, useEffect, useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Container, Row, Col, Card, Form, Button, Modal, ProgressBar} from 'react-bootstrap';
import Header from '../Header';
import {firebaseContext} from "../../Firebase";
import CreateProduct from "../CreateProduct";
const Home = () =>{
    const firebase = useContext(firebaseContext);    
    const [shopName, setShopName] = useState("");
    const [nameChanged,setNameChanged] = useState(false);

    //States correspondant à un produit à ajouter 
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageURL, setImageUrl] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [done, setDone] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{
        firebase.db.collection("ShopName").doc("shop").get()
        .then(function(doc){
            setShopName(doc.data().name);
            setNameChanged(false);
        });
    },[nameChanged])

    const changeName = e =>{
        e.preventDefault();
        firebase.db.collection("ShopName").doc("shop").update({name:shopName});
        setNameChanged(true);
    }

    const handleChange = e => {
        if (e.target.files[0]){
            const targ = e.target.files[0];
            setImage(targ);
        }
    }

    const handleSubmit = e =>{
        e.preventDefault();
        const uploadTask = firebase.storage.ref(`images/${productName}`).put(image);
        uploadTask.on('state_changed',
            (snapshot) =>{
                const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100);
                setProgress(prog);
            },
            (error) => {
                console.log(error);
            },
            () => {
                firebase.storage.ref('images').child(productName).getDownloadURL()
                .then(ur => {
                    console.log(ur);
                    setImageUrl(ur);
                })
            })
        if(progress === 100 && image !== null){
            var product = firebase.db.collection("products").doc();
            product.set({
                description,
                imageURL,
                price,
                productName
            })
            .then(function(){
                console.log("Produit bien ajouté");
                handleShow();
                setDescription("");
                setPrice("");
                setProductName("");
                setImage(null);
                setProgress(0);
                setImageUrl(null);
            })
            .catch(function(err){
                console.log("Erreur lors de l'ajout : ", err);
            })
        }
    }

    return(
        <Fragment>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Ajout de votre produit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Votre produit a bien été ajouté !
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>Fermer</Button>
                </Modal.Footer>
            </Modal>
            <Header />
            <Container>
                <Row>
                    <Col>
                        <Card className="text-center" bg="secondary" text="white">
                            <Card.Header>
                                <h2>Changer le nom du magasin</h2>
                            </Card.Header>
                            <Card.Body>
                            <form onSubmit={changeName}>
                                <input type="text" value={shopName} onChange={e=> setShopName(e.target.value)}/>
                                <button className="btn btn-primary">Changer</button>
                            </form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                    <h1>TABLE</h1>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col md={{span:6}}>                    
                        <Card bg="secondary" text="white">
                            <Card.Header className="text-center">
                                <h2>Ajouter un produit</h2>
                            </Card.Header>
                            <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Nom du produit</Form.Label>
                                    <Form.Control type="text" placeholder="Produit" value={productName}
                                        onChange={e => setProductName(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Description du produit</Form.Label>
                                    <Form.Control as="textarea" rows="3"  placeholder="Description ..."
                                        value={description} onChange={e =>setDescription(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Prix (en €) </Form.Label>
                                    <Form.Control type="text" placeholder="5.32"
                                        value={price} onChange={e => setPrice(e.target.value)}
                                    />
                                </Form.Group>
                                    {/* <CreateProduct /> */}
                                    <Form.Label>Ajouter une image</Form.Label> <br/>
                                    <input type="file" onChange={handleChange} />
                                    {progress > 0 && progress < 100 ? <Fragment>
                                        <ProgressBar striped variant="success" animated now={progress}  label={`${progress}%`}/><br/>
                                        </Fragment> : <p></p>}
                                    {/* { progress ===100 ? 
                                        <Fragment>
                                            <br/>
                                            <h5>Votre image : </h5>
                                            <img src={imageURL || 'http://via.placeholder.com/400x300'} height="300" width="400"/>
                                            <br />
                                        </Fragment> : <p></p>} */}
                                    <Button variant="success" type="submit">
                                    Ajouter
                                </Button>
                            </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default Home;
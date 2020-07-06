import React,{Fragment, useState, useEffect, useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Container, Row, Col, Card, Form, Button, Modal, ProgressBar, Table} from 'react-bootstrap';
import Header from '../Header';
import {firebaseContext} from "../../Firebase";
import {BsPencil} from 'react-icons/bs';
import {FaEraser} from "react-icons/fa";
import { IconContext } from "react-icons";
import {SketchPicker} from "react-color";
import { Link } from 'react-router-dom';

const Home = () =>{

    return(
        <Fragment>
            <Header />
            <Container className="mt-5">
                <Row>
                    <Col md={{span:6}}>
                        <Card className="text-center" bg="secondary" text="white">
                            <Card.Header>
                                <h2>Personnalisation</h2>
                            </Card.Header>
                            <Card.Body>
                                <Link to="/admin/custom"><Button varinat="info">Personnaliser le site</Button></Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={{span:6}}>
                        <Card className="text-center" bg="success" text="white">
                            <Card.Header>
                                <h2>Gérer les produits</h2>
                            </Card.Header>
                            <Card.Body>
                                <Link to="/admin/products"><Button variant="info">Accéder à la gestion des produits</Button></Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <br /><br/>
                <Row>
                    <Col md={{span:6}}>
                        <Card className="text-center" bg="danger" text="white">
                            <Card.Header>
                                <h2>Gérer les utilisateurs</h2>
                            </Card.Header>
                            <Card.Body>
                                <Link to="/admin/users"><Button variant="info">Accéder à la gestion des utilisateurs</Button></Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={{span:6}}>
                        <Card className="text-center" bg="warning" text="white">
                            <Card.Header>
                                <h2>Gérer les promotions</h2>
                            </Card.Header>
                            <Card.Body>
                                <Link to="/admin/reduc"><Button variant="info">Accéder à la gestion des promotions</Button></Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
    // const firebase = useContext(firebaseContext);    
    // const [shopName, setShopName] = useState("");
    // const [nameChanged,setNameChanged] = useState(false);

    // //States correspondant à un produit à ajouter 
    // const [productName, setProductName] = useState('');
    // const [description, setDescription] = useState('');
    // const [price, setPrice] = useState('');
    // const [imageURL, setImageUrl] = useState('');
    // const [image, setImage] = useState(null);
    // const [progress, setProgress] = useState(0);
    // const [show, setShow] = useState(false);


    // const [showIdModal, setShowIdModal] = useState(false);
    // const [selectedId, setSelectedId] = useState("");
    // const [modifName, setModifName] = useState("");
    // const [modifDesc, setModifDesc] = useState("");
    // const [modifPrice, setModifPrice] = useState("");

    // const [products, setProducts] = useState([]);

    // const [headerBackground,setHeaderBackground] = useState("#343a40");
    // const [footerBackground,setFooterBackground] = useState(() => {
    //     firebase.db.collection("footerBackground").doc("back").get()
    //     .then(function(doc){
    //         setFooterBackground(doc.data().color)
    //     })
    // });
    // const [showHeaderPicker, setShowHeaderPicker] = useState(false);
    // const [showFooterPicker, setShowFooterPicker] = useState(false);
    // firebase.db.collection("ShopName").doc("shop").get()
    //     .then(function(doc){
    //         setShopName(doc.data().name);
    //     });


    // useEffect(()=>{
    //     firebase.db.collection("headerBackground").doc("back").get()
    //     .then(function(doc){
    //         setHeaderBackground(doc.data().color)
    //     });
    // }, [])

    // useEffect(() => {
    //     firebase.db.collection("footerBackground").doc("back").get()
    //     .then(function(doc){
    //         setFooterBackground(doc.data().color)
    //     });
    // }, [])

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    //  useEffect(()=>{
    //      firebase.db.collection("ShopName").doc("shop").get()
    //      .then(function(doc){
    //          setShopName(doc.data().name);
    //          setNameChanged(false);
    //      });
    //  },[nameChanged])

    

    // const changeName = e =>{
    //     e.preventDefault();
    //     firebase.db.collection("ShopName").doc("shop").update({name:shopName});
    //     setNameChanged(true);
    // }

    // const handleChange = e => {
    //     if (e.target.files[0]){
    //         const targ = e.target.files[0];
    //         setImage(targ);
    //     }
    // }

    // const handleSubmit = e =>{
    //     e.preventDefault();
    //     const uploadTask = firebase.storage.ref(`images/${productName}`).put(image);
    //     uploadTask.on('state_changed',
    //         (snapshot) =>{
    //             const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100);
    //             setProgress(prog);
    //         },
    //         (error) => {
    //             console.log(error);
    //         },
    //         () => {
    //             firebase.storage.ref('images').child(productName).getDownloadURL()
    //             .then(ur => {
    //                 console.log(ur);
    //                 setImageUrl(ur);
    //             })
    //         })
    //     if(progress === 100 && image !== null){
    //         var product = firebase.db.collection("products").doc();
    //         product.set({
    //             description,
    //             imageURL,
    //             price,
    //             productName
    //         })
    //         .then(function(){
    //             console.log("Produit bien ajouté");
    //             handleShow();
    //             setDescription("");
    //             setPrice("");
    //             setProductName("");
    //             setImage(null);
    //             setProgress(0);
    //             setImageUrl(null);
    //             window.location.reload(false);
    //         })
    //         .catch(function(err){
    //             console.log("Erreur lors de l'ajout : ", err);
    //         })
    //     }
    // }

    // const handleHeaderColor = (col) => {
    //     setHeaderBackground(col.hex);
    //     firebase.db.collection("headerBackground").doc("back").update({color: col.hex});

    // }

    // const handleFooterColor = (col) => {
    //     setFooterBackground(col.hex);
    //     firebase.db.collection("footerBackground").doc("back").update({color: col.hex})
    // }

    // return(
    //     <Fragment>
    //         <Modal show={show} onHide={handleClose}>
    //             <Modal.Header>
    //                 <Modal.Title>Ajout de votre produit</Modal.Title>
    //             </Modal.Header>
    //             <Modal.Body>
    //                 Votre produit a bien été ajouté !
    //             </Modal.Body>
    //             <Modal.Footer>
    //                 <Button onClick={handleClose}>Fermer</Button>
    //             </Modal.Footer>
    //         </Modal>

    //         <Header />
    //         <Container>
    //             <Row>
    //                 <Col>
    //                     <Card className="text-center" bg="secondary" text="white">
    //                         <Card.Header>
    //                             <h2>Changer le nom du magasin</h2>
    //                         </Card.Header>
    //                         <Card.Body>
    //                         <form onSubmit={changeName}>
    //                             <input type="text" value={shopName} onChange={e => setShopName(e.target.value)} id="shopName"/>
    //                             <button className="btn btn-primary">Changer</button>
    //                         </form>
    //                         </Card.Body>
    //                     </Card>
    //                 </Col>
    //                 <Col>
    //                     <Card bg="white" text="dark">                            
    //                         <Card.Header>
    //                             <h2>Gérer les articles</h2>
    //                         </Card.Header>
    //                         <Card.Body>
    //                             <Table striped bordered hover size="sm">
    //                                 <thead>
    //                                     <tr>
    //                                     <th>Nom du produit</th>
    //                                     <th>Prix</th>
    //                                     <th>Modifier</th>
    //                                     <th>Supprimer</th>
    //                                     </tr>
    //                                 </thead>
    //                                 <tbody>
    //                                     {
    //                                         products.map(
    //                                             item =>(
    //                                             <tr key={item.id}>
    //                                                 <td>{item.data().productName}</td>
    //                                                 <td>{item.data().price}</td>
    //                                                 <IconContext.Provider value={{color: "blue"}}>
    //                                                      <td><button onClick={() => handleModif(item)}><BsPencil/></button></td>
    //                                                 </IconContext.Provider>
    //                                                 <IconContext.Provider value={{color: "red"}}>
    //                                                     <td><button onClick={() => handleErase(item.id)}><FaEraser /></button></td>
    //                                                 </IconContext.Provider>
    //                                             </tr>
    //                                             ))
    //                                     }
    //                                 </tbody>
    //                             </Table>
    //                         </Card.Body>
    //                     </Card>
    //                 </Col>
    //             </Row>
    //             <br/>
    //             <Row>
    //                 <Col md={{span:6}}>                    
    //                     <Card bg="secondary" text="white">
    //                         <Card.Header className="text-center">
    //                             <h2>Ajouter un produit</h2>
    //                         </Card.Header>
    //                         <Card.Body>
    //                         <Form onSubmit={handleSubmit}>
    //                             <Form.Group>
    //                                 <Form.Label>Nom du produit</Form.Label>
    //                                 <Form.Control type="text" placeholder="Produit" value={productName}
    //                                     onChange={e => setProductName(e.target.value)}
    //                                 />
    //                             </Form.Group>
    //                             <Form.Group>
    //                                 <Form.Label>Description du produit</Form.Label>
    //                                 <Form.Control as="textarea" rows="3"  placeholder="Description ..."
    //                                     value={description} onChange={e =>setDescription(e.target.value)}
    //                                 />
    //                             </Form.Group>
    //                             <Form.Group>
    //                                 <Form.Label>Prix (en €) </Form.Label>
    //                                 <Form.Control type="text" placeholder="5.32"
    //                                     value={price} onChange={e => setPrice(e.target.value)}
    //                                 />
    //                             </Form.Group>
    //                                 {/* <CreateProduct /> */}
    //                                 <Form.Label>Ajouter une image</Form.Label> <br/>
    //                                 <input type="file" onChange={handleChange} />
    //                                 {progress > 0 && progress < 100 ? <Fragment>
    //                                     <ProgressBar striped variant="success" animated now={progress}  label={`${progress}%`}/><br/>
    //                                     </Fragment> : <p></p>}
    //                                 {/* { progress ===100 ? 
    //                                     <Fragment>
    //                                         <br/>
    //                                         <h5>Votre image : </h5>
    //                                         <img src={imageURL || 'http://via.placeholder.com/400x300'} height="300" width="400"/>
    //                                         <br />
    //                                     </Fragment> : <p></p>} */}
    //                                 <Button variant="success" type="submit">
    //                                 Ajouter
    //                             </Button>
    //                         </Form>
    //                         </Card.Body>
    //                     </Card>
    //             </Col>
    //             <Col>
    //                 <Row>
    //                 <h2>Changer la couleur du header </h2>&nbsp;&nbsp;
    //                 <Button onClick={() => setShowHeaderPicker(true)} style={{backgroundColor: headerBackground}}>Changer</Button>
    //                 <Modal show={showHeaderPicker} onHide={() => setShowHeaderPicker(false)}>
    //                     <Modal.Header>Changer la couleur du Header</Modal.Header>
    //                     <Modal.Body>
    //                         <SketchPicker color={headerBackground} onChange={handleHeaderColor} onChangeComplete={handleHeaderColor} />
    //                     </Modal.Body>
    //                     <Modal.Footer>
    //                         <Button onClick={() => setShowHeaderPicker(false)}>Fermer et Sauver</Button>
    //                     </Modal.Footer>
    //                 </Modal>
    //                 </Row>
    //                 <br />
    //                 <Row>
    //                 <h2>Changer la couleur du footer </h2>&nbsp;&nbsp;
    //                 <Button onClick={() => setShowFooterPicker(true)} style={{backgroundColor: footerBackground}}>Changer</Button>
    //                     <Modal show={showFooterPicker} onHide={() => setShowFooterPicker(false)}>
    //                         <Modal.Header>Changer la couleur du Footer</Modal.Header>
    //                         <Modal.Body>
    //                             <SketchPicker color={headerBackground} onChange={handleFooterColor} onChangeComplete={handleFooterColor} />
    //                         </Modal.Body>
    //                         <Modal.Footer>
    //                             <Button onClick={() => setShowFooterPicker(false)}>Fermer et Sauver</Button>
    //                         </Modal.Footer>
    //                     </Modal>
    //                 </Row>                    
    //             </Col>
    //             </Row>
    //         </Container>
    //     </Fragment>
    // )
}

export default Home;
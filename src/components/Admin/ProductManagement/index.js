import  React,{Fragment, useContext, useState, useEffect}from 'react';
import Header from "../Header";
import {firebaseContext} from "../../Firebase";
import 'bootstrap/dist/css/bootstrap.css';
import {Card, Form, Modal, Button, Container, Row, Col, Table, Spinner} from 'react-bootstrap';
import {BsPencil} from 'react-icons/bs';
import {FaEraser} from "react-icons/fa";
import { IconContext } from "react-icons";
import Select from "react-select";
const ProductManagement = () => {
    
    const firebase = useContext(firebaseContext);
    const [showAdd, setShowAdd] = useState(false);
    const [showBundle, setShowBundle] = useState(false);

    //state produit
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState("");
    const [img, setImg] = useState(null);
    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(false);

    //state de modification
    const [showModModal, setShowModModal] = useState(false);
    const [selectedId, setSelectedId] = useState("");
    const [modifName, setModifName] = useState("");
    const [modifDesc, setModifDesc] = useState("");
    const [modifPrice, setModifPrice] = useState("");

    const [selectedProducts, setSelectedProducts] = useState(null);

    const handleClose = () => {
        setShowAdd(false);
    }

    const handleCloseBundle = () =>{
        setShowBundle(false);
    }

    const fetchProducts = () =>{
        firebase.getProducts()
        .then(snapshot =>{
            const elements = snapshot.docs.map(doc => doc);
            setProducts(products.concat(elements));
        })
        .catch(error => console.log(error))
    }

    useEffect(()=>{
        fetchProducts();
    },[])

    const handleProduct = e => {
        e.preventDefault();
        const uploadTask = firebase.storage.ref(`image/${name}`).put(img);
        uploadTask.on('state_changed',
            (snapshot) =>{
                const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100);
                console.log(prog, "%");
                setLoading(true);
            },
            (error) => {
                console.log(error);
            },
            () => {
                firebase.storage.ref('image').child(name).getDownloadURL()
                .then(ur => {
                    console.log(ur);
                    var product = firebase.db.collection("products").doc();
                    product.set({
                        description: desc,
                        price,
                        productName : name,
                        imageURL: ur
                    })
                    .then(function(){
                        console.log("Produit bien ajouté");
                        setDesc("");
                        setPrice("");
                        setName("");
                        setImg(null);
                        setLoading(false);
                        handleClose();
                        window.location.reload(false);
                    })
                    .catch(function(err){
                        console.log("Erreur lors de l'ajout : ", err);
                    })
                })
            })
        
    }

    const handleModif = (choice) =>{
        console.log("Modification ", choice.id);
        setModifName(choice.data().productName);
        setModifDesc(choice.data().description);
        setModifPrice(choice.data().price);
        setSelectedId(choice.id);
        setShowModModal(true);
    }

    
    const handleErase = (choice) =>{
         console.log("Suppression : ", choice);
         firebase.deleteProduct(choice);
    }

    const handleCloseModif = () => {
        setShowModModal(false);
        setModifDesc("");
        setModifName("");
        setModifPrice("");
    }

    const confirmModif = () => {
        console.log(selectedId);
        var ref=firebase.db.collection("products").doc(selectedId);
        return ref.update({
            description: modifDesc,
            price: modifPrice,
            productName: modifName
        })
        .then(function(){
            setShowModModal(false);
            setModifPrice("");
            setModifDesc("");
            setModifName("");
            window.location.reload(false);
        })
        .catch(function(err){
            console.log(err);
        })
    }

    const handleChangeFiles = e => {
        if(e.target.files[0]){
            const targ= e.target.files[0];
            setImg(targ);
        }
    }

    const handleBundle = e => {
        e.preventDefault();
        const uploadTask = firebase.storage.ref(`image/${name}`).put(img);
        uploadTask.on('state_changed',
            (snapshot) =>{
                const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100);
                console.log(prog, "%");
                setLoading(true);
            },
            (error) => {
                console.log(error);
            },
            () => {
                firebase.storage.ref('image').child(name).getDownloadURL()
                .then(ur => {
                    console.log(ur);
                    var product = firebase.db.collection("products").doc();
                    product.set({
                        description: desc,
                        price,
                        productName : name,
                        imageURL: ur,
                        components: selectedProducts
                    })
                    .then(function(){
                        console.log("Produit bien ajouté");
                        setDesc("");
                        setPrice("");
                        setName("");
                        setImg(null);
                        setLoading(false);
                        setSelectedProducts([]);
                        handleClose();
                        window.location.reload(false);
                    })
                    .catch(function(err){
                        console.log("Erreur lors de l'ajout : ", err);
                    })
                })
            })                 
    }

    const handleBundleProduct =  selectedProducts => {
        setSelectedProducts(selectedProducts);
        console.log(`Option selected:`, selectedProducts);
    }

    const options = 
        products.map(
            item => (
                {   
                    value: item.id,
                    label : item.data().productName
                }
            )
        )

    return (
        <Fragment>
            <Header/>
            <Modal show={showAdd} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Ajouter un produit {loading ? <Spinner animation="border" variant="warning" /> : <p></p>}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nom du produit</Form.Label>
                            <Form.Control type="text" placeholder="Nom" value={name} onChange={e=>setName(e.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description du produit</Form.Label>
                            <Form.Control type="text" placeholder="Description ..." value={desc} onChange={e=>setDesc(e.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Prix du produit</Form.Label>
                            <Form.Control type="text" placeholder="5.00" value={price} onChange={e=>setPrice(e.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Ajouter une image</Form.Label>
                            <input type="file" /*multiple*/ onChange={handleChangeFiles}/>
                        </Form.Group> 
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleProduct}>Ajouter</Button>
                    <Button onClick={handleClose}>Fermer</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showBundle} onHide={handleCloseBundle}>
                <Modal.Header>
                    <Modal.Title>Ajouter un lot {loading ? <Spinner animation="border" variant="warning" /> : <p></p>}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nom du lot</Form.Label>
                            <Form.Control type="text" placeholder="Lot" value={name} onChange={e => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description du lot</Form.Label>
                            <Form.Control type="text" placeholder="Lot de ..." value={desc} onChange={e => setDesc(e.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Prix du lot (en €)</Form.Label>
                            <Form.Control type="text" placeholder="5.00" value={price} onChange={e => setPrice(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Éléménts du lot </Form.Label>
                            <Select options={options} isMulti value={selectedProducts} onChange={handleBundleProduct}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Ajouter une image</Form.Label> <br />
                            <input type="file" /*multiple*/ onChange={handleChangeFiles}/>
                        </Form.Group> 
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleBundle}>Ajouter</Button>
                    <Button onClick={handleCloseBundle}>Fermer</Button>
                </Modal.Footer>
            </Modal>
            
            <Modal show={showModModal} onHide={handleCloseModif}>
                <Modal.Header>
                    <Modal.Title>Modifier un produit (remplissez les champs que vous souhaitez modifier)</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Control type="text" placeholder="Produit" value={modifName} onChange={e => setModifName(e.target.value)}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control as="textarea" rows="3"  placeholder="Description" value={modifDesc} onChange={e =>setModifDesc(e.target.value)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="text" placeholder="5.00" value={modifPrice} onChange={e => setModifPrice(e.target.value)} />
                            </Form.Group>
                        </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={confirmModif}>Modifier</Button>
                    <Button variant="danger" onClick={handleCloseModif}>Fermer</Button>
                </Modal.Footer>
            </Modal>
            
            <Container className="mt-5">
                <Row>
                    <Col md={{span: 6}}>
                        <Card bg="secondary" text="white">
                            <Card.Header className="text-center"><h2>Ajout d'un produit</h2></Card.Header>
                            <Card.Body className="text-center">
                                <Button onClick={e => setShowAdd(true)} variant="info">Ajouter un produit</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={{span: 6}}>
                        <Card bg="warning" text="white">
                            <Card.Header className="text-center"><h2>Création d'un lot</h2></Card.Header>
                            <Card.Body className="text-center">
                                <Button onClick={e => setShowBundle(true)} variant="info">Créer un lot</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <br/><br/>
                <Row>
                    <Col md={{span:12}}>
                    <Card bg="white" text="dark">                            
                        <Card.Header className="text-center"><h2>Liste des produits</h2></Card.Header>
                        <Card.Body>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                    <th>Nom du produit</th>
                                    <th>Prix</th>
                                    <th>Modifier</th>
                                    <th>Supprimer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.map(
                                            item =>(
                                            <tr key={item.id}>
                                                <td>{item.data().productName}</td>
                                                <td>{item.data().price}</td>
                                                <IconContext.Provider value={{color: "blue"}}>
                                                    <td><button onClick={() => handleModif(item)}><BsPencil/></button></td>
                                                </IconContext.Provider>
                                                <IconContext.Provider value={{color: "red"}}>
                                                    <td><button onClick={() => handleErase(item.id)}><FaEraser /></button></td>
                                                </IconContext.Provider>
                                            </tr>
                                            ))
                                    }
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default ProductManagement;
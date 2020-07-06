import  React,{Fragment, useContext, useState, useEffect}from 'react';
import Header from "../Header";
import {firebaseContext} from "../../Firebase";
import 'bootstrap/dist/css/bootstrap.css';
import {Card, Form, Modal, Button, Container, Row, Col, Table} from 'react-bootstrap';
import {SketchPicker} from "react-color";
const Customization = () => {

    const [shopName, setShopName] = useState("");
    const firebase = useContext(firebaseContext);
    const [showHeaderPicker, setShowHeaderPicker] = useState(false);
    const [showFooterPicker, setShowFooterPicker] = useState(false);
    const [nameChanged,setNameChanged] = useState(false);

    useEffect(()=>{
        firebase.db.collection("ShopName").doc("shop").get()
        .then(function(doc){
            setShopName(doc.data().name);
        });
    }, [nameChanged])

    const changeName = e => {
        e.preventDefault();
        firebase.db.collection("ShopName").doc("shop").update({name:shopName});
        setNameChanged(!nameChanged);
    }

    const [footerBackground,setFooterBackground] = useState(() => {
        firebase.db.collection("customization").doc("color").get()
        .then(function(doc){
            setFooterBackground(doc.data().footerBackground)
        })
    });

    const [headerBackground,setHeaderBackground] = useState(() => {
        firebase.db.collection("customization").doc("color").get()
        .then(function(doc){
            setHeaderBackground(doc.data().headerBackground)
        })
    });

    const handleHeaderColor = (col) => {
            setHeaderBackground(col.hex);
            firebase.db.collection("customization").doc("color").update({headerBackground: col.hex});
    }

    const handleFooterColor = (col) => {
        setFooterBackground(col.hex);
        firebase.db.collection("customization").doc("color").update({footerBackground: col.hex})
    }

    return(
        <Fragment>
            <Header />
            <Container>
                <Row className="text-center">
                    <Col md={{span:6}}>
                        <Card className="text-center" bg="secondary" text="white">
                            <Card.Header>
                                <h2>Changer le nom du magasin</h2>
                            </Card.Header>
                            <Card.Body>
                                <form onSubmit={changeName}>
                                    <input type="text" value={shopName} onChange={e => setShopName(e.target.value)} id="shopName"/> &nbsp;&nbsp;
                                    <button className="btn btn-primary">Changer</button>
                                </form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col >
                        <Card bg="secondary" text="white">
                            <Card.Header><h2>Couleurs du header et du footer</h2></Card.Header>
                        <Card.Body>
                        <Row>
                            <Col md={{offset: 0.5}}>
                                <Button onClick={() => setShowHeaderPicker(true)} style={{backgroundColor: headerBackground}}>Header</Button> &nbsp;&nbsp;
                                <Modal show={showHeaderPicker} onHide={() => setShowHeaderPicker(false)}>
                                    <Modal.Header>Changer la couleur du Header</Modal.Header>
                                    <Modal.Body>
                                        <SketchPicker color={headerBackground} onChange={handleHeaderColor} onChangeComplete={handleHeaderColor} />
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button onClick={() => setShowHeaderPicker(false)}>Fermer et Sauver</Button>
                                    </Modal.Footer>
                                </Modal>
                                <Button onClick={() => setShowFooterPicker(true)} style={{backgroundColor: footerBackground}}>Footer</Button>
                                <Modal show={showFooterPicker} onHide={() => setShowFooterPicker(false)}>
                                    <Modal.Header>Changer la couleur du Footer</Modal.Header>
                                    <Modal.Body>
                                        <SketchPicker color={footerBackground} onChange={handleFooterColor} onChangeComplete={handleFooterColor} />
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button onClick={() => setShowFooterPicker(false)}>Fermer et Sauver</Button>
                                    </Modal.Footer>
                                </Modal>
                            </Col>
                        </Row>
                         </Card.Body>
                        </Card>                    
                 </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default Customization;
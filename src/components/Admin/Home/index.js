import React,{Fragment, useState, useEffect, useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Container, Row, Col} from 'react-bootstrap';
import Header from '../Header';
import {firebaseContext} from "../../Firebase";
const Home = () =>{
    const firebase = useContext(firebaseContext);    
    const [shopName, setShopName] = useState("");
    const [nameChanged,setNameChanged] = useState(false);

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
                    <form onSubmit={changeName}>
                        <input type="text" value={shopName} onChange={e=> setShopName(e.target.value)}/>
                        <button>Changer</button>
                    </form>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default Home;
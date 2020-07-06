import React, {useState, useContext, Fragment, useEffect} from 'react';
import {firebaseContext} from "../../Firebase";
import Header from "../Header";
import Footer from "../Footer";
import 'bootstrap/dist/css/bootstrap.css';
import {Card, Row, Col, Container, Button} from 'react-bootstrap';
import {Link} from "react-router-dom";
const SearchResult = (props) => {
    const firebase = useContext(firebaseContext);
    const [search, setsearch] = useState(props.match.params.s);
    const [results, setResults] = useState([]);
    useEffect(()=>{
        firebase.db.collection("products").where("productName", "==", search)
        .get()
        .then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                console.log(doc.id, " => ", doc.data());
                setResults(results => [...results, doc]);
            });
            console.log(results);
        })
        .catch(function(err){
            console.log(err);
        })
    }, [])

        return(
            <Fragment>
                <Header />
                <Row>
                    <Col md={{span: 5, offset: 4}}>
                        <h1>Voici les résultats pour "{search}" : </h1>
                    </Col>
                </Row>
                <Row>
                    {                        
                        results.map(item =>(
                                <Col xs="12" md="4" sm="12" key={item.id}>
                                    <Card style={{width : '18rem'}}>
                                    <Card.Img variant="top" src={item.data().imageURL} width="288px" heigth="400px"/>
                                    <Card.Body>
                                        <Card.Title>{item.data().productName}</Card.Title>
                                    <Card.Text>
                                        <Container>
                                            <Row>
                                                <Link to={`/product/${item.id}`} style={{ color: 'white' }}><Button variant="success">Voir l'offre</Button></Link>&nbsp;&nbsp; {`${item.data().price} €`}
                                            </Row>
                                        </Container>                                        
                                    </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                        ))
                    }
                    </Row>
                <Footer />
            </Fragment>
        )    
    }

export default SearchResult;
import React, {useState, useContext, Fragment} from 'react';
import {firebaseContext} from "../../Firebase";
import Header from "../Header";
import 'bootstrap/dist/css/bootstrap.css';
import {Card, Row, Col} from 'react-bootstrap';
const SearchResult = (props) => {
    const firebase = useContext(firebaseContext);
    const [search, setsearch] = useState(props.match.params.s);
    const [results, setResults] = useState([]);
    firebase.db.collection("products").where("productName", "==", search)
    .get()
    .then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(err){
        console.log(err);
    })

        return(
            <Fragment>
                <Header />
                <Row>
                    <Col md={{span: 4, offset: 4}}>
                        <Card>
                            <Card.Title className="text-center">Titre</Card.Title>
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        )    
    }

export default SearchResult;
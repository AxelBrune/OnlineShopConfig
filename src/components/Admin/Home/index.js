import React,{Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Container, Row, Col, Button} from 'react-bootstrap';
const Home = () =>{
    return(
        <Container>
            <Row>
                <Col md={{span: 5,offset:4}}><h1>Interface administrateur</h1></Col>
            </Row>
            <Fragment>
            <Button variant="primary">Primary</Button>
        </Fragment>
        </Container>
        
    )
}

export default Home;
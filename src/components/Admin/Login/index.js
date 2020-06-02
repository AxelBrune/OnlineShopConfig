import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Container, Card, Row, Col, Button} from 'react-bootstrap';
const Login = () =>{


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = e => {
        e.preventDefault();
        setEmail("");
        console.log(email);
        console.log(password);
    }
    return(
        <Container>
            <Row className="align-items-center">
                <Col md={{span:4, offset:4}}>
                    <form onSubmit={{handleSubmit}}>
                        <label>Email : </label>&nbsp;
                        <input type="email"  required value={email} onChange={e=> setEmail(e.target.value)}/> <br />
                        <label>Mot de passe : </label>&nbsp;
                        <input type="password" required value={password} onChange={e=> setPassword(e.target.value)}/>
                        <Button variant="primary">Se connecter</Button>
                    </form>
                </Col>
            </Row>
        </Container>
        
    )
}

export default Login;
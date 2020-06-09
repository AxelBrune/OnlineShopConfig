import React,{useState, Fragment, useContext, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {firebaseContext} from "../../Firebase";
import {Container, Row, Col, Alert} from 'react-bootstrap';
import Header from '../Header';
const Login = (props) =>{

    const firebase = useContext(firebaseContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [btn, setBtn] = useState('');
    const [problem, setProblem] = useState('');
    useEffect(() =>{
        if(password.length > 0 && email !== ''){
            setBtn(true);
        }
        else if(btn){
            setBtn(false);
        }
    },[password, email, btn])

    const handleLogin = e => {
        e.preventDefault();
        firebase.loginUser(email,password)
        .then(user => {
            setEmail("");
            setPassword("");
            props.history.push('/admin/home');
        })
        .catch(error => {
            setProblem(error);
            setEmail("");
            setPassword("");
        })
    }
            
    return(
        <Fragment>
            <Header/> <br/>
            <Container>
                <Fragment>
                <Row>
                    <Col md={{span:4, offset:4}}>
                        <h1 id="test">SE CONNECTER</h1> <br />
                        {problem !== '' && <Alert variant="danger">{problem.message}</Alert>}
                        <br />
                    </Col>
                </Row>
                <Row className="align-items-center">
                    <Col md={{span:4, offset:4}}>
                        <form onSubmit={handleLogin}>
                            <label>Email : </label>&nbsp;
                            <input type="email"  required value={email} onChange={e=> setEmail(e.target.value)}/> <br />
                            <label>Mot de passe : </label>&nbsp;
                            <input type="password" required value={password} onChange={e=> setPassword(e.target.value)}/><br />
                            {btn ? <button>Connexion</button> : <button disabled>Connexion</button>}
                        </form>
                    </Col>
                </Row>
                </Fragment>
            </Container>
        </Fragment>
        
    )
}

export default Login;
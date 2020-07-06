import React, {Fragment, useState, useContext, useEffect} from "react";
import Header from "../Header";
import 'bootstrap/dist/css/bootstrap.css';
import {Modal, Button, Table} from 'react-bootstrap';
import {firebasecontext, firebaseContext} from "../../Firebase";
import {BsPencil} from 'react-icons/bs';
import {FaEraser} from "react-icons/fa";
import { IconContext } from "react-icons";
const UserManagement = () => {

    const firebase = useContext(firebaseContext);

    const [users, setUsers] = useState([]);

    const fetchUsers = () =>{
        firebase.getUsers()
        .then(snapshot =>{
            const elements = snapshot.docs.map(doc => doc);
            setUsers(users.concat(elements));
        })
        .catch(error => console.log(error))
    }

    useEffect(()=>{
        fetchUsers();
    },[])

    const handleModif = (choice) => {
        console.log("Modis");
    }

    const handleErase = (choice) => {
        console.log("Suppression : ", choice);
        firebase.deleteUser(choice);
    }

    return(
        <Fragment>
            <Header />
            <center><h1>Gestion des utilisateurs</h1></center>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>Mail de l'utilisateur</th>
                    {/* <th>Modifier</th> */}
                    <th className="text-center">Supprimer</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(
                            item =>(
                            <tr key={item.id}>
                                <td>{item.data().mail}</td>
                                {/* <IconContext.Provider value={{color: "blue"}}>
                                    <td><button onClick={() => handleModif(item)}><BsPencil/></button></td>
                                </IconContext.Provider> */}
                                <IconContext.Provider value={{color: "red"}}>
                                    <td className="text-center"><button onClick={() => handleErase(item.id)}><FaEraser /></button></td>
                                </IconContext.Provider>
                            </tr>
                            ))
                    }
                </tbody>
            </Table>
        </Fragment>
    )
}

export default UserManagement;
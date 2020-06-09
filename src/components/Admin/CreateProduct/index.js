import React,{useContext, useState, Fragment} from 'react';
import {firebaseContext} from "../../Firebase";
import {ProgressBar} from 'react-bootstrap';
const CreateProduct = () => {
        
    const firebase = useContext(firebaseContext);
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleChange = e => {
        if (e.target.files[0]){
            const targ = e.target.files[0];
            setImage(targ);
        }
    }

    const handleUpload = e => {
        const uploadTask = firebase.storage.ref(`images/${image.name}`).put(image);
        uploadTask.on('state_changed',
            (snapshot) =>{
                const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100);
                setProgress(prog);
            },
            (error) => {
                console.log(error);
            },
            () => {
                firebase.storage.ref('images').child(image.name).getDownloadURL()
                .then(ur => {
                    console.log(ur);
                    setUrl(ur);
                })
            })
    }
    
        return(
            <Fragment>
                <h1>Upload d'une image</h1>
                <input type="file" onChange={handleChange} />
                <button onClick={handleUpload}>Upload</button>
                <br/>
                <h3>Image uploadée</h3>
                {progress > 0 ? <Fragment><ProgressBar striped variant="success" animated now={progress}  label={`${progress}%`}/><br/></Fragment> : <p></p>}
                <img src={url || 'http://via.placeholder.com/400x300'} height="300" width="400"/>
            </Fragment>
        )
}

export default CreateProduct;
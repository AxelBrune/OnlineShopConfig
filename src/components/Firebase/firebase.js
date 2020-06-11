import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyClpjyJ7UP2Zcf_km0qJ0GC_zMRXk0yK2s",
    authDomain: "onlineshopconfig.firebaseapp.com",
    databaseURL: "https://onlineshopconfig.firebaseio.com",
    projectId: "onlineshopconfig",
    storageBucket: "onlineshopconfig.appspot.com",
    messagingSenderId: "1055303689660",
    appId: "1:1055303689660:web:6c35f32c231de8499bb7b9"
  };

class Firebase{
    constructor(){
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.firestore();
        this.storage=app.storage();
    }

    signUp = (email,password) => this.auth.createUserWithEmailAndPassword(email, password);
    loginUser = (email, password) => this.auth.signInWithEmailAndPassword(email, password);
    signOutUser = (email, password) => this.auth.signOut();
    shopName = name => this.db.doc("ShopName/S3zQqF5Yv7A8bSHlLQiY");

    getProducts = () => {
      return  new Promise((onSuccess, onFail) => {
            this.db.collection("products").get()
            .then(querySnapshot => {
                onSuccess(querySnapshot);
            })
            .catch(error => onFail(error))
        })
    }

     deleteProduct = id =>{
             this.db.doc(`products/${id}`).delete()
             .then(function(){
                 console.log(`Élément d'id ${id} supprimé`);
                 window.location.reload(false);
             }).catch(function(err){
                 console.log("Delete error : ", err);
             })
     }
}

export default Firebase;
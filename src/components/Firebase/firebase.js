import app from 'firebase/app';
import 'firebase/auth';


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
    }

    signUp = (email,password) => this.auth.createUserWithEmailAndPassword(email, password);
    loginUser = (email, password) => this.auth.signInWithEmailAndPassword(email, password);
    signOutUser = (email, password) => this.auth.signOut();
}

export default Firebase;
import React from 'react';
import '../../App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from '../Admin/Home';
import ShopHomePage from '../Shop/ShopHomePage';
import Login from '../Admin/Login';
import ErrorPage from '../ErrorPage';
import ProductDetail from "../Shop/ProductDetail"
function App(){
    return(
        <Router>
            <Switch>
                <Route exact  path="/admin" component={Login} />
                <Route exact path="/" component={ShopHomePage} />
                <Route exact path="/admin/home" component={Home} />
                <Route path="/product/:id" component={ProductDetail}/>
                <Route  component={ErrorPage} />
            </Switch>
        </Router>
    )
}

export default App;
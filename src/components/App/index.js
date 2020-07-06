import React from 'react';
import '../../App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from '../Admin/Home';
import ShopHomePage from '../Shop/ShopHomePage';
import Login from '../Admin/Login';
import ErrorPage from '../ErrorPage';
import ProductDetail from "../Shop/ProductDetail";
import SearchResult from "../Shop/SearchResult";
import CreateAccount from "../Shop/CreateAccount";
import ProductManagement from '../Admin/ProductManagement';
import Customization from "../Admin/Customization";
import UserManagement from "../Admin/UserManagement";
import ReducCode from "../Admin/ReducCodes";
import Connection from "../Shop/Connection";
import UserCart from "../Shop/UserCart";
function App(){
    return(
        <Router>
            <Switch>
                <Route exact  path="/admin" component={Login} />
                <Route exact path="/" component={ShopHomePage} />
                <Route exact path="/admin/home" component={Home} />
                <Route path="/product/:id" component={ProductDetail}/>
                <Route path="/search/:s" component={SearchResult} />
                <Route path="/subscribe" component={CreateAccount} />
                <Route path="/admin/products" component={ProductManagement} />
                <Route path="/admin/custom" component={Customization} />
                <Route path="/admin/users" component={UserManagement} />
                <Route path="/admin/reduc" component={ReducCode} />
                <Route path="/connect" component={Connection} />
                <Route path="/cart/:id" component={UserCart} />
                <Route  component={ErrorPage} />
            </Switch>
        </Router>
    )
}

export default App;
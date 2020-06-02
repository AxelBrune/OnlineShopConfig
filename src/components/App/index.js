import React from 'react';
import '../../App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from '../Admin/Home'
import ShopHomePage from '../Shop/ShopHomePage';
function App(){
    return(
        <Router>
            <Switch>
                <Route exact  path="/admin" component={Home} />
                <Route  path="/" component={ShopHomePage} />
            </Switch>
        </Router>
    )
}

export default App;
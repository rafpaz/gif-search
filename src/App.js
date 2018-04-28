import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import './App.css';
import Homepage from "./components/Homepage";
import ErrorPage from "./components/ErrorPage";
import SingleView from "./components/SingleView";
import SearchPage from "./components/SearchPage";
import GifView from "./components/Gif";

const App = () => (
    <Router>
        <Switch>
            <Route exact path={"/"} component={Homepage}/>
            <Route exact path={"/search/:query/:limit/:position?"} component={SearchPage}/>
            <Route exact path={"/single/:id"} component={SingleView}/>
            <Route exact path={"/gif/:id"} component={GifView}/>
            <Route component={ErrorPage}/>
        </Switch>
    </Router>
);

export default App;

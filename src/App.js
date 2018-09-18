import React, { Component } from 'react';
import logo from './logo.svg';
import {Switch, Route} from "react-router-dom";
import Layout from "./HOC/Layout/Layout";
import HomePage from "./Containers/HomePage/HomePage"
import ListingsPage from "./Containers/ListingsPage/ListingsPage"

import classes from  './App.module.css';

class App extends Component {
  render() {
    return (
      <div className={classes.App}>


        <Layout>


        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/listings" component={ListingsPage} />
          </Switch>
        </Layout>

         
      </div>
    );
  }
}

export default App;

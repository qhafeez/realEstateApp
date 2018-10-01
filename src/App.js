import React, { Component } from 'react';
import logo from './logo.svg';
import {Switch, Route, withRouter} from "react-router-dom";
import Layout from "./HOC/Layout/Layout";
import HomePage from "./Containers/HomePage/HomePage"
import ListingsPage from "./Containers/ListingsPage/ListingsPage"
import classes from  './App.module.css';
import {connect} from "react-redux";
import * as actions from "./store/actions/listingActions";



class App extends Component {

  componentDidMount(){

    this.props.latLng(this.props.listings);

  }


  render() {
    return (
      <div className={classes.App}>


        <Layout>

          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/listings/:path1?/:path2?/:path3?/:path4?/:path5?/:path6?/:path7?/:path8?/:path9?/:path10?/:path11?/:path12?" component={ListingsPage} />
          </Switch>

        </Layout>

         
      </div>
    );
  }
}

const mapStateToProps = state =>{

  return{
    listings:state.listings.listingsData
  }

}

const mapDispatchToProps = dispatch =>{

  return{
    latLng:(a)=>{dispatch(actions.addLatLng(a))}
  }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

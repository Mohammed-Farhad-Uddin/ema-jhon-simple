import React, { createContext } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Shop from './Components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './Components/Review/Review';
import Inventory from './Components/Inventory/Inventory';
import NotFound from './Components/NotFound/NotFound';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Shipping from './Components/Shipping/Shipping';
import Login from './Components/Login/Login';
import { useState } from 'react/cjs/react.development';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const UserContext=createContext()

function App() {
  const [loggedInUser,setLoggedInUser]=useState([])
  return (
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
      <h1>email:{loggedInUser.email}</h1>
      <Header></Header>
      <Router>
        <Switch>
        <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/shop">
              <Shop></Shop>
          </Route>
          <Route path="/review">
              <Review></Review>
          </Route>
          <PrivateRoute path="/inventory">
            <Inventory></Inventory>
          </PrivateRoute>
          <PrivateRoute  path="/shipping">
            <Shipping></Shipping>
          </PrivateRoute>

          <Route path="/login">
            <Login></Login>
          </Route>
 
          <Route path="/product/:productKey">
            <ProductDetails></ProductDetails>
          </Route>
          <Route path="*">
              <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

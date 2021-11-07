import React from 'react';
import {
    BrowserRouter as 
    Route,
    Redirect
  } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../../App';
  
const PrivateRoute = ({children,...rest}) => {
    const[loggedInUser,setLoggedInUser] = useContext(UserContext)
    return (
    //     <Route
    //     {...rest}
    //     render={({ location }) =>
    //         loggedInUser.email ? (
    //         children
    //         ) : (
    //         <Redirect
    //             to={{
    //             pathname: "/login",
    //             state: { from: location }
    //             }}
    //         />
    //     )
    //   }
    // />
        <Route
        {...rest}
        render={({ location }) => loggedInUser.email ? children : <Redirect
            to={{
                pathname: "/login",
                state: { from: location }
            }}
        ></Redirect>}
            >
            </Route>
    );
};

export default PrivateRoute;
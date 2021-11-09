// import React from 'react';
// import {
//     BrowserRouter as 
//     Route,
//     Redirect
//   } from "react-router-dom";
// import { useContext } from 'react';
// import { UserContext } from '../../App';
  
// const PrivateRoute = ({children,...rest}) => {
//     const[loggedInUser,setLoggedInUser] = useContext(UserContext)
//     return (
//         <Route
//         {...rest}
//         render={({ location }) =>
//             loggedInUser.email ? (
//             children
//             ) : (
//             <Redirect
//                 to={{
//                 pathname: "/login",
//                 state: { from: location }
//                 }}
//             />
//         )
//       }
//     />
//     );
// };
// export default PrivateRoute;


import React, {useContext} from 'react';
import {
    BrowserRouter ,
    Route,
    Redirect
  } from "react-router-dom";
// import {Route, Redirect} from "react-router-dom";
import { UserContext } from '../../App';

const PrivateRoute = ({children, ...rest}) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    //let auth = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                loggedInUser.email ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
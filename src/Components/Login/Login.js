import React, { useState } from 'react';
import 'firebase/auth';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { handleGoogleSignIn, initializeLoginFramework , handleSignOut, handleFbSignIn, AcreateUserWithEmailAndPassword, AsignInWithEmailAndPassword, resetPassword} from './LoginFirebaseManager';







const Login=()=> {
  
  
  
  const[newUser,setNewUser]=useState(false)
  const[user,setUser]=useState({
    isSignIn:false,
    name:"",
    email:'',
    password:'',
    photo:'',
    error:'',
    success:false
  })
  initializeLoginFramework()
  const [loggedInUser,setLoggedInUser]=useContext(UserContext);
  const history=useHistory();
  const location=useLocation();
  let { from } = location.state || { from: { pathname: "/" } };


  const googleSignIn=()=>{
    handleGoogleSignIn()
    .then((res)=> {
      handleResponse(res,true)
    })
  }

  const fbSignIn=()=>{
    handleFbSignIn()
    .then((res)=>{
      handleResponse(res,true)
    })
  }

  const signOut=()=>{
    handleSignOut()
    .then((res)=>{
      handleResponse(res,false)
    })
  }

  const handleResponse=(res,redirect)=>{
    setUser(res)
    setLoggedInUser(res)
    if(redirect){
      history.replace(from)
    }
  }




        const handleChange=(e)=>{
          // let isFieldValid=true;
          let isFieldValid;
          // console.log(e.target.name,e.target.value)//e.target.name mane input e name jei ta dewa ace oi ta.ete buja jabe kon name tar modde target value ta uttece.krn email input e type korle email diye tar pase type kora word utbe.abe name=password e password field e type korle oita utbe.r name na dile buja jabe na kon input line ta te type word gula kaj kortece oi ta
          if(e.target.name === 'email'){
            isFieldValid=/\S+@\S+\.\S+/.test(e.target.value);
            // console.log(isFieldValid)
          }
          if(e.target.name === 'password'){
            const PassworShouldBeSixDigit=e.target.value.length>6;
            // console.log(PassworShouldBeSixDigit);//password minimum 6 digit hote hobe
            const passwordShouldContainsNumber=/^\d+$/.test(e.target.value)
            // console.log(passwordShouldContainsNumber)//password digit hote hobe

            // console.log(PassworShouldBeSixDigit,passwordShouldContainsNumber)
            // console.log(PassworShouldBeSixDigit && passwordShouldContainsNumber)
            isFieldValid=PassworShouldBeSixDigit && passwordShouldContainsNumber
          }
          if(isFieldValid){
            const newUserInfo={...user};
            newUserInfo[e.target.name]=e.target.value;
            // newUserInfo[e.target.name]=e.target.value;
            setUser(newUserInfo)
          }
        }
        const handleBlur=(e)=>{
          // console.log(e.target.name,e.target.value)// blur e dile input e type korar por jkn oi kan tekhe onno kotao click korbo tkn console e utbe sob kicu type kora target value gula ek sathe.r onchange proti ta value change output show korbe.
          const newUserInfo={...user}
          newUserInfo[e.target.name]=e.target.value;
          setUser(newUserInfo)
        }

        const handleSubmit=(e)=>{
          e.preventDefault()
          // console.log(user.email,user.password)
          if(newUser && user.email && user.password){
                AcreateUserWithEmailAndPassword(user.name,user.email,user.password)
                .then((res)=>{
                  handleResponse(res,true)
                })
          }
          if(!newUser && user.email && user.password){
               AsignInWithEmailAndPassword(user.email,user.password)
               .then((res)=>{
                 handleResponse(res,true)
               })
              }
        }



  return (
    <div style={{textAlign:"center"}}>
      {
      user.isSignIn ? 
      <button onClick={signOut}> Google Sign Out</button>:
      <button onClick={googleSignIn}>Sign in</button>
      }
      {
        user.isSignIn && <div>
            <p>Welcome , {user.name}</p>
            <img src={user.photo} alt="this is Farhad vai" />
            <p>Your email:{user.email}</p>
        </div> 
      }
      <br />
      <button onClick={fbSignIn}>Facebook Sign In</button>
      <h1>Our Own Authentication</h1>
      {/* <p>Name:{user.name}</p>
      <p>Email:{user.email}</p>
      <p>Password:{user.password}</p> */}
      <form action="" onSubmit={handleSubmit}>
        <input onChange={()=>setNewUser(!newUser)} type="checkbox" name="newUser" id="" />
        <label htmlFor="newUser">New User Sign In</label> <br />
        {newUser && <input type="text" onBlur={handleBlur} name="name" placeholder="Type your name" />} <br />
        <input type="text" onChange={handleChange} name="email" placeholder="Enter your mail" required /> <br />
        <input type="password" onChange={handleChange} name="password" id="" placeholder="Enter your password" required /> <br />
        <input type="submit" value={newUser?"Sign Up":"Sign In"} />
      </form>
        <button onClick={()=>resetPassword(user.email)}>Forget Password</button>
      <p style={{color:'red'}}>{user.error}</p>
      {user.success && <p style={{color:'Green'}}> User {newUser? 'Sign In' : "Log In"} successfuly</p>}
    </div>
  );
}
export default Login;
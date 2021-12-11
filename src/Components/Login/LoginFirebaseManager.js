import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './FirebaseConfig';
import 'firebase/auth';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { signOut } from "firebase/auth";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
import { sendEmailVerification } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";


export const initializeLoginFramework=()=>{
    const app = initializeApp(firebaseConfig);
}


export const handleGoogleSignIn=()=>{
    const GoogleProvider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, GoogleProvider)
    .then((res)=>{
      const{email,photoURL,displayName}=res.user;
      const signInUser={
        isSignIn:true,
        name:displayName,
        email:email,
        photo:photoURL,
        success:true
      }
      return signInUser;
    }).catch((err)=>console.log(err))
  }


 export const handleFbSignIn=()=>{
    const FbProvider = new FacebookAuthProvider();
       const auth = getAuth();
       return signInWithPopup(auth, FbProvider)
       .then((result) => {
         // The signed-in user info.
         const user = result.user;
         user.success=true;
         return user;

         // This gives you a Facebook Access Token. You can use it to access the Facebook API.
         // const credential = FacebookAuthProvider.credentialFromResult(result);
         // const accessToken = credential.accessToken;
       })
       .catch((error) => {
         // Handle Errors here.
         // const errorCode = error.code;
         const errorMessage = error.message;
         // The email of the user's account used.
         // const email = error.email;
         // The AuthCredential type that was used.
         // const credential = FacebookAuthProvider.credentialFromError(error);
         console.log(errorMessage)
     });
}

export const handleSignOut=()=>{
    const auth = getAuth();
   return signOut(auth).then((res) => {
     const userSignOut={
       isSignIn:false,
       name:'',
       email:'',
       photo:''
     }
     return userSignOut
     console.log(res)//sign out howar por res dekha
   }).catch((error) => {
     console.log(error)
   });
   }

   export const AcreateUserWithEmailAndPassword=(name,email,password)=>{
            const auth = getAuth();
           return createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                // const user = userCredential.user;
                const newUserInfo=res.user;
                newUserInfo.error='';
                newUserInfo.success=true;
                updateUserInfo(name);
                verifyEmail();
                // console.log(res.user)
                return newUserInfo
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                const newUserInfo={}
                newUserInfo.error=errorMessage;
                newUserInfo.success=false;
                return newUserInfo
            });
        }



export const AsignInWithEmailAndPassword=(email,password)=>{
    const auth = getAuth();
           return signInWithEmailAndPassword(auth, email, password)
              .then((res) => {
                // const user = userCredential.user;
                const newUserInfo=res.user;
                newUserInfo.error='';
                newUserInfo.success=true;
                return newUserInfo;
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                const newUserInfo={}
                newUserInfo.error=errorMessage;
                newUserInfo.success=false;
                return newUserInfo
              });
}



const updateUserInfo=(name)=>{       
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      name: name
    }).then(() => {
      // Profile updated!
      console.log('Profile Updated')
    }).catch((error) => {
      console.log(error)
    });
  }

  

const verifyEmail=()=>{
  const auth = getAuth();
  sendEmailVerification(auth.currentUser)
    .then(() => {
      // Email verification sent!
      // ...
    });
}



export const resetPassword=(email)=>{
  const auth = getAuth();
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}

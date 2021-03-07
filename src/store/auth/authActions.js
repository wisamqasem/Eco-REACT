import { storageRef } from "../../config/fbConfig";
import { toast } from 'react-toastify';

export const signIn = (credentials) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().signInWithEmailAndPassword(
      credentials.login_email,
      credentials.login_password
    ).then(() => {
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
        toast.error("Login failed");
      dispatch({ type: 'LOGIN_ERROR', err });
    });

  }
}

export const checkUserLoged = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                dispatch({ type: 'LOGIN_SUCCESS' });

            } else {
              // No user is signed in.
            }
            });

        }

}



export const signOut = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().signOut().then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS' })
    });
  }
}

export const signUp = (newUser) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const metadata = {contentType: "image/jpeg" };
    const uploadTask =  storageRef
    .child("usersImages/" + newUser.register_email )
    .put(newUser.file, metadata);




    firebase.auth().createUserWithEmailAndPassword(
      newUser.register_email,
      newUser.register_password
    )
    .then(resp => {
        console.log("🚀 ~ file: authActions.js ~ line 72 ~ return ~ resp", resp)
        uploadTask.on("state_changed",
        ()=>{console.log("uploding image start")}
    ,
    (error)=>{console.log("uploding image fail",error)}
    ,
    ()=>{
        uploadTask.snapshot.ref.getDownloadURL().then((photoURL) =>{
            resp.user.updateProfile({
                displayName:  newUser.register_name,
                photoURL : photoURL
            });
           })



        console.log("uploding image completed")}
          )








       firestore.collection('carts').doc(resp.user.uid).set({});
       firestore.collection('wishLists').doc(resp.user.uid).set({});
       firestore.collection('compareLists').doc(resp.user.uid).set({});
    })
    .then(() => {
      dispatch({ type: 'SIGNUP_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'SIGNUP_ERROR', err});
    });
  }
}

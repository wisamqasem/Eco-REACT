export const signIn = (credentials) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().signInWithEmailAndPassword(
      credentials.login_email,
      credentials.login_password
    ).then(() => {
      dispatch({ type: 'LOGIN_SUCCESS' });


    }).catch((err) => {
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

    firebase.auth().createUserWithEmailAndPassword(
      newUser.register_email,
      newUser.register_password
    )
    // .then(resp => {
    //   return firestore.collection('users').doc(resp.user.uid).set({
    //   //  firstName: newUser.firstName,
    //   //  lastName: newUser.lastName,
    //    // initials: newUser.firstName[0] + newUser.lastName[0]
    //   });
    // })
    .then(() => {
      dispatch({ type: 'SIGNUP_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'SIGNUP_ERROR', err});
    });
  }
}

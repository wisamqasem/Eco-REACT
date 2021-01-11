import React, { Component } from 'react'
import { connect } from 'react-redux';
import firebase from '../../config/fbConfig'
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase'
import { firebaseConnect } from 'react-redux-firebase'


 export const addreview = (review) => {


    return (dispatch, getState, {getFirestore}) => {
        console.log("review rating : ", review.productRating);
        console.log("review  people rated: ", review.productPeopleRated);

      // make async call to database

      const firestore = getFirestore();

      //const userId  = firebase.auth().uid;


     // update('products/'+(review.productId), { here: 'is a value' })

//.doc(review.productId)
    firestore.collection('products').doc(review.productId).update({
        reviews: firebase.firestore.FieldValue.arrayUnion({
            name: review.review_author,
            review: review.review_text ,
               rating :  review.review_stars,
                email :  review.review_email,
                avatar : 'images/avatars/avatar-2.jpg',
                date : new Date().toString()
            } ),

            rating: (((review.productRating * review.productPeopleRated) +  parseFloat(review.review_stars)) / (review.productPeopleRated + 1)).toString(),
            peopleRated : (review.productPeopleRated+1).toString()


    }).then(() => {
      dispatch({ type: 'CREATE_REVIEW_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'CREATE_REVIEW_ERROR' }, err);
    })





    };

}


    const mapDispatchToProps = dispatch => {
        return {




        }
      }

//    export default compose(
//     connect(mapStateToProps),
//     firestoreConnect([
//       { firebase: { update } }
//     ])
//   )(addreview)

  export default connect(mapDispatchToProps)(addreview);

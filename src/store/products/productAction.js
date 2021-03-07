import React, { Component } from 'react'
import { storageRef } from "../../config/fbConfig";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import {
    UPLOADING_START,
    UPLOADING_SUCCESS,
    UPLOADING_FAIL,
    UPLOADING,
    GET_DATA
  } from "../images/types";
  import firebase from '../../config/fbConfig'

 export const createProduct = (product) => {


    return (dispatch, getState, {getFirestore}) => {
        console.log("product : ", product);
      // make async call to database
     var imagesUrl = [];
      const firestore = getFirestore();
      const metadata = {contentType: "image/jpeg" };
      const userId  = firebase.auth().uid;
      var uniqid = require('uniqid');
      //console.log("🚀 ~ file: productAction.js ~ line 25 ~ return ~ uniqid", uniqid())


var count=0;

      const promise1 = new Promise((resolve, reject) => {
        const uploadimages =   (imagesNum)=>{ product.images.map(image=>{
            //image.name
            const uploadTask=   storageRef
             .child("images/" + uniqid() )
             .put(image, metadata);
     dispatch({ type: UPLOADING_START });
             uploadTask.on(
                "state_changed",
        function(){ dispatch({ type: UPLOADING });},
                function(error) {
                  // Handle unsuccessful uploads
                  dispatch({ type: UPLOADING_FAIL, payload: error });
                },
                function() {
                  // Handle successful uploads on complete
                  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
count++;
                    imagesUrl.push(downloadURL);
if(imagesNum==count){ resolve(imagesUrl);}
                    dispatch({ type: UPLOADING_SUCCESS });
                }
              )
            }
              )
          }
          )
        }
    uploadimages(product.images.length);
      });


 // uploadimages();

 promise1.then((value) => {
    console.log("value  : ", value);
    // expected output: "Success!"
    firestore.collection('products').add({
        name:product.name,
        price:product.price ,
        availability:product.availability ,
        badges:product.badges ,
        description:product.description ,
        userId:product.userId,
        brand:product.brand ,
        compareAtPrice:product.compareAtPrice,
        rating:'0',
        peopleRated : '0',
        reviews:[],
        slug:product.name+uniqid(),
        categories:product.categories,
        subCategory:product.subCategory,
        colors:product.colors,
        images:value
    }).then(() => {
      dispatch({ type: 'CREATE_PRODUCT_SUCCESS' , productName :product.name });
    }).catch(err => {
      dispatch({ type: 'CREATE_PRODUCT_ERROR' }, err);
    })

  })

      // dispatch
    //  var imagesUrl = [];
     ////////upload task event

    };

}
const mapStateToProps = (product) => ({

 images:product.images
   });

   export default connect(mapStateToProps)(createProduct)

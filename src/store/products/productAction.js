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

 export const createProduct = (product) => {


    return (dispatch, getState, {getFirestore}) => {
        console.log("product : ", product);
      // make async call to database
     var imagesUrl = [];
      const firestore = getFirestore();
      const metadata = {contentType: "image/jpeg" };
var count=0;

      const promise1 = new Promise((resolve, reject) => {
        const uploadimages =   (imagesNum)=>{ product.images.map(image=>{

            // storageRef
            // .child("images/" + product.file.name)
            // .put(product.file, metadata);

            const uploadTask=   storageRef
             .child("images/" + image.name)
             .put(image, metadata);

             console.log("done")


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
                    console.log("WE R IN PRO",downloadURL);
count++;
                    imagesUrl.push(downloadURL);
                    console.log("images url links : ",imagesUrl);
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
        brand:product.brand ,
        compareAtPrice:product.compareAtPrice,
        rating:product.rating,
        reviews:product.reviews,
        slug:product.name,
        categories:product.categories,
        images:value
    }).then(() => {
      dispatch({ type: 'CREATE_PRODUCT_SUCCESS' });
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

import { toast } from 'react-toastify';
import firebase from '../../config/fbConfig';
import { COMPARE_ADD_ITEM, COMPARE_REMOVE_ITEM,COMPARE_GET_ITEMS } from './compareActionTypes';
import shopApi from '../../api/shop';



export function getCompareData(userId){
    console.log("we r in getCompareData 0");
    return (dispatch) => (//-----------------
        new Promise((resolve) => {
            console.log("we r in getCompareData 1");
           // const userId  = firebase.auth().currentUser.uid;
            shopApi.getMyCompareList(userId).then((compareList)=>{
                console.log("🚀 ~ file: compareActions.js ~ line 15 ~ shopApi.getMyCompareList ~ compareList", compareList)
                console.log("we r in getCompareData 2");
                dispatch({ type: COMPARE_GET_ITEMS ,compareLists :compareList });
            })
         resolve();
        })

    )
}




export function compareAddItemSuccess(product) {
    toast.success(`Product "${product.name.stringValue}" added to compare!`);

    return {
        type: COMPARE_ADD_ITEM,
        product,
    };
}

export function compareRemoveItemSuccess(productId) {
    return {
        type: COMPARE_REMOVE_ITEM,
        productId,
    };
}

export function compareAddItem(product) {
    console.log("🚀 ~ file: compareActions.js ~ line 45 ~ compareAddItem ~ product", product)
    // sending request to server, timeout is used as a stub
    return (dispatch, getState,{getFirestore}) => (
        new Promise((resolve) => {
            const firestore = getFirestore();
            const userId  = firebase.auth().currentUser.uid;
            const reviewsNum = product.reviews.arrayValue.values ? product.reviews.arrayValue.values.length : 0
                firestore.collection('compareLists').doc(userId).update({
                    products: firebase.firestore.FieldValue.arrayUnion({
                    name:product.name.stringValue,
                    price:product.price.stringValue ,
                    slug:product.slug.stringValue,
                    images:product.images.arrayValue.values[0].stringValue,
                    rating:product.rating.stringValue,
                    reviews:reviewsNum.toString(),
                    availability:product.availability.stringValue,


                        })

                }).then(() => {
                    dispatch(compareAddItemSuccess(product));
                }).catch(err => {
                  dispatch({ type: 'ADD_COMAPRE_ERROR' }, err);
                })
                resolve();

        })
    );
}

export function compareRemoveItem(product,compareListId) {
    return (dispatch, getState,{getFirestore}) => (
        new Promise((resolve) => {
            const firestore = getFirestore();
           // const userId  = firebase.auth().currentUser.uid;
                firestore.collection('compareLists').doc(compareListId).update({
                    products: firebase.firestore.FieldValue.arrayRemove({images:product.images.stringValue , name :product.name.stringValue , slug :product.slug.stringValue ,price :product.price.stringValue,rating:product.rating.stringValue,reviews:product.reviews.stringValue } )
                }).then(() => {
dispatch(compareRemoveItemSuccess(product.slug.stringValue));
                })
                resolve();
        })
    );
    // return (dispatch) => (
    //     new Promise((resolve) => {
    //         setTimeout(() => {
    //             dispatch(compareRemoveItemSuccess(productId));
    //             resolve();
    //         }, 500);
    //     })
    // );
}

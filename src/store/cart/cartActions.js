import { toast } from 'react-toastify';
import { Object } from 'sugar';
import firebase from '../../config/fbConfig'
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_UPDATE_QUANTITIES,GET_CART_DATA } from './cartActionTypes';
import shopApi from '../../api/shop'


export function getCartData(userId){
    console.log("we r in get my cart 1");
    return (dispatch) => (
        new Promise((resolve) => {
          //  console.log("we r in the promise");
           // const userId  = firebase.auth().currentUser.uid;
            shopApi.getMyCart(userId).then((products)=>{
                console.log("we r in getMyCart 2");

                dispatch({ type: GET_CART_DATA ,cartProducts :products });

            })
         resolve();
        })

    )
}




export function cartAddItemSuccess(product, options = [], quantity = 1) {
    toast.success(`Product "${product.name.stringValue}" added to cart!`);

    return {
        type: CART_ADD_ITEM,
        product,
        options,
        quantity,
    };
}

export function cartRemoveItemSuccess(itemId) {
    return {
        type: CART_REMOVE_ITEM,
        itemId,
    };
}

export function cartUpdateQuantitiesSuccess(quantities) {
    return {
        type: CART_UPDATE_QUANTITIES,
        quantities,
    };
}

export function cartAddItem(product, options = [], quantity = 1,) {
return (dispatch, getState,{getFirestore}) => (
    new Promise((resolve) => {
        const firestore = getFirestore();
        const userId  = firebase.auth().currentUser.uid;
       // console.log("🚀 ~ file: cartActions.js ~ line 40 ~ newPromise ~ userId", userId)
        firestore.collection('carts').doc(userId).update({
            products: firebase.firestore.FieldValue.arrayUnion({
            name:product.name.stringValue,
            price:product.price.stringValue ,
            slug:product.slug.stringValue,
            images:product.images.stringValue ? product.images.stringValue : product.images.arrayValue.values[0].stringValue
                })

        }).then(() => {
            dispatch(cartAddItemSuccess(product, options, quantity));
        }).catch(err => {
          dispatch({ type: 'ADD_CART_ERROR' }, err);
        })
        resolve();
        // setTimeout(() => {
        //     //dispatch(cartAddItemSuccess(product, options, quantity));
        //     resolve();
        // }, 500);
    })
);
}

export function cartRemoveItem(product,cartId) {
    return (dispatch, getState,{getFirestore}) => (
        new Promise((resolve) => {
            const firestore = getFirestore();
           // const userId  = firebase.auth().currentUser.uid;
                firestore.collection('carts').doc(cartId).update({
                    products: firebase.firestore.FieldValue.arrayRemove({images:product.images.stringValue , name :product.name.stringValue , slug :product.slug.stringValue ,price :product.price.stringValue } )
                }).then(() => {
dispatch(cartRemoveItemSuccess(product.slug.stringValue));
                })
                resolve();
        })
    );
}

export function cartUpdateQuantities(quantities) {
    // sending request to server, timeout is used as a stub
    console.log("quantities : ",quantities)
    return (dispatch) => (
        new Promise((resolve) => {
            setTimeout(() => {
                dispatch(cartUpdateQuantitiesSuccess(quantities));
                resolve();
            }, 500);
        })
    );
}




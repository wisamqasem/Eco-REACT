import { toast } from 'react-toastify';
import firebase from '../../config/fbConfig';
import { WISHLIST_ADD_ITEM, WISHLIST_REMOVE_ITEM , GET_WISHLISTS_DATA } from './wishlistActionTypes';

import shopApi from '../../api/shop';


export function getWishListData(userId){
    return (dispatch) => (//-----------------
        new Promise((resolve) => {
           // const userId  = firebase.auth().currentUser.uid;
            shopApi.getMyWishList(userId).then((wishList)=>{
                dispatch({ type: GET_WISHLISTS_DATA ,wishLists :wishList });
            })
         resolve();
        })

    )
}







export function wishlistAddItemSuccess(product) {
    toast.success(`Product "${product.name.stringValue}" added to wish list!`);

    return {
        type: WISHLIST_ADD_ITEM,
        product,
    };
}

export function wishlistRemoveItemSuccess(productId) {
    return {
        type: WISHLIST_REMOVE_ITEM,
        productId,
    };
}

export function wishlistAddItem(product) {
    return (dispatch, getState,{getFirestore}) => (
        new Promise((resolve) => {
            const firestore = getFirestore();
            const userId  = firebase.auth().currentUser.uid;
            firestore.collection('wishLists').doc(userId).update({
                products: firebase.firestore.FieldValue.arrayUnion({
                name:product.name.stringValue,
                price:product.price.stringValue ,
                slug:product.slug.stringValue,
                images:product.images.arrayValue.values[0].stringValue,
                rating:product.rating.stringValue,
                badges:product.badges.stringValue,

                    })

            }).then(() => {
                dispatch(wishlistAddItemSuccess(product));
            }).catch(err => {
              dispatch({ type: 'ADD_WISHLIST_ERROR' }, err);
            })
            resolve();

        })
    );

}

export function wishlistRemoveItem(product,wishListId) {
    return (dispatch, getState,{getFirestore}) => (
        new Promise((resolve) => {
            const firestore = getFirestore();
        //    console.log("wishListId : ",wishListId)
           // const userId  = firebase.auth().currentUser.uid;
                firestore.collection('wishLists').doc(wishListId).update({
                    products: firebase.firestore.FieldValue.arrayRemove({
                        images:product.images.stringValue ,
                         name :product.name.stringValue ,
                          slug :product.slug.stringValue ,
                          price :product.price.stringValue,
                          rating:product.rating.stringValue,
                          badges:product.badges.stringValue
                        } )
                }).then(() => {
dispatch(wishlistRemoveItemSuccess(product.slug.stringValue));
                })
                resolve();
        })
    );

}

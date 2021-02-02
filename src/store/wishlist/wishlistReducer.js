import { cartRemoveItem } from '../cart';
import { WISHLIST_ADD_ITEM, WISHLIST_REMOVE_ITEM, GET_WISHLISTS_DATA } from './wishlistActionTypes';

function wishListData(state,Products) {
    if(!Products.data.fields.products.arrayValue.values)return{
          ...state,
        wishListProducts:[],
    }
     return{
        ...state,
        wishListProducts:Products.data.fields.products.arrayValue.values,
    }
}



function addItem(state, product) {
    const itemIndex = state.wishListProducts.findIndex((x) => x.mapValue.fields.slug.stringValue === product.slug.stringValue);
    if (itemIndex === -1) {
        console.log("wow man")
        const newItems= [
            ...state.wishListProducts,
          {mapValue:{fields:{name:{strinValue:product.name.stringValue},price:{strinValue:product.price.stringValue},rating:{strinValue:product.rating.stringValue},badges:{strinValue:product.badges.stringValue},images:{strinValue:product.images.stringValue},slug:{strinValue:product.slug.stringValue}}}}
        ];
        return{...state,wishListProducts:newItems}
    }

    return state;
}


const initialState = [];

export default function wishlistReducer(state = initialState, action) {
    switch (action.type) {
    case WISHLIST_ADD_ITEM:
        return addItem(state, action.product);

    case WISHLIST_REMOVE_ITEM:
        return{wishListProducts:state.wishListProducts.filter((x) => x.mapValue.fields.slug.stringValue !== action.productId)}
    case  GET_WISHLISTS_DATA:
        return  wishListData(state,action.wishLists);

    default:
        return state;
    }
}

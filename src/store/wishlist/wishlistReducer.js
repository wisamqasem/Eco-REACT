import { cartRemoveItem } from '../cart';
import { WISHLIST_ADD_ITEM, WISHLIST_REMOVE_ITEM, GET_WISHLISTS_DATA } from './wishlistActionTypes';

function wishListData(state,Products) {
    try {

        if(!Products.data.fields.products.arrayValue.values)return{
            ...state,
          wishListProducts:[],
      }
       return{
          ...state,
          wishListProducts:Products.data.fields.products.arrayValue.values,
      }

      } catch (err) {

        return{
            ...state,
            wishListProducts:[],
        }

      }

}



function addItem(state, product) {
    const itemIndex = state.wishListProducts.findIndex((x) => x.mapValue.fields.slug.stringValue === product.slug.stringValue);
    if (itemIndex === -1) {
        console.log("wow man")
        const newItems= [
            ...state.wishListProducts,
          {mapValue:{fields:{name:{stringValue:product.name.stringValue},price:{stringValue:product.price.stringValue},rating:{stringValue:product.rating.stringValue},badges:{stringValue:product.badges.stringValue},images:{stringValue:product.images.arrayValue.values[0].stringValue},slug:{stringValue:product.slug.stringValue}}}}
        ];
        console.log("🚀 ~ file: wishlistReducer.js ~ line 25 ~ addItem ~ newItems", product)

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

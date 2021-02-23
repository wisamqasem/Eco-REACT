import { COMPARE_ADD_ITEM, COMPARE_REMOVE_ITEM,COMPARE_GET_ITEMS } from './compareActionTypes';


function comapreListData(state,Products) {
console.log("🚀 ~ file: compareReducer.js ~ line 5 ~ comapreListData ~ Products", Products)

    if(!Products.data.fields.products.arrayValue.values)return{
          ...state,
        compareListProducts:[],
    }
     return{
        ...state,
        compareListProducts:Products.data.fields.products.arrayValue.values,
    }
}



function addItem(state, product) {
    console.log("hi man what happen")
    const itemIndex = -1//state.compareListProducts.findIndex((x) => x.mapValue.fields.slug.stringValue === product.slug.stringValue);
    console.log("🚀 ~ file: compareReducer.js ~ line 19 ~ addItem ~ itemIndex", itemIndex)
    if (itemIndex === -1) {
        console.log("wow man")
        const reviewsNum = product.reviews.arrayValue.values ? product.reviews.arrayValue.values.length : 0
        const newItems= [
            ...state.compareListProducts,
          {mapValue:{fields:{name:{strinValue:product.name.stringValue},price:{strinValue:product.price.stringValue},rating:{strinValue:product.rating.stringValue},images:product.images.arrayValue.values[0].stringValue,slug:{strinValue:product.slug.stringValue},reviews:{strinValue:reviewsNum.toString()},availability:{stringValue:product.availability.stringValue}}}}
        ];
        return{...state,compareListProducts:newItems}
    }

    return state;
    // const itemIndex = state.findIndex((x) => x.id === product.id);

    // if (itemIndex === -1) {
    //     return [
    //         ...state,
    //        product,
    //     ];
    // }

    // return state;
}

const initialState = [];

export default function compareReducer(state = initialState, action) {
    switch (action.type) {
    case COMPARE_ADD_ITEM:
        return addItem(state, action.product);

    case COMPARE_REMOVE_ITEM:
        return{compareListProducts:state.compareListProducts.filter((x) => x.mapValue.fields.slug.stringValue !== action.productId)}
        return state.filter((x) => x.id !== action.productId);
    case COMPARE_GET_ITEMS:
        return  comapreListData(state,action.compareLists);
    default:
        return state;
    }
}

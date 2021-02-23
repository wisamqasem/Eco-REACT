import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_UPDATE_QUANTITIES,GET_CART_DATA } from './cartActionTypes';
import firebase from '../../config/fbConfig'
/**
 * @param {array} items
 * @param {object} product
 * @param {array} options
 * @return {number}
 */
function findItemIndex(items, product, options) {
    return items.findIndex((item) => {
        if (item.mapValue.fields.slug.stringValue !== product.slug.stringValue ) {
            return false;
        }

        // for (let i = 0; i < options.length; i += 1) {
        //     const option = options[i];
        //     const itemOption = item.options.find((itemOption) => (
        //         itemOption.optionId === option.optionId && itemOption.valueId === option.valueId
        //     ));

        //     if (!itemOption) {
        //         return false;
        //     }
        // }

        return true;
    });
}

function cartData(state,Products) {
    if(!Products.data.fields.products.arrayValue.values)return{
          ...state,
        cartProducts:[],
        quantity:0,
        subtotal:0,
        total:0}
    const cartProducts = Products.data.fields.products.arrayValue.values;
    var subtotal=0,extraLines=0;
cartProducts.map((p)=>{p.total=parseInt(p.mapValue.fields.price.stringValue);subtotal+=parseInt(p.mapValue.fields.price.stringValue)})
state.extraLines.map((p)=>{extraLines+=p.price})

    return{
        ...state,
        cartProducts:cartProducts,
        quantity:cartProducts.length,
        subtotal:subtotal,
        total:subtotal+extraLines
    }
}

function calcSubtotal(items) {
    return items.reduce((subtotal, item) => subtotal + item.total, 0);
}

function calcQuantity(items) {
    return items.reduce((quantity, item) => quantity + item.quantity, 0);
}

function calcTotal(subtotal, extraLines) {
    return subtotal + extraLines.reduce((total, extraLine) => total + extraLine.price, 0);
}

function addItem(state, product, options, quantity) {
    const itemIndex = findItemIndex(state.cartProducts, product, options);
    console.log("who let the dogs out pro")
    let newItems;
    //let { lastItemId } = state;

    if (itemIndex === -1) {
       // lastItemId += 1;
       console.log("who let the dogs out pro 1")
        newItems = [...state.cartProducts, {
            //id: lastItemId,
            //images:product.images.stringValue ? product.images.stringValue : product.images.arrayValue.values[0].stringValue
            mapValue:{fields : { images :product.images.stringValue ? {stringValue:product.images.stringValue} : {stringValue :product.images.arrayValue.values[0].stringValue } ,name :{stringValue :product.name.stringValue } ,price :{stringValue : product.price.stringValue} ,slug :{stringValue : product.slug.stringValue} }} ,
           // options: JSON.parse(JSON.stringify(options)),
           // price: parseInt(product.price.stringValue),
            total: parseInt(product.price.stringValue),

        }];

    } else {
        console.log("who let the dogs out pro 2")
        const item = state.cartProducts[itemIndex];

        newItems = [
            ...state.cartProducts.slice(0, itemIndex),
            {
                ...item,
                quantity: 1,
                total:  parseInt(item.mapValue.fields.price.stringValue),
            },
            ...state.cartProducts.slice(itemIndex + 1),
        ];

    }

    const subtotal = calcSubtotal(newItems);
    const total = calcTotal(subtotal, state.extraLines);
    console.log("🚀 ~ file: cartReducer.js ~ line 107 ~ addItem ~ newItems", newItems)
    return {
        ...state,
     //   lastItemId,
        subtotal,
        total,
        cartProducts: newItems,
        quantity: newItems.length//calcQuantity(newItems),
    };
}


function removeItem(state, itemId) {
    const { cartProducts } = state;
    const products = cartProducts//.data.fields.products.arrayValue.values;
    const newproducts = products.filter((item) => item.mapValue.fields.slug.stringValue !== itemId);
    const subtotal = calcSubtotal(newproducts);
    const total = calcTotal(subtotal, state.extraLines);

    return {
        ...state,
        cartProducts : newproducts,
        quantity:newproducts.length,
        // quantity: calcQuantity(newproducts),
        subtotal,
        total,
    };
}


function updateQuantities(state, quantities) {
    let needUpdate = false;
    const newItems = state.cartProducts.map((item) => {
item.total=item.quantity*parseInt(item.mapValue.fields.price.stringValue);
        const quantity = quantities.find((x) => x.productId === item.mapValue.fields.slug.stringValue && x.value !== item.quantity);
        if (!quantity) {
            return item;
        }
        needUpdate = true;
item.quantity=quantity.value;//////////////
        return {
            ...item,
            quantity: quantity.value,
            total: quantity.value * parseInt(item.mapValue.fields.price.stringValue),
        };
    });

    if (needUpdate) {
        const subtotal = calcSubtotal(newItems);
        const total = calcTotal(subtotal, state.extraLines);
        return {
            ...state,
            items: newItems,
            quantity: calcQuantity(newItems),
            subtotal,
            total,
        };
    }

    return state;
}

/*
* item example:
* {
*   id: 1,
*   product: {...}
*   options: [
*     {optionId: 1, optionTitle: 'Color', valueId: 1, valueTitle: 'Red'}
*   ],
*   price: 250,
*   quantity: 2,
*   total: 500
* }
* extraLine example:
* {
*   type: 'shipping',
*   title: 'Shipping',
*   price: 25
* }
*/
const initialState = {
    cartProducts:[],
    lastItemId: 0,
    quantity:0,
    items: [],
    subtotal: 0,
    extraLines: [ // shipping, taxes, fees, .etc
        {
            type: 'shipping',
            title: 'Shipping',
            price: 25,
        },
        {
            type: 'tax',
            title: 'Tax',
            price: 0,
        },
    ],
    total: 0,
};

export default function cartReducer(state = initialState, action) {

    switch (action.type) {

    case CART_ADD_ITEM:
        return addItem(state, action.product, action.options, action.quantity);

    case CART_REMOVE_ITEM:
        return removeItem(state, action.itemId);

    case CART_UPDATE_QUANTITIES:
        return updateQuantities(state, action.quantities);
    case GET_CART_DATA : return cartData(state,action.cartProducts);

    default:
        return state;
    }
}

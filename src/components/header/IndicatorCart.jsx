// react
import React,{useEffect,useState} from 'react';

// third-party
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// application
import AsyncAction from '../shared/AsyncAction';
import Currency from '../shared/Currency';
import Indicator from './Indicator';
import { Cart20Svg, Cross10Svg } from '../../svg';
import { cartRemoveItem } from '../../store/cart';
import { url } from '../../services/utils';
import { useDeferredData, useProductColumns, useProductTabs } from '../../services/hooks';
import shopApi from '../../api/shop';
import BlockLoader from '../blocks/BlockLoader';
import {getCartData} from '../../store/cart/cartActions';
import {getWishListData} from  '../../store/wishlist/wishlistActions';

function IndicatorCart(props) {
    const {  cartRemoveItem ,auth,getCartData,cart } = props;
    //const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let dropdown;
    let totals;
//console.log("auth ID : ",auth.uid );
// const myProducts = shopApi.getMyCart(auth.uid).then((cart)=>{
// setCart(cart.data.fields.products.arrayValue.values)

// })

//console.log("🚀 ~ file: IndicatorCart.jsx ~ line 30 ~ IndicatorCart ~ myProducts : ", myProducts)
//const cart = myProducts.data.data.fields.products.arrayValue.values;

useEffect(() => {
    let canceled = false;
//console.log("useEffect called")
    setIsLoading(true);
    getWishListData(auth.uid);
    getCartData(auth.uid);

    setIsLoading(false);

    return () => {
        canceled = true;
    };
},[]);

if (isLoading) {// this is very important to put it after useEffect...........................
    return <BlockLoader />;
}


    // if (cart.extraLines.length > 0) {
    //     const extraLines = cart.extraLines.map((extraLine, index) => (
    //         <tr key={index}>
    //             <th>{extraLine.title}</th>
    //             <td><Currency value={extraLine.price} /></td>
    //         </tr>
    //     ));

    //     totals = (
    //         <React.Fragment>
    //             <tr>
    //                 <th>Subtotal</th>
    //                 <td><Currency value={cart.subtotal} /></td>
    //             </tr>
    //             {extraLines}
    //         </React.Fragment>
    //     );
    // }

    const items = cart && cart.cartProducts.map((item) => {
        //console.log("hi man : ",item)
        let options;
        let image;

        // if (item.options) {
        //     options = (
        //         <ul className="dropcart__product-options">
        //             {item.options.map((option, index) => (
        //                 <li key={index}>{`${option.optionTitle}: ${option.valueTitle}`}</li>
        //             ))}
        //         </ul>
        //     );
        // }


            image = (
                <div className="product-image dropcart__product-image">
                    <Link to={url.product(item.mapValue.fields)} className="product-image__body">
                        <img className="product-image__img" src={item.mapValue.fields.images.stringValue} alt="" />
                    </Link>
                </div>
            );


        const removeButton = (
            <AsyncAction
                action={() => cartRemoveItem(item.mapValue.fields,auth.uid)}
                render={({ run, loading }) => {
                    const classes = classNames('dropcart__product-remove btn btn-light btn-sm btn-svg-icon', {
                        'btn-loading': loading,
                    });

                    return (
                        <button type="button" onClick={run} className={classes}>
                            <Cross10Svg />
                        </button>
                    );
                }}
            />
        );

        return (
            <div key={item.mapValue.fields.slug.stringValue} className="dropcart__product">
                {image}
                <div className="dropcart__product-info">
                    <div className="dropcart__product-name">
                        <Link to={url.product(item.mapValue.fields)}>{item.mapValue.fields.name.stringValue}</Link>
                    </div>
                    {options}
                    <div className="dropcart__product-meta">
                        <span className="dropcart__product-quantity">{item.quantity=1}</span>
                        {' × '}
                        <span className="dropcart__product-price"><Currency value={parseInt(item.mapValue.fields.price.stringValue)} /></span>
                    </div>
                </div>
                {removeButton}
            </div>
        );
    });

    if (cart.quantity) {
        dropdown = (
            <div className="dropcart">
                <div className="dropcart__products-list">
                    {items}
                </div>

                {/* <div className="dropcart__totals">
                    <table>
                        <tbody>
                            {totals}
                            <tr>
                                <th>Total</th>
                                <td><Currency value={cart.total} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div> */}

                <div className="dropcart__buttons">
                    <Link className="btn btn-secondary" to="/shop/cart">View Cart</Link>
                    <Link className="btn btn-primary" to="/shop/checkout">Checkout</Link>
                </div>
            </div>
        );
    } else {
        dropdown = (
            <div className="dropcart">
                <div className="dropcart__empty">
                    Your shopping cart is empty!
                </div>
            </div>
        );
    }

    return (
        <Indicator url="/shop/cart" dropdown={dropdown} value={cart.quantity} icon={<Cart20Svg />} />//here show the number of products in the cart
    );
}

const mapStateToProps = (state) => ({
    cart: state.cart,
    auth : state.firebase.auth
});

const mapDispatchToProps =(dispatch)=> {
    return{
    cartRemoveItem:(product,cartId) => dispatch(cartRemoveItem(product,cartId)),
    getCartData:(cartId) => dispatch(getCartData(cartId)),
    getWishListData:(wishListId) => dispatch(getWishListData(wishListId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(IndicatorCart);

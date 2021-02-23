// react
import React, { Component } from 'react';

// third-party
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// application
import AsyncAction from '../shared/AsyncAction';
import Currency from '../shared/Currency';
import InputNumber from '../shared/InputNumber';
import PageHeader from '../shared/PageHeader';
import { cartRemoveItem, cartUpdateQuantities } from '../../store/cart';
import { Cross12Svg } from '../../svg';
import { url } from '../../services/utils';
import { Redirect } from 'react-router-dom'

import shopApi from '../../api/shop'

// data stubs
import theme from '../../data/theme';
import {getCartData} from '../../store/cart/cartActions'

class ShopPageCart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            /** example: [{itemId: 8, value: 1}] */
            quantities: [],


        };
    }
    // componentWillMount(){
    //     console.log("fck me hard first");
    //     const { auth} = this.props;
    //     this.props.getCartData(auth.uid);
    //   }
    // componentDidMount() {
    //     console.log("fck me hard second")
    //     const { auth} = this.props;



    //   }
    //   componentDidUpdate() {
    //     this.render();
    //   }

    getItemQuantity(product) {
        const productId = product.mapValue.fields.slug.stringValue;
        const { quantities } = this.state;
        const quantity = quantities.find((x) => x.productId ===  productId );

        return quantity ? quantity.value : product.quantity=1;
    }

    handleChangeQuantity = (product, quantity) => {
        const productId = product.mapValue.fields.slug.stringValue;
        this.setState((state) => {
            const stateQuantity = this.state.quantities.find((x) => x.productId ===productId );

            if (!stateQuantity) {
                state.quantities.push({ productId: productId, value: quantity });
            } else {
                stateQuantity.value = quantity;
            }

            return {
                quantities: state.quantities,
            };
        });
    };

    cartNeedUpdate() {
        const { quantities,productsArr } = this.state;
        const { cart } = this.props;

        return quantities.filter((x) => {
            //const item = cart.items.find((item) => item.id === x.itemId);
           const product = cart.cartProducts.find((product) => product.mapValue.fields.slug.stringValue === x.productId);

            return product && product.quantity !== x.value && x.value !== '';
        }).length > 0;
    }

    renderItems() {
        const {  cartRemoveItem,auth,cartProducts } = this.props;
        if (!auth.uid) return <Redirect to='/' />
//console.log("cart from render : ",cart);

const productsArr = cartProducts;
return productsArr.map((product)=>{
    let image;
    const productQ = this.getItemQuantity(product);
        image = (
            <div className="product-image">
                <Link to={url.product(product.mapValue.fields)} className="product-image__body">
                    <img className="product-image__img" src={product.mapValue.fields.images.stringValue} alt="" />
                </Link>
            </div>
        );

        const removeButton = (
            <AsyncAction
                action={() => cartRemoveItem(product.mapValue.fields,auth.uid)}
                render={({ run, loading }) => {
                    const classes = classNames('btn btn-light btn-sm btn-svg-icon', {
                        'btn-loading': loading,
                    });

                    return (
                        <button type="button" onClick={run} className={classes}>
                            <Cross12Svg />
                        </button>
                    );
                }}
            />
        );
        return (
            <tr key={product.mapValue.fields.slug.stringValue} className="cart-table__row">
                <td className="cart-table__column cart-table__column--image">
                    {image}
                </td>
                <td className="cart-table__column cart-table__column--product">
                    <Link to={url.product(product.mapValue.fields)} className="cart-table__product-name">
                        {product.mapValue.fields.name.stringValue}
                    </Link>
                    {/* {options} */}
                </td>
                <td className="cart-table__column cart-table__column--price" data-title="Price">
                    <Currency value={parseInt(product.mapValue.fields.price.stringValue)} />
                </td>
                <td className="cart-table__column cart-table__column--quantity" data-title="Quantity">
                    <InputNumber
                        onChange={(quantity) => this.handleChangeQuantity(product, quantity)}
                        value={this.getItemQuantity(product)}
                        min={1}
                    />
                </td>
                <td className="cart-table__column cart-table__column--total" data-title="Total">
                    <Currency value={parseInt(product.mapValue.fields.price.stringValue)*productQ} />
                </td>
                <td className="cart-table__column cart-table__column--remove">
                    {removeButton}
                </td>
            </tr>
        );





})


    }
    getSubTotal(){
    const {quantities,productsArr} = this.state;
    var subtotal=0;
    quantities.map((q)=>{
        const product =  productsArr.find(x=>x.mapValue.fields.slug.stringValue==q.productId);
subtotal += parseInt(product.mapValue.fields.price.stringValue) * q.value;
//console.log("getSubtotoal : ",q.value)

     })
   //.log("subtotole : ",subtotal)

return subtotal

}
    renderTotals() {
       const { cart } = this.props;


        if (cart.extraLines.length <= 0) {
            return null;
        }

        const extraLines = cart.extraLines.map((extraLine, index) => {
            let calcShippingLink;

            if (extraLine.type === 'shipping') {
                calcShippingLink = <div className="cart__calc-shipping"><Link to="/">Calculate Shipping</Link></div>;
            }

            return (
                <tr key={index}>
                    <th>{extraLine.title}</th>
                    <td>
                        <Currency value={extraLine.price} />
                        {calcShippingLink}
                    </td>
                </tr>
            );
        });

        return (
            <React.Fragment>
                <thead className="cart__totals-header">
                    <tr>
                        <th>Subtotal</th>
                        <td><Currency value={cart.subtotal} /></td>
                    </tr>
                </thead>
                <tbody className="cart__totals-body">
                    {extraLines}
                </tbody>
            </React.Fragment>
        );
    }

    renderCart() {
        const { cart, cartUpdateQuantities,cartProducts } = this.props;
        const { quantities } = this.state;

        const updateCartButton = (
            <AsyncAction
                action={() => cartUpdateQuantities(quantities)}
                render={({ run, loading }) => {
                    const classes = classNames('btn btn-primary cart__update-button', {
                        'btn-loading': loading,
                    });

                    return (
                        <button type="button" onClick={run} className={classes} disabled={!this.cartNeedUpdate()} >
                            Update Cart
                        </button>
                    );
                }}
            />
        );

        return (
            <div className="cart block">
                <div className="container">
                    <table className="cart__table cart-table">
                        <thead className="cart-table__head">
                            <tr className="cart-table__row">
                                <th className="cart-table__column cart-table__column--image">Image</th>
                                <th className="cart-table__column cart-table__column--product">Product</th>
                                <th className="cart-table__column cart-table__column--price">Price</th>
                                <th className="cart-table__column cart-table__column--quantity">Quantity</th>
                                <th className="cart-table__column cart-table__column--total">Total</th>
                                <th className="cart-table__column cart-table__column--remove" aria-label="Remove" />
                            </tr>
                        </thead>
                        <tbody className="cart-table__body">
                            {this.renderItems()}
                        </tbody>
                    </table>
                    <div className="cart__actions">
                        <form className="cart__coupon-form">
                            <label htmlFor="input-coupon-code" className="sr-only">Password</label>
                            <input type="text" className="form-control" id="input-coupon-code" placeholder="Coupon Code" />
                            <button type="submit" className="btn btn-primary">Apply Coupon</button>
                        </form>
                        <div className="cart__buttons">
                            <Link to="/" className="btn btn-primary">Continue Shopping</Link>
                            {updateCartButton}
                        </div>
                    </div>

                    <div className="row justify-content-end pt-md-5 pt-4">
                        <div className="col-12 col-md-7 col-lg-6 col-xl-5">
                            <div className="card">
                                <div className="card-body">
                                    <h3 className="card-title">Cart Totals</h3>
                                    <table className="cart__totals">
                                        {this.renderTotals()}
                                        <tfoot className="cart__totals-footer">
                                            <tr>
                                                <th>Total</th>
                                                <td><Currency value={cart.total} /></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                    <Link to="/shop/checkout" className="btn btn-primary btn-xl btn-block cart__checkout-button">
                                        Proceed to checkout
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const {auth}= this.props;

        const { cart ,cartProducts} = this.props;
     //   console.log("fck me : ",cart.lastItemId)
     //   console.log("cart baby : ",cart)
//console.log("cart products : ",cartProducts)


        const breadcrumb = [
            { title: 'Home', url: '' },
            { title: 'Shopping Cart', url: '' },
        ];

        let content;
console.log("cart q : ",cart.quantity)
        if (cart.quantity) {
            content = this.renderCart();
        } else {
            content = (
                <div className="block block-empty">
                    <div className="container">
                        <div className="block-empty__body">
                            <div className="block-empty__message">Your shopping cart is empty!</div>
                            <div className="block-empty__actions">
                                <Link to="/" className="btn btn-primary btn-sm">Continue</Link>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <React.Fragment>
                <Helmet>
                    <title>{`Shopping Cart — ${theme.name}`}</title>
                </Helmet>

                <PageHeader header="Shopping Cart" breadcrumb={breadcrumb} />

                {content}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    cart: state.cart,
    cartProducts: state.cart.cartProducts,
    auth : state.firebase.auth
});

const mapDispatchToProps =(dispatch)=> {
    return{
    cartRemoveItem : (product,cartId)=>dispatch(cartRemoveItem(product,cartId)),
    cartUpdateQuantities:(quantities)=>dispatch(cartUpdateQuantities(quantities)),
    getCartData:(userId) => dispatch(getCartData(userId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopPageCart);

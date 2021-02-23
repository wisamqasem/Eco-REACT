// react
import React,{useEffect,useState,Component} from 'react';

// third-party
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// application
import AsyncAction from '../shared/AsyncAction';
import Currency from '../shared/Currency';
import PageHeader from '../shared/PageHeader';
import Rating from '../shared/Rating';
import { cartAddItem } from '../../store/cart';
import { Cross12Svg } from '../../svg';
import BlockLoader from '../blocks/BlockLoader';
import { url } from '../../services/utils';
import { wishlistRemoveItem } from '../../store/wishlist';
import {getWishListData} from  '../../store/wishlist/wishlistActions';
import { Redirect } from 'react-router-dom'
// data stubs
import theme from '../../data/theme';


class ShopPageWishlist extends Component{
//function ShopPageWishlist(props) {






     componentWillMount(){

        const { auth} = this.props;
       // this.props.getWishListData(auth.uid);
      }
render(){

    const { wishlist, cartAddItem, wishlistRemoveItem,auth } = this.props;
    if (!auth.uid) return <Redirect to='/' />



    const breadcrumb = [
        { title: 'Home', url: '' },
        { title: 'Wishlist', url: '' },
    ];



    let content;

   // console.log("wishlist : ",wishlist);
    if (wishlist.length) {
        const itemsList = wishlist.map((item,index) => {
            let image;

//item.images.arrayValue.values.length
           // if (item.images.arrayValue.values.length > 0) {
                image = (
                    <div className="product-image">
                        <Link to={url.product(item.mapValue.fields)} className="product-image__body">
                            <img className="product-image__img" src={item.mapValue.fields.images.stringValue} alt="" />
                        </Link>
                    </div>
                );
         //   }

            const renderAddToCartButton = ({ run, loading }) => {
                const classes = classNames('btn btn-primary btn-sm', {
                    'btn-loading': loading,
                });

                return <button type="button" onClick={run} className={classes}>Add To Cart</button>;
            };

            const renderRemoveButton = ({ run, loading }) => {
                const classes = classNames('btn btn-light btn-sm btn-svg-icon', {
                    'btn-loading': loading,
                });

                return <button type="button" onClick={run} className={classes} aria-label="Remove"><Cross12Svg /></button>;
            };


            const badge =(badge)=>{
                if(badge == 'new')
                return <div key="new" className="product-card__badge product-card__badge--new">New</div>
                else if (badge == 'hot')
                return <div key="hot" className="product-card__badge product-card__badge--hot">Hot</div>
                else if (badge == 'used')
                return <div key="used" className="product-card__badge product-card__badge--used">Used</div>
                else if (badge == 'sale')
                return <div key="sale" className="product-card__badge product-card__badge--sale">Sale</div>
            }

            return (
                <tr key={index} className="wishlist__row">
                    <td className="wishlist__column wishlist__column--image">
                        {image}
                    </td>
                    <td className="wishlist__column wishlist__column--product">
                        <Link to={url.product(item.mapValue.fields)} className="wishlist__product-name">{item.mapValue.fields.name.stringValue}</Link>
                        <div className="wishlist__product-rating">
                            <Rating value={parseInt(item.mapValue.fields.rating.stringValue)} />
                            {/* <div className="wishlist__product-rating-legend">{`${item.reviews} Reviews`}</div> */}
                        </div>
                    </td>
                    <td className="wishlist__column wishlist__column--stock">
                      {badge(item.mapValue.fields.badges.stringValue)}  {/* <div className="badge badge-success">In Stock</div> */}
                    </td>
                    <td className="wishlist__column wishlist__column--price"><Currency value={parseInt(item.mapValue.fields.price.stringValue)} /></td>
                    <td className="wishlist__column wishlist__column--tocart">
                        <AsyncAction
                            action={() => cartAddItem(item.mapValue.fields)}
                            render={renderAddToCartButton}
                        />
                    </td>
                    <td className="wishlist__column wishlist__column--remove">
                        <AsyncAction
                            action={() => wishlistRemoveItem(item.mapValue.fields,auth.uid)}
                            render={renderRemoveButton}
                        />
                    </td>
                </tr>
            );
        });

        content = (
            <div className="block">
                <div className="container">
                    <table className="wishlist">
                        <thead className="wishlist__head">
                            <tr className="wishlist__row">
                                <th className="wishlist__column wishlist__column--image">Image</th>
                                <th className="wishlist__column wishlist__column--product">Product</th>
                                <th className="wishlist__column wishlist__column--stock">Stock Status</th>
                                <th className="wishlist__column wishlist__column--price">Price</th>
                                <th className="wishlist__column wishlist__column--tocart" aria-label="Add to cart" />
                                <th className="wishlist__column wishlist__column--remove" aria-label="Remove" />
                            </tr>
                        </thead>
                        <tbody className="wishlist__body">
                            {itemsList}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    } else {
        content = (
            <div className="block block-empty">
                <div className="container">
                    <div className="block-empty__body">
                        <div className="block-empty__message">Your wish list is empty!</div>
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
                <title>{`Wish List — ${theme.name}`}</title>
            </Helmet>

            <PageHeader header="Wishlist" breadcrumb={breadcrumb} />

            {content}
        </React.Fragment>
    );















}


}

const mapStateToProps = (state) => ({
    wishlist: state.wishlist.wishListProducts,
    auth : state.firebase.auth
});

const mapDispatchToProps =(dispatch) => {
    return{
    cartAddItem:(product)=>dispatch(cartAddItem(product)),
    wishlistRemoveItem : (wishListProduct,wishListId)=> dispatch(wishlistRemoveItem(wishListProduct,wishListId)),
    getWishListData:(wishListId) => dispatch(getWishListData(wishListId))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ShopPageWishlist);

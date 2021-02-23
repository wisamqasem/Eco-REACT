// react
import React,{useEffect,useState} from 'react';

// third-party
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// application
import CartIndicator from './IndicatorCart';
import Departments from './Departments';
import Indicator from './Indicator';
import IndicatorAccount from './IndicatorAccount';
import IndicatorSearch from './IndicatorSearch';
import NavLinks from './NavLinks';
import { Heart20Svg, LogoSmallSvg,Compare16Svg } from '../../svg';
import Search from './Search';

import {getCompareData} from '../../store/compare/compareActions';
import {getCartData} from '../../store/cart/cartActions';
import {getWishListData} from  '../../store/wishlist/wishlistActions';
import BlockLoader from '../blocks/BlockLoader';

function NavPanel(props) {
    const { layout, wishlist,compare,auth } = props;
    console.log("🚀 ~ file: NavPanel.jsx ~ line 20 ~ NavPanel ~ compare", compare)

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        let canceled = false;
    console.log("useEffect called")
        setIsLoading(true);
if(auth.uid){
        props.getWishListData(auth.uid);
        props.getCompareData(auth.uid);
        props.getCartData(auth.uid);
    }
        setIsLoading(false);

        return () => {
            canceled = true;
        };
    },[]);

    if (isLoading) {// this is very important to put it after useEffect...........................
        return <BlockLoader />;
    }


    let logo = null;
    let departments = null;
    let searchIndicator;

    if (layout === 'compact') {
        logo = (
            <div className="nav-panel__logo">
                <Link to="/"><LogoSmallSvg /></Link>
            </div>
        );

        searchIndicator = <IndicatorSearch />;
    }

    if (layout === 'default') {
        departments = (
            <div className="nav-panel__departments">
                <Departments />
            </div>
        );
    }

    return (
        <div className="nav-panel">
            <div className="nav-panel__container container">
                <div className="nav-panel__row">
                    {logo}
                    {departments}


                    {/* make this comment , no need for the nav links ..................................*/}
                    <div className="nav-panel__nav-links nav-links">
                        <NavLinks />
                    </div>

                    <div className="nav-panel__indicators">
                        {searchIndicator}
{ auth.uid ?  <Indicator url="/shop/wishlist" value={wishlist.length} icon={<Heart20Svg />} /> : null}
{ auth.uid ?  <Indicator url="/shop/compare" value={compare.length} icon={<Compare16Svg />} /> : null}
{ auth.uid ?    <CartIndicator />: null}

                        <IndicatorAccount />
                    </div>
                </div>
            </div>
        </div>
    );
}

NavPanel.propTypes = {
    /** one of ['default', 'compact'] (default: 'default') */
    layout: PropTypes.oneOf(['default', 'compact']),
};

NavPanel.defaultProps = {
    layout: 'default',
};

const mapStateToProps = (state) => ({
    wishlist: state.wishlist.wishListProducts,
    compare : state.compare.compareListProducts,
    auth : state.firebase.auth,
});

const mapDispatchToProps =(dispatch) =>{
    return{

        getCartData:(cartId) => dispatch(getCartData(cartId)),
        getCompareData:(compareListId) => dispatch(getCompareData(compareListId)),
        getWishListData:(wishListId) => dispatch(getWishListData(wishListId))
        }


};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NavPanel);

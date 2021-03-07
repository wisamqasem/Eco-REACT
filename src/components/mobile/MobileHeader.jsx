// react
import React, { Component } from 'react';

// third-party
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import IndicatorAccount from '../header/IndicatorAccount';
// application
import Indicator from '../header/Indicator';
import {
    Menu18x14Svg,
    LogoSmallSvg,
    Search20Svg,
    Heart20Svg,
    Cart20Svg,
    Compare16Svg
} from '../../svg';
import { mobileMenuOpen } from '../../store/mobile-menu';
import Search from '../header/Search';

class MobileHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchOpen: false,
        };
        this.searchInput = React.createRef();
    }

    componentDidUpdate(prevProps, prevState) {
        const { searchOpen } = this.state;

        if (searchOpen && searchOpen !== prevState.searchOpen && this.searchInput.current) {
            this.searchInput.current.focus();
        }
    }

    handleOpenSearch = () => {
        this.setState(() => ({ searchOpen: true }));
    };

    handleCloseSearch = () => {
        this.setState(() => ({ searchOpen: false }));
    };

    render() {
        const { openMobileMenu, wishlist, cart ,products} = this.props;

        const { searchOpen } = this.state;
        const searchClasses = classNames('mobile-header__search', {
            'mobile-header__search--open': searchOpen,
        });

        return (
            <div className="mobile-header">
                <div className="mobile-header__panel">
                    <div className="container">
                        <div className="mobile-header__body">
                            <button type="button" className="mobile-header__menu-button" onClick={openMobileMenu}>
                                <Menu18x14Svg />
                            </button>
                            <Link to="/" className="mobile-header__logo"><LogoSmallSvg /></Link>
                            <Search
                                context="mobile-header"
                                className={searchClasses}
                                inputRef={this.searchInput}
                                onClose={this.handleCloseSearch}
                            />
                            <div className="mobile-header__indicators">
                                <Indicator
                                    className="indicator--mobile indicator--mobile-search d-md-none"
                                    onClick={this.handleOpenSearch}
                                    icon={<Search20Svg />}
                                />
                                <Indicator
                                    // className="indicator--mobile d-sm-flex d-none"
                                    className="indicator--mobile"
                                    url="/shop/wishlist"
                                    value={wishlist ? wishlist.length : 0}
                                    icon={<Heart20Svg />}
                                />
                                <Indicator
                                    className="indicator--mobile"
                                    url="/shop/compare"
                                    value={products ? products.length: 0}
                                    icon={<Compare16Svg />}
                                />
                                <Indicator
                                    className="indicator--mobile"
                                    url="/shop/cart"
                                    value={cart.quantity}
                                    icon={<Cart20Svg />}
                                />
                                <IndicatorAccount />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    cart: state.cart,
    cartProducts: state.cart.cartProducts,
    wishlist: state.wishlist.wishListProducts,
    products: state.compare.compareListProducts,
    auth : state.firebase.auth
});

const mapDispatchToProps = {
    openMobileMenu: mobileMenuOpen,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MobileHeader);

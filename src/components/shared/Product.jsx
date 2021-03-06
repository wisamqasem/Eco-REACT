// react
import React, { Component } from 'react';

// third-party
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// application
import AsyncAction from './AsyncAction';
import Currency from './Currency';
import InputNumber from './InputNumber';
import ProductGallery from './ProductGallery';
import Rating from './Rating';
import { cartAddItem } from '../../store/cart';
import { compareAddItem } from '../../store/compare';
import { Wishlist16Svg, Compare16Svg } from '../../svg';
import { wishlistAddItem } from '../../store/wishlist';
import {url} from '../../services/utils'

class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quantity: 1,
        };
    }

    handleChangeQuantity = (quantity) => {
        this.setState({ quantity });
    };

    render() {
        const {
            product,
            layout,
            wishlistAddItem,
            compareAddItem,
            cartAddItem,
            categories
        } = this.props;


            const colors = [
                { slug: 'white', color: '#fff' },
                { slug: 'silver', color: '#d9d9d9' },
                { slug: 'light-gray', color: '#b3b3b3' },
                { slug: 'gray', color: '#808080' },
                { slug: 'dark-gray', color: '#666' },
                { slug: 'coal', color: '#4d4d4d' },
                { slug: 'black', color: '#262626' },
                { slug: 'red', color: '#ff4040' },
                { slug: 'orange', color: '#ff8126' },
                { slug: 'yellow', color: '#ffd333' },
                { slug: 'pear-green', color: '#becc1f' },
                { slug: 'green', color: '#8fcc14' },
                { slug: 'emerald', color: '#47cc5e' },
                { slug: 'shamrock', color: '#47cca0' },
                { slug: 'shakespeare', color: '#47cccc' },
                { slug: 'blue', color: '#40bfff' },
                { slug: 'dark-blue', color: '#3d6dcc' },
                { slug: 'violet', color: '#7766cc' },
                { slug: 'purple', color: '#b852cc' },
                { slug: 'cerise', color: '#e53981' },
            ];
            const colorsArr = product.colors.arrayValue.values ? product.colors.arrayValue.values : [];
      //  const product =  (this.props.product.fields ? this.props.product.fields : this.props.product.document.fields ) ;// i make that cuse if u come from the block of my products the form of data is deferent then if u come from onther page.
        const { quantity } = this.state;
        let prices;

        if (product.compareAtPrice.stringValue) {
            prices = (
                <React.Fragment>
                    <span className="product__new-price"><Currency value={parseInt(product.price.stringValue)} /></span>
                    {' '}
                    <span className="product__old-price"><Currency value={parseInt(product.compareAtPrice.stringValue)} /></span>
                </React.Fragment>
            );
        } else {
            prices = <Currency value={parseInt(product.price.stringValue)} />;
        }

        return (
            <div className={`product product--layout--${layout}`}>
                <div className="product__content">
                    <ProductGallery layout={layout} images={product.images.arrayValue.values} />

                    <div className="product__info">
                        <div className="product__wishlist-compare">
                            <AsyncAction
                                action={() => wishlistAddItem(product)}
                                render={({ run, loading }) => (
                                    <button
                                        type="button"
                                        data-toggle="tooltip"
                                        data-placement="right"
                                        title="Wishlist"
                                        onClick={run}
                                        className={classNames('btn btn-sm btn-light btn-svg-icon', {
                                            'btn-loading': loading,
                                        })}
                                    >
                                        <Wishlist16Svg />
                                    </button>
                                )}
                            />
                            <AsyncAction
                                action={() => compareAddItem(product)}
                                render={({ run, loading }) => (
                                    <button
                                        type="button"
                                        data-toggle="tooltip"
                                        data-placement="right"
                                        title="Compare"
                                        onClick={run}
                                        className={classNames('btn btn-sm btn-light btn-svg-icon', {
                                            'btn-loading': loading,
                                        })}
                                    >
                                        <Compare16Svg />
                                    </button>
                                )}
                            />
                        </div>
                        <h1 className="product__name">{product.name.stringValue}</h1>
                        <div className="product__rating">
                            <div className="product__rating-stars">
                            {/* ((Overall Rating * Total people Rated) + new Rating) / (Total people Rated + 1) */}
                                <Rating value={parseInt(product.rating.stringValue)} />
                            </div>
                            <div className="product__rating-legend">
                                {/* <Link to="/">{`${product.reviews.arrayValue.length} Reviews`}</Link> */}
                                {/* <span>/</span> */}
                                {/* <Link to="/">Write A Review</Link> */}
                            </div>
                        </div>
                        <div className="product__description">
                           {/* {product.description.stringValue} */}
                        </div>
                        <ul className="product__features">
                            <li>Speed: 750 RPM</li>
                            <li>Power Source: Cordless-Electric</li>
                            <li>Battery Cell Type: Lithium</li>
                            <li>Voltage: 20 Volts</li>
                            <li>Battery Capacity: 2 Ah</li>
                        </ul>
                        <ul className="product__meta">
                            <li className="product__meta-availability">
                                Availability:
                                {' '}


  {product.availability.stringValue == 'In stock' ?  <span className="text-success">In Stock</span> : null}
  {product.availability.stringValue == 'Sold out' ?  <span className="text-danger">Sold Out</span> : null}
  {product.availability.stringValue == 'Out of order' ?  <span className="text-danger">Out of order</span> : null}








                                {/* <span className="text-success">In Stock</span> */}
                            </li>
                            <li>
                                Brand :
                                <Link style={{ color: 'blue' }} to={url.brand(product.subCategory.stringValue,product.categories.stringValue,product.brand.stringValue)}>{product.brand.stringValue.toUpperCase()}</Link>
                            </li>
                            {/* <li>SKU: 83690/32</li> */}
                        </ul>
                    </div>

                    <div className="product__sidebar">
                        <div className="product__availability">
                            Availability:
                            {' '}
                            {product.availability.stringValue == 'In stock' ?  <span className="text-success">In Stock</span> : null}
  {product.availability.stringValue == 'Sold out' ?  <span className="text-danger">Sold Out</span> : null}
  {product.availability.stringValue == 'Out of order' ?  <span className="text-danger">Out of order</span> : null}
                        </div>

                        <div className="product__prices">
                            {prices}
                        </div>

                        <form className="product__options">
                            <div className="form-group product__option">
                            {colorsArr.length ?
                            <div>
                            <div className="product__option-label">Colors</div>
                                <div className="input-radio-color">
                                    <div className="input-radio-color__list">
                                    {

                                        colorsArr.map((c,index)=>{
                                            const color = colors.find(x=>x.slug==c.stringValue);
                                          //  console.log("🚀 ~ file: Product.jsx ~ line 193 ~ Product ~ product.colors.arrayValue.values.map ~  color",  color)
                                            return(
                                            <label
                                            key={index}
                                            className="input-radio-color__item"
                                            style={{ color: color.color }}
                                            data-toggle="tooltip"
                                            //title="Yellow"
                                        >
                                            <input type="radio" name="color" />
                                            <span />
                                        </label>)
                                        })
                                         }
                                        {/* <label
                                            className="input-radio-color__item input-radio-color__item--white"
                                            style={{ color: '#fff' }}
                                            data-toggle="tooltip"
                                            title="White"
                                        >
                                            <input type="radio" name="color" />
                                            <span />
                                        </label>
                                        <label
                                            className="input-radio-color__item"
                                            style={{ color: '#ffd333' }}
                                            data-toggle="tooltip"
                                            title="Yellow"
                                        >
                                            <input type="radio" name="color" />
                                            <span />
                                        </label> */}
                                        {/* <label
                                            className="input-radio-color__item"
                                            style={{ color: '#ff4040' }}
                                            data-toggle="tooltip"
                                            title="Red"
                                        >
                                            <input type="radio" name="color" />
                                            <span />
                                        </label>
                                        <label
                                            className="input-radio-color__item input-radio-color__item--disabled"
                                            style={{ color: '#4080ff' }}
                                            data-toggle="tooltip"
                                            title="Blue"
                                        >
                                            <input type="radio" name="color" disabled />
                                            <span />
                                        </label> */}
                                    </div>

                                </div>
                                </div>
                            :
                            null
                            }
                                </div>
                            {/* <div className="form-group product__option">
                                <div className="product__option-label">Material</div>
                                <div className="input-radio-label">
                                    <div className="input-radio-label__list">
                                        <label>
                                            <input type="radio" name="material" />
                                            <span>Metal</span>
                                        </label>
                                        <label>
                                            <input type="radio" name="material" />
                                            <span>Wood</span>
                                        </label>
                                        <label>
                                            <input type="radio" name="material" disabled />
                                            <span>Plastic</span>
                                        </label>
                                    </div>
                                </div>
                            </div> */}
                            <div className="form-group product__option">
                                {/* <label htmlFor="product-quantity" className="product__option-label">Quantity</label> */}
                                <div className="product__actions">
                                    {/* <div className="product__actions-item">
                                        <InputNumber
                                            id="product-quantity"
                                            aria-label="Quantity"
                                            className="product__quantity"
                                            size="lg"
                                            min={1}
                                            value={quantity}
                                            onChange={this.handleChangeQuantity}
                                        />
                                    </div> */}
                                    <div className="product__actions-item product__actions-item--addtocart">
                                        <AsyncAction
                                            action={() => cartAddItem(product, [], quantity)}
                                            render={({ run, loading }) => (
                                                <button
                                                    type="button"
                                                    onClick={run}
                                                    disabled={!quantity}
                                                    className={classNames('btn btn-primary btn-lg', {
                                                        'btn-loading': loading,
                                                    })}
                                                >
                                                    Add to cart
                                                </button>
                                            )}
                                        />
                                    </div>
                                    <div className="product__actions-item product__actions-item--wishlist">
                                        <AsyncAction
                                            action={() => wishlistAddItem(product)}
                                            render={({ run, loading }) => (
                                                <button
                                                    type="button"
                                                    data-toggle="tooltip"
                                                    title="Wishlist"
                                                    onClick={run}
                                                    className={classNames('btn btn-secondary btn-svg-icon btn-lg', {
                                                        'btn-loading': loading,
                                                    })}
                                                >
                                                    <Wishlist16Svg />
                                                </button>
                                            )}
                                        />
                                    </div>
                                    <div className="product__actions-item product__actions-item--compare">
                                        <AsyncAction
                                            action={() => compareAddItem(product)}
                                            render={({ run, loading }) => (
                                                <button
                                                    type="button"
                                                    data-toggle="tooltip"
                                                    title="Compare"
                                                    onClick={run}
                                                    className={classNames('btn btn-secondary btn-svg-icon btn-lg', {
                                                        'btn-loading': loading,
                                                    })}
                                                >
                                                    <Compare16Svg />
                                                </button>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="product__footer">
                        {/* <div className="product__tags tags">
                            <div className="tags__list">
                                <Link to="/">Mounts</Link>
                                <Link to="/">Electrodes</Link>
                                <Link to="/">Chainsaws</Link>
                            </div>
                        </div> */}

                        <div className="product__share-links share-links">
                            <ul className="share-links__list">
                                {/* <li className="share-links__item share-links__item--type--like"><Link to="/">Like</Link></li>
                                <li className="share-links__item share-links__item--type--tweet"><Link to="/">Tweet</Link></li>
                                <li className="share-links__item share-links__item--type--pin"><Link to="/">Pin It</Link></li>
                                <li className="share-links__item share-links__item--type--counter"><Link to="/">4K</Link></li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Product.propTypes = {
    /** product object */
    product: PropTypes.object.isRequired,
    /** one of ['standard', 'sidebar', 'columnar', 'quickview'] (default: 'standard') */
    layout: PropTypes.oneOf(['standard', 'sidebar', 'columnar', 'quickview']),
};

Product.defaultProps = {
    layout: 'standard',
};


const mapStateToProps = (state) => {
    return{
        categories : state.categories.categories
    }
  }

const mapDispatchToProps = {
    cartAddItem,
    wishlistAddItem,
    compareAddItem,
};

// export default connect(
//     () => ({}),
//     mapDispatchToProps,mapStateToProps
// )(Product);
export default connect(mapStateToProps, mapDispatchToProps)(Product)

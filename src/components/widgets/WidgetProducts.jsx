// react
import React from 'react';

// third-party
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// application
import Currency from '../shared/Currency';
import { url } from '../../services/utils';

function WidgetProducts(props) {
    const { title, products } = props;
    console.log("🚀 ~ file: WidgetProducts.jsx ~ line 14 ~ WidgetProducts ~ products : ", products)

    const productsList = products.map((product,index) => {
        let image;
        let price;
product=product.fields;
       // if (product.images && product.images.length > 0) {
            image = (
                <div className="widget-products__image">
                    <div className="product-image">
                        <Link to={url.product(product)} className="product-image__body">
                            <img className="product-image__img" src={product.images.arrayValue.values[0].stringValue} alt="" />
                        </Link>
                    </div>
                </div>
            );
       // }

        if (product.compareAtPrice.stringValue) {
            price = (
                <React.Fragment>
                    <span className="widget-products__new-price"><Currency value={parseInt(product.price.stringValue)} /></span>
                    {' '}
                    <span className="widget-products__old-price"><Currency value={parseInt(product.compareAtPrice.stringValue)} /></span>
                </React.Fragment>
            );
        } else {
            price = <Currency value={parseInt(product.price.stringValue)} />;
        }

        return (
            <div key={ index} className="widget-products__item">
                {image}
                <div className="widget-products__info">
                    <div className="widget-products__name">
                        <Link to={url.product(product)}>{product.name.stringValue}</Link>
                    </div>
                    <div className="widget-products__prices">
                        {price}
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className="widget-products widget">
            <h4 className="widget__title">{title}</h4>
            <div className="widget-products__list">
                {productsList}
            </div>
        </div>
    );
}

WidgetProducts.propTypes = {
    /**
     * widget title
     */
    title: PropTypes.node,
    /**
     * array of product objects
     */
    products: PropTypes.array,
};

WidgetProducts.defaultProps = {
    products: [],
};

export default WidgetProducts;

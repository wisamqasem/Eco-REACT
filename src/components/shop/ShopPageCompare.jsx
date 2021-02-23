// react
import React from 'react';

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
import { compareRemoveItem } from '../../store/compare';
import { Redirect } from 'react-router-dom'
import { url } from '../../services/utils';


// data stubs
import theme from '../../data/theme';

function ShopPageCompare(props) {
    const {  products,compareRemoveItem, cartAddItem,auth } = props;
    if (!auth.uid) return <Redirect to='/' />
    console.log("🚀 ~ file: ShopPageCompare.jsx ~ line 27 ~ ShopPageCompare ~ products", products)



  //  const products = [{attributes:[],images:[],slug:{stringValue:'product7'},name:'product7'},{attributes:[],images:[],slug:{stringValue:'product8'},name:'product8'},{attributes:[],images:[],slug:{stringValue:'product9'},name:'product9'}]
    const breadcrumb = [
        { title: 'Home', url: '' },
        { title: 'Comparison', url: '' },
    ];


    let content;

    if (products.length) {
        const attributes = [];

        // products.forEach((product) =>
        //  product.attributes.forEach((productAttribute) => {
        //     let attribute = attributes.find((x) => x.name === productAttribute.name);

        //     if (!attribute) {
        //         attribute = {
        //             name: productAttribute.name,
        //             values: {},
        //         };
        //         attributes.push(attribute);
        //     }

        //     attribute.values[product.id] = productAttribute.values.map((x) => x.name).join(', ');
        // }));

        const productInfoRow = products.map((product,index) => {
            let image;


                image = (
                    <div className="compare-table__product-image product-image">
                        <div className="product-image__body">
                            <img className="product-image__img" src={product.mapValue.fields.images.stringValue} alt="" />
                        </div>
                    </div>
                );


            return (
                <td key={index}>
                    <Link to={url.product(product.mapValue.fields)} className="compare-table__product-link">
                        {image}
                        <div className="compare-table__product-name">{product.mapValue.fields.name.stringValue}</div>
                    </Link>
                </td>
            );
        });

        const ratingRow = products.map((product,index) => (
            <td key={ index}>
                <div className="compare-table__product-rating">
                    <Rating value={parseInt(product.mapValue.fields.rating.stringValue)} />
                </div>
                <div className=" compare-table__product-rating-legend">
                    {`${product.mapValue.fields.reviews.stringValue} Reviews`}
                </div>
            </td>
        ));

        const availabilityRow = products.map((product,index) => {
            let badge;

            if (product.mapValue.fields.availability.stringValue === 'In stock') {
                badge = <span className="compare-table__product-badge badge badge-success">In Stock</span>;
            }
           else if (product.mapValue.fields.availability.stringValue === 'Sold out') {
                badge = <span className="compare-table__product-badge badge text-danger">Sold out</span>;
            }
           else if (product.mapValue.fields.availability.stringValue === 'Out of order') {
                badge = <span className="compare-table__product-badge badge text-danger">Out of order</span>;
            }


            return <td key={index}>{badge}</td>;
        });

        const priceRow = products.map((product,index) => (
            <td key={ index}>
                <Currency value={parseInt(product.mapValue.fields.price.stringValue)} />
            </td>
        ));

        const addToCartRow = products.map((product,index) => {
            const renderButton = ({ run, loading }) => {
                const classes = classNames('btn btn-primary', {
                    'btn-loading': loading,
                });

                return <button type="button" onClick={run} className={classes}>Add To Cart</button>;
            };

            return (
                <td key={ index}>
                    <AsyncAction
                        action={() => cartAddItem(product.mapValue.fields)}
                        render={renderButton}
                    />
                </td>
            );
        });

        // const attributeRows = attributes.map((feature, index) => {
        //     const rows = products.map((product,index1) => (
        //         <td key={ index1}>{feature.values[product.id]}</td>
        //     ));

        //     return (
        //         <tr key={index}>
        //             <th>{feature.name}</th>
        //             {rows}
        //         </tr>
        //     );
        // });

        const removeRow = products.map((product,index) => {
            const renderButton = ({ run, loading }) => {
                const classes = classNames('btn btn-secondary btn-sm', {
                    'btn-loading': loading,
                });

                return <button type="button" onClick={run} className={classes}>Remove</button>;
            };

            return (
                <td key={ index}>
                    <AsyncAction
                        action={() => compareRemoveItem(product.mapValue.fields,auth.uid)}
                        render={renderButton}
                    />
                </td>
            );
        });

        content = (
            <div className="block">
                <div className="container">
                    <div className="table-responsive">
                        <table className="compare-table">
                            <tbody>
                                <tr>
                                    <th>Product</th>
                                    {productInfoRow}
                                </tr>
                                <tr>
                                    <th>Rating</th>
                                    {ratingRow}
                                </tr>
                                <tr>
                                    <th>Availability</th>
                                    {availabilityRow}
                                </tr>
                                <tr>
                                    <th>Price</th>
                                    {priceRow}
                                </tr>
                                <tr>
                                    <th>Add To Cart</th>
                                    {addToCartRow}
                                </tr>
                                {/* {attributeRows} */}
                                <tr>
                                    <th aria-label="Remove" />
                                    {removeRow}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    } else {
        content = (
            <div className="block block-empty">
                <div className="container">
                    <div className="block-empty__body">
                        <div className="block-empty__message">You have not chosen any products to compare!</div>
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
                <title>{`Compare Products Page — ${theme.name}`}</title>
            </Helmet>

            <PageHeader header="Comparison" breadcrumb={breadcrumb} />

            {content}
        </React.Fragment>
    );
}

const mapStateToProps = (state) => ({
    products: state.compare.compareListProducts,
    auth : state.firebase.auth

});

const mapDispatchToProps = {
    cartAddItem,
    compareRemoveItem,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ShopPageCompare);

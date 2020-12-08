// react
import React from 'react';

// third-party
import PropTypes from 'prop-types';

// application
import BlockHeader from '../shared/BlockHeader';
import ProductCard from '../shared/ProductCard';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

export default function BlockProducts(props) {
    const {
        title,
        layout,
        featuredProduct,
        products,
    } = props;

   // const { products} = props;
   console.log("product : ",products);
    let large;
    let smalls;

    if (featuredProduct) {
        large = (
            <div className="block-products__featured">
                <div className="block-products__featured-item">
                    <ProductCard product={featuredProduct} />
                </div>
            </div>
        );
    }

    // here pro ~~~~~
    if (products.length > 0) {
        const productsList = products.slice(0, 6).map((product, index) => (
            <div key={index} className="block-products__list-item">
                <ProductCard product={product} />
            </div>
        ));

        smalls = (
            <div className="block-products__list">
                {productsList}
            </div>
        );
    }

    return (
        <div className={`block block-products block-products--layout--${layout}`}>
            <div className="container">
                <BlockHeader title={title} />

                <div className="block-products__body">
                    {layout === 'large-first' && large}
                    {smalls}
                    {layout === 'large-last' && large}
                </div>
            </div>
        </div>
    );
}




// get the data from firebase -------------------------------
const mapStateToProps = (state) => {
     console.log(state);
    return {
      products: state.firestore.ordered.products
      //auth: state.firebase.auth
    }
  }

   compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'products' }
    ])
  )(BlockProducts)




//------------------------------------------------------------


BlockProducts.propTypes = {
    title: PropTypes.string.isRequired,
    featuredProduct: PropTypes.object,
    products: PropTypes.array,
    layout: PropTypes.oneOf(['large-first', 'large-last']),
};

BlockProducts.defaultProps = {
    products: [],
    layout: 'large-first',
};

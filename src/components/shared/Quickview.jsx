// react
import React from 'react';

// third-party
import { connect } from 'react-redux';
import { Modal } from 'reactstrap';

// application
import Product from './Product';
import { Cross20Svg } from '../../svg';
import { quickviewClose } from '../../store/quickview';

function Quickview(props) {
    const {   product, open, quickviewClose } = props;

    var newProduct=[];
if(product)newProduct = (product.fields ? product.fields :  product.data[0].document.fields);


    let productView;


   // console.log("🚀 ~ file: Quickview.jsx ~ line 15 ~ Quickview ~ product", props.product)
    if (product !== null) {
       // const  product =  (props.product.fields ? props.product.fields : props.product.document.fields ) ;

        productView = <Product product={newProduct} layout="quickview" />;
    }

    return (
        <Modal isOpen={open} toggle={quickviewClose} centered size="xl">
            <div className="quickview">
                <button className="quickview__close" type="button" onClick={quickviewClose}>
                    <Cross20Svg />
                </button>

                {productView}
            </div>
        </Modal>
    );
}

const mapStateToProps = (state) => ({
    open: state.quickview.open,
    product: state.quickview.product,
});

const mapDispatchToProps = {
    quickviewClose,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Quickview);

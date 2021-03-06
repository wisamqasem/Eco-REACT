// react
import React, { useEffect, useState } from 'react';

// third-party
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

// application
import PageHeader from '../shared/PageHeader';
import Product from '../shared/Product';
import ProductTabs from './ProductTabs';
import shopApi from '../../api/shop';
import { url } from '../../services/utils';

// blocks
import BlockLoader from '../blocks/BlockLoader';
import BlockProductsCarousel from '../blocks/BlockProductsCarousel';

// widgets
import WidgetCategories from '../widgets/WidgetCategories';
import WidgetProducts from '../widgets/WidgetProducts';

// data stubs
//import categories from '../../data/shopWidgetCategories';
import theme from '../../data/theme';

function ShopPageProduct(props) {
    const { productSlug, layout, sidebarPosition} = props;
    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [latestProducts, setLatestProducts] = useState([]);

    // Load product.
    useEffect(() => {
        let canceled = false;

        setIsLoading(true);

        shopApi.getProductBySlug(productSlug).then((product) => {//the product have {createTime,fields,name}
          //  console.log("the slug pro : ",product.data[0].document);
            if (canceled) {
                return;
            }

            setProduct(product.data[0].document);
         //   console.log("fcking product : ",product);
            const productSubCategory =product ?  product.data[0].document.fields.subCategory.stringValue : null;
            shopApi.getRelatedProducts(productSubCategory, { limit: 8 }).then((products) => {
                if (canceled) {
                    return;
                }

                setRelatedProducts(products);//this is array
            });
         //   console.log("🚀 ~ file: ShopPageProduct.jsx ~ line 52 ~ shopApi.getProductBySlug ~ productCategory", productSubCategory)
        //    console.log("the fckong product name : ",product.data[0].document.name.toString());
            setIsLoading(false);
        });

        return () => {
            canceled = true;
        };
    }, [productSlug, setIsLoading]);


    // Load related products.
    // useEffect(() => {
    //     let canceled = false;
    //     const productCategory =product ?  product.fields.categories.stringValue : null;
    //     shopApi.getRelatedProducts(productCategory, { limit: 8 }).then((products) => {
    //         if (canceled) {
    //             return;
    //         }

    //         setRelatedProducts(products);//the products have {createTime,fields,name}
    //     });

    //     return () => {
    //         canceled = true;
    //     };
    // }, [productSlug, setRelatedProducts]);

    // Load latest products.
    useEffect(() => {
        let canceled = false;

        if (layout !== 'sidebar') {
            setLatestProducts([]);
        } else {
            shopApi.getLatestProducts({ limit: 5 }).then((result) => {
                if (canceled) {
                    return;
                }

                setLatestProducts(result);
            });
            shopApi.getCategories({ limit: 10 }).then((result) => {
                if (canceled) {
                    return;
                }

                setCategories(result);
            });





        }

        return () => {
            canceled = true;
        };
    }, [layout]);

    if (isLoading) {
        return <BlockLoader />;
    }

    const breadcrumb = [
        { title: 'Home', url: url.home() },
        { title: 'Shop', url: url.catalog() },
        { title: product.fields.name.stringValue, url: url.product(product.fields) },
    ];

    let content;

    if (layout === 'sidebar') {
        const sidebar = (
            <div className="shop-layout__sidebar">
                <div className="block block-sidebar">
                    <div className="block-sidebar__item">
                        <WidgetCategories categories={categories} location="shop" />
                    </div>
                    <div className="block-sidebar__item d-none d-lg-block">
                        <WidgetProducts title="Latest Products" products={latestProducts} />
                    </div>
                </div>
            </div>
        );

        content = (
            <div className="container">
                <div className={`shop-layout shop-layout--sidebar--${sidebarPosition}`}>
                    {sidebarPosition === 'start' && sidebar}
                    <div className=" shop-layout__content">
                        <div className=" block">
                            <Product product={product.fields} layout={layout}  />
                            <ProductTabs withSidebar />
                        </div>

                        {relatedProducts.length > 0 && (
                            <BlockProductsCarousel
                                title="Related Products"
                                layout="grid-4-sm"
                                products={relatedProducts}
                                withSidebar
                            />
                        )}
                    </div>
                    {sidebarPosition === 'end' && sidebar}
                </div>
            </div>
        );
    } else {
        content = (
            <React.Fragment>
                <div className="block">
                    <div className="container">
                        <Product product={product.fields} layout={layout} />
                        <ProductTabs  product={product.fields} productId={ product.name.toString().slice(product.name.length - 20)}/>
                    </div>
                </div>

                {relatedProducts.length > 0 && (
                    <BlockProductsCarousel
                        title="Related Products"
                        layout="grid-5"
                        products={relatedProducts}
                    />
                )}
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>{`${product.name} — ${theme.name}`}</title>
            </Helmet>

            <PageHeader breadcrumb={breadcrumb} />

            {content}
        </React.Fragment>
    );
}

ShopPageProduct.propTypes = {
    /** Product slug. */
    productSlug: PropTypes.string,
    /** one of ['standard', 'sidebar', 'columnar', 'quickview'] (default: 'standard') */
    layout: PropTypes.oneOf(['standard', 'sidebar', 'columnar', 'quickview']),
    /**
     * sidebar position (default: 'start')
     * one of ['start', 'end']
     * for LTR scripts "start" is "left" and "end" is "right"
     */
    sidebarPosition: PropTypes.oneOf(['start', 'end']),
};

ShopPageProduct.defaultProps = {
    layout: 'standard',
    sidebarPosition: 'start',
};


  export default ShopPageProduct;


/* eslint-disable arrow-body-style */
// eslint-disable-next-line no-unused-vars
import qs from 'query-string';
import { getCategories, getCategoryBySlug } from '../fake-server/endpoints/categories';
import {
    getDiscountedProducts,
    getFeaturedProducts,
    getLatestProducts,
    getPopularProducts,
    getProductBySlug,
    getProductsList,
    getRelatedProducts,
    getSuggestions, getTopRatedProducts,
} from '../fake-server/endpoints/products';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'
import firebase from '../config/fbConfig'
import axios from 'axios'

// useFirestoreConnect(['products']);
// const products = useSelector((state) => state.firestore.data.products)











const shopApi = {


    getPopularProducts: (options = {}) => {





        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/popular-products.json?limit=3&category=power-tools
         *
         * where:
         * - 3           = options.limit
         * - power-tools = options.category
         */
       //  return fetch(`https://example.com/api/popular-products.json?${qs.stringify(options)}`)
          //   .then((response) => response.json());

        return   axios.get('https://firestore.googleapis.com/v1/projects/eco-project-b064f/databases/(default)/documents/products/')
           .then(res => {
             console.log(res);
              return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(res.data.documents);
                }, 500);
            });
           })




        //     return fetch(`https://firestore.googleapis.com/v1/projects/eco-project-b064f/databases/(default)/documents/products/`)
           //  .then((response) => {response.json();console.log("here pro : ",response)});

        // This is for demonstration purposes only. Remove it and use the code above.
      //  console.log("here pro : ", getPopularProducts(options));

      //  return getPopularProducts(options);








    },


    /**
     * Returns array of categories.
     *
     * @param {object?} options
     * @param {number?} options.depth
     *
     * @return {Promise<Array<object>>}
     */
    getCategories: (options = {}) => {

        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/categories.json?depth=2
         *
         * where:
         * - 2 = options.depth
         */
        // return fetch(`https://example.com/api/categories.json?${qs.stringify(options)}`)
        //     .then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
        return getCategories(options);
    },
    /**
     * Returns category by slug.
     *
     * @param {string} slug
     * @param {object?} options
     * @param {number?} options.depth
     *
     * @return {Promise<object>}
     */
    getCategoryBySlug: (slug, options = {}) => {
        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/categories/power-tools.json?depth=2
         *
         * where:
         * - power-tools = slug
         * - 2           = options.depth
         */
        // return fetch(`https://example.com/api/categories/${slug}.json?${qs.stringify(options)}`)
        //     .then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
        return getCategoryBySlug(slug, options);
    },
    /**
     * Returns product.
     *
     * @param {string} slug
     *
     * @return {Promise<object>}
     */
    getProductBySlug: (slug) => {
        return   axios.get('https://firestore.googleapis.com/v1/projects/eco-project-b064f/databases/(default)/documents/products/')
        .then(res => {

                const product = res.data.documents.find((x) => x.fields.slug.stringValue === slug);
                if(product){
                    console.log(" slug : ",slug);
                    return new Promise((resolve) => {
                      setTimeout(() => {
                          resolve(product.fields);
                      }, 500);
                  });


                }else{ console.log("can't find the slug baby.... ");}

        })

        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/products/screwdriver-a2017.json
         *
         * where:
         * - screwdriver-a2017 = slug
         */
        // return fetch(`https://example.com/api/products/${slug}.json`)
        //     .then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
     //   return getProductBySlug(slug);
    },
    /**
     * Returns array of related products.
     *
     * @param {string}  slug
     * @param {object?} options
     * @param {number?} options.limit
     *
     * @return {Promise<Array<object>>}
     */
    getRelatedProducts: (slug, options = {}) => {
        return   axios.get('https://firestore.googleapis.com/v1/projects/eco-project-b064f/databases/(default)/documents/products/')
        .then(res => {
          console.log(res);
           return new Promise((resolve) => {
             setTimeout(() => {
                 resolve(res.data.documents);
             }, 500);
         });
        })




        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/screwdriver-a2017/related.json&limit=3
         *
         * where:
         * - screwdriver-a2017 = slug
         * - limit             = options.limit
         */
        // return fetch(`https://example.com/api/products/${slug}/related.json?${qs.stringify(options)}`)
        //     .then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
       // return getRelatedProducts(slug, options);
    },
    /**
     * Return products list.
     *
     * @param {object?} options
     * @param {number?} options.page
     * @param {number?} options.limit
     * @param {string?} options.sort
     * @param {Object.<string, string>?} filters
     *
     * @return {Promise<object>}
     */
    getProductsList: (options = {}, filters = {}) => {
        return   axios.get('https://firestore.googleapis.com/v1/projects/eco-project-b064f/databases/(default)/documents/products/')
        .then(res => {
          console.log(res);
           return new Promise((resolve) => {
             setTimeout(() => {
                 resolve(res.data.documents);
             }, 500);
         });
        })

        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/products.json?page=2&limit=12&sort=name_desc&filter_category=screwdriwers&filter_price=500-1000
         *
         * where:
         * - page            = options.page
         * - limit           = options.limit
         * - sort            = options.sort
         * - filter_category = filters.category
         * - filter_price    = filters.price
         */
        // const params = { ...options };
        //
        // Object.keys(filters).forEach((slug) => {

        //     params[`filter_${slug}`] = filters[slug];
        // });
        //
        // return fetch(`https://example.com/api/products.json?${qs.stringify(params)}`)
        //     .then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
       // return getProductsList(options, filters);
    },
    /**
     * Returns array of featured products.
     *
     * @param {object?} options
     * @param {number?} options.limit
     * @param {string?} options.category
     *
     * @return {Promise<Array<object>>}
     */
    getFeaturedProducts: (options = {}) => {
        return   axios.get('https://firestore.googleapis.com/v1/projects/eco-project-b064f/databases/(default)/documents/products/')
        .then(res => {
          console.log(res);
           return new Promise((resolve) => {
             setTimeout(() => {
                 resolve(res.data.documents);
             }, 500);
         });
        })

        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/featured-products.json?limit=3&category=power-tools
         *
         * where:
         * - 3           = options.limit
         * - power-tools = options.category
         */
        // return fetch(`https://example.com/api/featured-products.json?${qs.stringify(options)}`)
        //     .then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
      //  return getFeaturedProducts(options);
    },
    /**
     * Returns array of latest products.
     *
     * @param {object?} options
     * @param {number?} options.limit
     * @param {string?} options.category
     *
     * @return {Promise<Array<object>>}
     */
    getLatestProducts: (options = {}) => {
        return   axios.get('https://firestore.googleapis.com/v1/projects/eco-project-b064f/databases/(default)/documents/products/')
        .then(res => {
          console.log(res);
           return new Promise((resolve) => {
             setTimeout(() => {
                 resolve(res.data.documents);
             }, 500);
         });
        })

        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/latest-products.json?limit=3&category=power-tools
         *
         * where:
         * - 3           = options.limit
         * - power-tools = options.category
         */
        // return fetch(`https://example.com/api/latest-products.json?${qs.stringify(options)}`)
        //     .then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
       // return getLatestProducts(options);
    },
    /**
     * Returns an array of top rated products.
     *
     * @param {object?} options
     * @param {number?} options.limit
     * @param {string?} options.category
     *
     * @return {Promise<Array<object>>}
     */
    getTopRatedProducts: (options = {}) => {

        return   axios.get('https://firestore.googleapis.com/v1/projects/eco-project-b064f/databases/(default)/documents/products/')
        .then(res => {
          console.log(res);

           return new Promise((resolve) => {
             setTimeout(() => {
                 resolve(res.data.documents);
             }, 500);
         });

        })







        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/top-rated-products.json?limit=3&category=power-tools
         *
         * where:
         * - 3           = options.limit
         * - power-tools = options.category
         */
        // return fetch(`https://example.com/api/top-rated-products.json?${qs.stringify(options)}`)
        //     .then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
      //  return getTopRatedProducts(options);
    },
    /**
     * Returns an array of discounted products.
     *
     * @param {object?} options
     * @param {number?} options.limit
     * @param {string?} options.category
     *
     * @return {Promise<Array<object>>}
     */
    getDiscountedProducts: (options = {}) => {
        return   axios.get('https://firestore.googleapis.com/v1/projects/eco-project-b064f/databases/(default)/documents/products/')
        .then(res => {
          console.log(res);

           return new Promise((resolve) => {
             setTimeout(() => {
                 resolve(res.data.documents);
             }, 500);
         });

        })

        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/shop/discounted-products.json?limit=3&category=power-tools
         *
         * where:
         * - 3           = options.limit
         * - power-tools = options.category
         */
        // return fetch(`https://example.com/api/discounted-products.json?${qs.stringify(options)}`)
        //     .then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
      //  return getDiscountedProducts(options);
    },
    /**
     * Returns an array of most popular products.
     *
     * @param {object?} options
     * @param {number?} options.limit
     * @param {string?} options.category
     *
     * @return {Promise<Array<object>>}
     */






    /**
     * Returns search suggestions.
     *
     * @param {string}  query
     * @param {object?} options
     * @param {number?} options.limit
     * @param {string?} options.category
     *
     * @return {Promise<Array<object>>}
     */
    getSuggestions: (query, options = {}) => {

        return   axios.get('https://firestore.googleapis.com/v1/projects/eco-project-b064f/databases/(default)/documents/products/')
        .then(res => {
          console.log(res);

           return new Promise((resolve) => {
             setTimeout(() => {
                 resolve(res.data.documents);
             }, 500);
         });

        })

        /**
         * This is what your API endpoint might look like:
         *
         * https://example.com/api/search/suggestions.json?query=screwdriver&limit=5&category=power-tools
         *
         * where:
         * - query    = query
         * - limit    = options.limit
         * - category = options.category
         */
        // return fetch(`https://example.com/api/search/suggestions.json?${qs.stringify({ ...options, query })}`)
        //     .then((response) => response.json());

        // This is for demonstration purposes only. Remove it and use the code above.
     //   return getSuggestions(query, options);
    },
};

export default shopApi;




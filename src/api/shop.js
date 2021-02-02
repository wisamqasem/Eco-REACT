/* eslint-disable arrow-body-style */
// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
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
import axios from 'axios';
import CategoryFilterBuilder from '../fake-server/filters/category';
import CheckFilterBuilder from '../fake-server/filters/check';
import RadioFilterBuilder from '../fake-server/filters/range';
import ColorFilterBuilder from '../fake-server/filters/color';
import RangeFilterBuilder from '../fake-server/filters/price';
import FilterRange from '../components/filters/FilterRange'

// useFirestoreConnect(['products']);
// const products = useSelector((state) => state.firestore.data.products)











const shopApi = {


getMyCart : (cartId)=>{
    return   axios.get('https://firestore.googleapis.com/v1/projects/eco-project-b064f/databases/(default)/documents/carts/'+cartId)
    .then(res => {
        //console.log("the data : ",res);
        return Promise.resolve( res )
})
},

getMyWishList : (wishListId)=>{
    console.log("who let the dogs out");
    return   axios.get('https://firestore.googleapis.com/v1/projects/eco-project-b064f/databases/(default)/documents/wishLists/'+wishListId)
    .then(res => {
        console.log("the data of wishlist : ",res);
        return Promise.resolve( res )
})
},

    getMyProducts: (userId) => {
        return   axios.post('https://firestore.googleapis.com/v1/projects/eco-project-b064f/databases/(default)/documents:runQuery',
        { structuredQuery:
        { from: [
            { collectionId: 'products'
        }
    ],
    select: { fields:
        [
            { fieldPath: 'name' },
            { fieldPath: 'availability' },
            { fieldPath: 'badges' },
            { fieldPath: 'brand' },
            { fieldPath: 'categories' },
            { fieldPath: 'compareAtPrice' },
            { fieldPath: 'description' },
            { fieldPath: 'images' },
            { fieldPath: 'price' },
            { fieldPath: 'rating' },
            { fieldPath: 'reviews' },
            { fieldPath: 'slug' },
            { fieldPath: 'userId' },

        ]
    },
    where: {
        compositeFilter: {
            filters: [
                { fieldFilter: {
                    field: {
                        fieldPath: 'userId'
                    },
                        op: 'EQUAL',
                        value: {
                           // booleanValue: true
                           stringValue : userId
                        }
                    }
                }
            ], op: 'AND'
        }
    },
        //limit: 4
        }
    }
    ).then(res => {
            console.log("the data : ",res);
      return Promise.resolve(res );
                 })

    },


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
            const limit = options.limit ;
              return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(res.data.documents.slice(0,limit));
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
        return   axios.get('https://firestore.googleapis.com/v1/projects/eco-project-b064f/databases/(default)/documents/categories/')
        .then(res => {
         const limit = options.limit ;
           return new Promise((resolve) => {
             setTimeout(() => {
                 resolve(res.data.documents.slice(0,limit));
             }, 500);
         });
        })

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
       // return getCategories(options);
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
    getCategoryProductsBySlug: (slug, options = {}) => {
       // return getCategoryBySlug(slug, options);
        return   axios.post('https://firestore.googleapis.com/v1/projects/eco-project-b064f/databases/(default)/documents:runQuery',
        { structuredQuery:
            { from: [
                { collectionId: 'products'
            }
        ],
        select: { fields:
            [
                { fieldPath: 'name' },
                { fieldPath: 'availability' },
                { fieldPath: 'badges' },
                { fieldPath: 'brand' },
                { fieldPath: 'categories' },
                { fieldPath: 'compareAtPrice' },
                { fieldPath: 'description' },
                { fieldPath: 'images' },
                { fieldPath: 'price' },
                { fieldPath: 'rating' },
                { fieldPath: 'reviews' },
                { fieldPath: 'slug' },
                { fieldPath: 'userId' },
                { fieldPath: 'peopleRated' },
            ]
        },
        where: {
            compositeFilter: {
                filters: [
                    { fieldFilter: {
                        field: {
                            fieldPath: 'categories'
                        },
                            op: 'EQUAL',
                            value: {
                               stringValue : slug
                            }
                        }
                    }
                ], op: 'AND'
            }
        },
            //limit: 4
            }
        })
        .then(res => {
                //const product = res.data.documents.find((x) => x.fields.slug.stringValue === slug);
               // if(product){
console.log("het category by slug : ",res);
                    return new Promise((resolve) => {
                      setTimeout(() => {
                          resolve(res);
                      }, 500);
                  });


               // }else{ console.log("can't find the slug baby.... ");}

        })


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
      //  return getCategoryBySlug(slug, options);
    },
    /**
     * Returns product.
     *
     * @param {string} slug
     *
     * @return {Promise<object>}
     */
    getProductBySlug: (slug) => {
        return   axios.post('https://firestore.googleapis.com/v1/projects/eco-project-b064f/databases/(default)/documents:runQuery',
        { structuredQuery:
            { from: [
                { collectionId: 'products'
            }
        ],
        select: { fields:
            [
                { fieldPath: 'name' },
                { fieldPath: 'availability' },
                { fieldPath: 'badges' },
                { fieldPath: 'brand' },
                { fieldPath: 'categories' },
                { fieldPath: 'compareAtPrice' },
                { fieldPath: 'description' },
                { fieldPath: 'images' },
                { fieldPath: 'price' },
                { fieldPath: 'rating' },
                { fieldPath: 'reviews' },
                { fieldPath: 'slug' },
                { fieldPath: 'userId' },
                { fieldPath: 'peopleRated' },

            ]
        },
        where: {
            compositeFilter: {
                filters: [
                    { fieldFilter: {
                        field: {
                            fieldPath: 'slug'
                        },
                            op: 'EQUAL',
                            value: {

                               stringValue : slug
                            }
                        }
                    }
                ], op: 'AND'
            }
        },
            //limit: 4
            }
        })
        .then(res => {
                //const product = res.data.documents.find((x) => x.fields.slug.stringValue === slug);
               // if(product){
console.log("het product by slug : ",res);
                    return new Promise((resolve) => {
                      setTimeout(() => {
                          resolve(res);
                      }, 500);
                  });


               // }else{ console.log("can't find the slug baby.... ");}

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
            return Promise.resolve(res.data.documents);
        //    return new Promise((resolve) => {
        //      setTimeout(() => {
        //          resolve(res.data.documents);
        //      }, 500);
        //  });
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


     getCategoryBySlug:  (slug, options = {}) => {
        // return getCategoryBySlug(slug, options);
         return   axios.post('https://firestore.googleapis.com/v1/projects/eco-project-b064f/databases/(default)/documents:runQuery',
         { structuredQuery:
             { from: [
                 { collectionId: 'categories'
             }
         ],
         select: { fields:
             [
                 { fieldPath: 'name' },
                 { fieldPath: 'brands' },
                 { fieldPath: 'image' },
                 { fieldPath: 'subCategories' },

             ]
         },
         where: {
             compositeFilter: {
                 filters: [
                     { fieldFilter: {
                         field: {
                             fieldPath: 'name'
                         },
                             op: 'EQUAL',
                             value: {
                                stringValue : slug
                             }
                         }
                     }
                 ], op: 'AND'
             }
         },
             //limit: 4
             }
         })
         .then(res => {
                 //const product = res.data.documents.find((x) => x.fields.slug.stringValue === slug);
                // if(product){
 console.log("get category by slug : ",res);
                     return res.data[0].document.fields


                // }else{ console.log("can't find the slug baby.... ");}

         })


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
       //  return getCategoryBySlug(slug, options);
     },

    getProductsList: (category ,options = {}, filterValues = {}) => {

      const  priceFilter=(filter_price,items,min,max)=>{
            const value=filter_price ? filter_price.split('-'):[min,max];
            // Apply filters to products list.
             return items = items.filter(
                (product) =>  parseInt(product.document.fields.price.stringValue) >= value[0] && parseInt(product.document.fields.price.stringValue) <= value[1]
            );
        }
        const  brandFilter=(filter_brand,items)=>{
            const value=filter_brand ? filter_brand.split(','):[];
            // Apply filters to products list.
             return items = items.filter(
                (product) => value.includes(product.document.fields.brand.stringValue)
            );

        }
        const  categoryFilter=(filter_category,items)=>{
            const value=filter_category ? filter_category.split(','):[];
            // Apply filters to products list.
            return items = items.filter(
                (product) => value.includes(product.document.fields.subCategory.stringValue)
            );


        }
        const  discountFilter=(filter_discount,items)=>{
            const value=filter_discount ;
            // Apply filters to products list.
            if(value=='YES')
            return items = items.filter(
                (product) => parseInt(product.document.fields.compareAtPrice.stringValue)
            );
            if(value=='NO')
            return items = items.filter(
                (product) => !parseInt(product.document.fields.compareAtPrice.stringValue)
            );
            if(value=='ALL')
            return items ;

        }


    const  colorFilter=(filter_color,items)=>{
   var filtered=[];
        const values= filter_color.split(',');
        items = items.map(
            (product) => {
                if(!product.document.fields.colors.arrayValue.values)product.document.fields.colors.arrayValue.values=[];
                product.document.fields.colors.arrayValue.values.map((x)=>{values.map((y)=>{if(x.stringValue==y && filtered.indexOf(product) < 0)filtered.push(product)})})}
        );
return filtered;
    }


        return   axios.post('https://firestore.googleapis.com/v1/projects/eco-project-b064f/databases/(default)/documents:runQuery',
        { structuredQuery:
            { from: [
                { collectionId: 'products'}
        ],
        select: { fields:
            [
                { fieldPath: 'name' },
                { fieldPath: 'availability' },
                { fieldPath: 'badges' },
                { fieldPath: 'brand' },
                { fieldPath: 'categories' },
                { fieldPath: 'compareAtPrice' },
                { fieldPath: 'description' },
                { fieldPath: 'images' },
                { fieldPath: 'price' },
                { fieldPath: 'rating' },
                { fieldPath: 'reviews' },
                { fieldPath: 'slug' },
                { fieldPath: 'userId' },
                { fieldPath: 'peopleRated' },
                { fieldPath: 'colors' },
                { fieldPath: 'subCategory' },
            ]
        },
        where: {
            compositeFilter: {
                filters: [
                    { fieldFilter: {
                        field: {
                            fieldPath: 'categories'
                        },
                            op: 'EQUAL',
                            value: {
                               stringValue : category
                            }

                        }
                    }
                ], op: 'AND'
            }
        },
            //limit: 4
            }
        })
        .then(res => {
            console.log("getProductsList : ",res);
            var items = res.data;
            let max=0,min=0;
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





if(items[0].document){

    max = items.reduce(
        (acc, product) => Math.max(acc, parseInt(product.document.fields.price.stringValue)),
        0,
    );
   min = items.reduce(
        (acc, product) => Math.min(acc, parseInt(product.document.fields.price.stringValue)),
        max,
    );
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const filter_price = urlParams.get('filter_price');
            const filter_color = urlParams.get('filter_color');
            const filter_brand = urlParams.get('filter_check');
            const filter_discount = urlParams.get('filter_radio');
            const filter_category = urlParams.get('filter_category');
if(filter_price)items=priceFilter(filter_price,items,min,max);
if(filter_color)items=colorFilter(filter_color,items);
if(filter_brand)items=brandFilter(filter_brand,items);
if(filter_discount)items=discountFilter(filter_discount,items);
if(filter_category)items=categoryFilter(filter_category,items);

            }

                    return new Promise((resolve) => {
                      setTimeout(() => {
                          resolve({items:items,filters:  [
                            { slug: 'category',name: 'subCategories',  type: 'check', category: category , value:[]},
                            {max:max,min:min,name:'Price',slug:'price',type:'range',value:[min,max]},
                            { slug: 'color',name: 'Color',  type: 'color', items: colors, value:[]},
                            { slug: 'check',name: 'Brand',  type: 'check', category: category, value:[]},
                            { slug: 'radio',name: 'Discount',  type: 'radio', items: ['YES','NO','ALL'], value:''},

                          ] });
                      }, 500);
                  });

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
    })
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
            const limit = options.limit ;

           return new Promise((resolve) => {
             setTimeout(() => {
                 resolve(res.data.documents.slice(0,limit));
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
                 resolve(res.data.documents.slice(0,5));
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
                 resolve(res.data.documents.slice(0, 5));
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


           return new Promise((resolve) => {
             setTimeout(() => {
                 resolve(res.data.documents.slice(0,5));
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
    getSuggestions: (query, options = {}) => {// this one for searching........................................

        return   axios.get('https://firestore.googleapis.com/v1/projects/eco-project-b064f/databases/(default)/documents/products/')
        .then(res => {
        //  console.log(res);
        const limit = options.limit || 5;
        return Promise.resolve(
            res.data.documents.filter(
                (x) => x.fields.name.stringValue.toLowerCase().includes(query.toLowerCase()),
            ).slice(0, limit),
        );


        //    return new Promise((resolve) => {
        //      setTimeout(() => {
        //          resolve(res.data.documents);
        //      }, 500);
        //  });

        }).catch(error => {
            console.log("falid to get data for searching : ",error);
        });

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




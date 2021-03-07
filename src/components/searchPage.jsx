
// react
import React, { Component,useEffect,useState} from 'react'
import { connect } from 'react-redux'
import shopApi from './../api/shop'
import BlockProducts from './blocks/BlockProducts';
import { useDeferredData, useProductColumns, useProductTabs } from './../services/hooks';
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';
import BlockLoader from './blocks/BlockLoader';



const SearchPage =(props)=>{
const [products,setProducts]=useState([]);
let category,subCategory;
useEffect(() => {
    shopApi.getSearchPage(props.searchQurey,props.searchCategory).then((x)=>{setProducts(x)})
}, [props.searchQurey]);
if(products.length!=0){
 category = products[0].fields.categories.stringValue;
 subCategory = products[0].fields.subCategory.stringValue;
 props.history.push(`/shop/catalog/${category}?filter_category=${subCategory}`);
}
else {
    return (
        <div className="block">


            <div className="container">
                <div className="not-found">
                    <div className="not-found__404">
                        Oops!
                    </div>

                    <div className="not-found__content">
                        <h1 className="not-found__title">There is no products like this.</h1>

                        <p className="not-found__text">
                            We can&apos;t seem to find the product you&apos;re looking for.
                            <br />
                            Try to use the search again.
                        </p>



                        <p className="not-found__text">
                            Or go to the home page to start over.
                        </p>

                        <Link to="/" className="btn btn-secondary btn-sm">Go To Home Page</Link>
                    </div>
                </div>
            </div>
        </div>
    );


}

return null;
}


  export default SearchPage;


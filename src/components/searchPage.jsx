
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

return null;
}


  export default SearchPage;



// react
import React, { Component } from 'react'
import { connect } from 'react-redux'
import shopApi from '../../api/shop'
import BlockProducts from '../blocks/BlockProducts';
import { useDeferredData, useProductColumns, useProductTabs } from '../../services/hooks';
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';

class MyProducts extends Component {

render(){

const {myProducts} =  this.props;
console.log("🚀 ~ file: MyProducts.jsx ~ line 15 ~ MyProducts ~ render ~ myProducts : ", myProducts)

return(
<div>
<BlockProducts
    title="myProducts"
    layout="large-first"
    limit={myProducts.data.length}
    products= {myProducts.data.data}
/>
</div>
)
}
}


function Myproductsfun(props){
    const {auth} = props;
    console.log("🚀 ~ file: MyProducts.jsx ~ line 33 ~ Myproductsfun ~ auth", auth.uid)
//const myProducts = shopApi.getMyProducts(auth.uid).then((res)=>{return res;});
const myProducts = useDeferredData(() => (
        shopApi.getMyProducts(auth.uid)
    ), []);
console.log("🚀 ~ file: MyProducts.jsx ~ line 37 ~ Myproductsfun : ", myProducts)

    if (!auth.uid) return <Redirect to='/' />
  //  const isThereProducts=myProducts.data.data ? false : true;
  //if(myProducts.data.data[0].documents){}
    if(myProducts.data.length===0 || myProducts.data.data.length===1 ){

         return (
    <div className="block block-empty">
    <div className="container">
        <div className="block-empty__body">
            <div className="block-empty__message">There is no products</div>
            <div className="block-empty__actions">
                <Link to="/" className="btn btn-primary btn-sm">Continue</Link>
            </div>
        </div>
    </div>
</div> );}

    return <MyProducts myProducts={myProducts}/>



}

const mapStateToProps = (state) => {
    return{

      authError: state.auth.authError,
      auth: state.firebase.auth
    }
  }

  export default connect(mapStateToProps,null)(Myproductsfun)


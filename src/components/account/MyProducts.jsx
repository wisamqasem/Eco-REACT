
// react
import React, { Component } from 'react'
import { connect } from 'react-redux'
import shopApi from '../../api/shop'
import BlockProducts from '../blocks/BlockProducts';
import { useDeferredData, useProductColumns, useProductTabs } from '../../services/hooks';
import { Redirect } from 'react-router-dom'

class MyProducts extends Component {

render(){

const {myProducts} =  this.props;

return(
<div>
<BlockProducts
    title="myProducts"
    layout="large-first"
    limit={myProducts.data.length}
    products= {myProducts.data}
/>
</div>
)
}
}


function Myproductsfun(props){
    const {auth} = props;

const myProducts = useDeferredData(() => (
        shopApi.getMyProducts(auth.uid)
    ), []);
    if (!auth.uid) return <Redirect to='/' />
  return <MyProducts myProducts={myProducts}/>


}

const mapStateToProps = (state) => {
    return{

      authError: state.auth.authError,
      auth: state.firebase.auth
    }
  }

  export default connect(mapStateToProps,null)(Myproductsfun)


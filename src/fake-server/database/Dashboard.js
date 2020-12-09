import React, { Component } from 'react'


import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import productsDef from './products'


class Dashboard extends Component {
  render() {

    var { products } = this.props;



      //console.log("all products 2 : ", productsDef);
//     if (!auth.uid) return <Redirect to='/signin' />

     return (
        productsDef.push(products[0])


     )
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    products: state.firestore.ordered.products,
  //  auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'products' }
  ])
)(Dashboard)

import React, { Component } from 'react'


import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import productsDef from './products'
import getData from './products'

class Dashboard extends Component {
// try to make all functions in fake server a props to this dashbored.............



state={}



    render() {
        var { products } = this.props;
          //console.log("all products 2 : ", productsDef);
    //     if (!auth.uid) return <Redirect to='/signin' />
         return (
            productsDef.push(...products)

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

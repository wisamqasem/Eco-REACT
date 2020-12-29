// react
import React, { Component } from 'react'

// third-party
import { Helmet } from 'react-helmet-async';

// data stubs


import {signOut} from '../store/auth/authActions'
import { connect } from 'react-redux'

 class Logout extends Component {

    constructor(props) {
        super(props);

        this.logoutNow = this.logoutNow.bind(this);
      }

      componentDidMount() {
        this.logoutNow();
      }

 logoutNow() {
    this.props.signOut();
    this.props.history.push('/');

}


render(){

    return null;
}


}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut()),

    }
  }

 export default connect(null, mapDispatchToProps)(Logout) ;

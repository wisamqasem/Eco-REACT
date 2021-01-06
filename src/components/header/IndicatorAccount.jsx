// react
import React, { Component } from 'react'
import { connect } from 'react-redux'
// third-party
import { Link } from 'react-router-dom';

// application
import Indicator from './Indicator';
import { Person20Svg } from '../../svg';
import { signIn } from '../../store/auth/authActions'
import {signOut} from '../../store/auth/authActions'
class IndicatorAccount extends Component {


    handleSubmitLogin = (e) => {
        e.preventDefault();
        console.log("hi man 2")
        this.props.signIn(this.state)
      }
      handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        })
      }





state = {
    login_email2 : '',
    login_password2 : '',
    dropdown_login : (
        <div className="account-menu">
            <form className="account-menu__form">
                <div className="account-menu__form-title">Log In to Your Account</div>
                <div className="form-group">
                    <label htmlFor="header-signin-email" className="sr-only">Email address</label>
                    <input
                        id="login_email"
                        type="email"
                        className="form-control form-control-sm"
                        placeholder="Email address"
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="header-signin-password" className="sr-only">Password</label>
                    <div className="account-menu__form-forgot">
                        <input
                            id="login_password"
                            type="password"
                            className="form-control form-control-sm"
                            placeholder="Password"
                            onChange={this.handleChange}
                        />
                        <Link to="/account/login" className="account-menu__form-forgot-link">Forgot?</Link>
                    </div>
                </div>
                <div className="form-group account-menu__form-button">
                    <button type="button" className="btn btn-primary btn-sm" onClick={this.handleSubmitLogin}>Login</button>
                </div>
                <div className="account-menu__form-link">
                    <Link to="/account/login">Create An Account</Link>
                </div>
            </form>


        </div>
   ),
   dropdown_logout : (
    <div className="account-menu">
        <div className="account-menu__divider" />
        <Link to="/account/dashboard" className="account-menu__user">
            <div className="account-menu__user-avatar">
                <img src="images/avatars/avatar-3.jpg" alt="" />
            </div>
            <div className="account-menu__user-info">
                <div className="account-menu__user-name">Helena Garcia</div>
                <div className="account-menu__user-email">stroyka@example.com</div>
            </div>
        </Link>
        <div className="account-menu__divider" />
        <ul className="account-menu__links">
            <li><Link to="/account/profile">Edit Profile</Link></li>
            <li><Link to="/account/orders">Order History</Link></li>
            <li><Link to="/account/addresses">Addresses</Link></li>
            <li><Link to="/account/password">Password</Link></li>
            <li><Link to="/account/createProduct">Create Product</Link></li>
            <li><Link to="/account/myProducts">My Products</Link></li>
        </ul>
        <div className="account-menu__divider" />
        <ul className="account-menu__links">
         <Link to='' onClick={this.props.signOut}>Logout</Link>
            {/* <button onClick={props.signOut}>Logout</button> */}
        </ul>
    </div>
),




}


    render() {
        const { auth } = this.props;
        const {dropdown_logout} = this.state;
        const {dropdown_login } = this.state;

    return (
        <div>
{auth.uid ?  <Indicator url="/account" dropdown={dropdown_logout} icon={<Person20Svg />} /> :   <Indicator url="/account" dropdown={dropdown_login} icon={<Person20Svg />} />}
</div>
    );
}
}



const mapStateToProps = (state) => {
    return{
      auth: state.firebase.auth
    }
  }



  const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds)),
        signOut: () => dispatch(signOut())

    }
  }

  export default connect( mapStateToProps, mapDispatchToProps)( IndicatorAccount)

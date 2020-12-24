// react
import React, { Component } from 'react'

// third-party
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// application
import PageHeader from '../shared/PageHeader';
import { Check9x7Svg } from '../../svg';

// data stubs
import theme from '../../data/theme';

import { connect } from 'react-redux'
import { signIn } from '../../store/auth/authActions'
import { signUp } from '../../store/auth/authActions'
import { Redirect } from 'react-router-dom'


class AccountPageLogin extends Component {


    state = {
        breadcrumb : [
            { title: 'Home', url: '' },
            { title: 'My Account', url: '' },
        ],
        login_email: '',
        login_password: '',
        register_confirm:'',
        register_email:'',
        register_password:'',
        authError : null
      }
      handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        })
      }
    handleSubmitLogin = (e) => {
        e.preventDefault();
        this.props.signIn(this.state)
      }
      handleSubmitRegister = (e) => {
        e.preventDefault();
        this.props.signUp(this.state);

      }

      render() {
        const { authError,auth } = this.props;
        if (auth.uid) return <Redirect to='/' />
    return (
        <React.Fragment>
            <Helmet>
                <title>{`Login — ${theme.name}`}</title>
            </Helmet>

            <PageHeader header="My Account" breadcrumb={this.state.breadcrumb} />

            <div className="block">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 d-flex">
                            <div className="card flex-grow-1 mb-md-0">
                                <div className="card-body">
                                    <h3 className="card-title">Login</h3>
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="login-email">Email address</label>
                                            <input
                                                id="login_email"
                                                type="email"
                                                className="form-control"
                                                placeholder="Enter email"
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="login-password">Password</label>
                                            <input
                                                id="login_password"
                                                type="password"
                                                className="form-control"
                                                placeholder="Password"
                                                onChange={this.handleChange}
                                            />
                                            <small className="form-text text-muted">
                                                <Link to="/">Forgotten Password</Link>
                                            </small>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-check">
                                                <span className="form-check-input input-check">
                                                    <span className="input-check__body">
                                                        <input
                                                            id="login-remember"
                                                            type="checkbox"
                                                            className="input-check__input"
                                                        />
                                                        <span className="input-check__box" />
                                                        <Check9x7Svg className="input-check__icon" />
                                                    </span>
                                                </span>
                                                <label className="form-check-label" htmlFor="login-remember">
                                                    Remember Me
                                                </label>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary mt-2 mt-md-3 mt-lg-4" onClick={this.handleSubmitLogin} >
                                            Login
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 d-flex mt-4 mt-md-0">
                            <div className="card flex-grow-1 mb-0">
                                <div className="card-body">
                                    <h3 className="card-title">Register</h3>
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="register-email">Email address</label>
                                            <input
                                                id="register_email"
                                                type="email"
                                                className="form-control"
                                                placeholder="Enter email"
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="form_group">
                                            <label htmlFor="register-password">Password</label>
                                            <input
                                                id="register_password"
                                                type="password"
                                                className="form-control"
                                                placeholder="Password"
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="register-confirm">Repeat Password</label>
                                            <input
                                                id="register_confirm"
                                                type="password"
                                                className="form-control"
                                                placeholder="Password"
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary mt-2 mt-md-3 mt-lg-4" onClick={this.handleSubmitRegister}>
                                            Register
                                        </button>{" "}
                                       { authError ? <div   className='alert alert-danger mb-3'>
                                        <label >{authError}</label>
                                        </div> : null}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
      }
}


const mapStateToProps = (state) => {
    return{
      authError: state.auth.authError,
      auth: state.firebase.auth
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      signIn: (creds) => dispatch(signIn(creds)),
      signUp: (creds) => dispatch(signUp(creds))
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(AccountPageLogin)

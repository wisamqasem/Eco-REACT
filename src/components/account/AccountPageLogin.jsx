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
        register_name : '',
        authError : null,
        imageUploaded : null,
        imageBtn : 'primary',
        errImage:false,
        errRegister_confirm:false,
        errRegister_email:false,
        errRegister_password:false,
        errRegister_name : false,
        error:false,
      }

      fileInputRef = React.createRef();
      fileChange = event => {
        event.preventDefault();

        this.setState({ file: event.target.files[0] });
        let imageFile = event.target.files[0];
        if (imageFile) {
          const localImageUrl = URL.createObjectURL(imageFile);
          const imageObject = new window.Image();
          imageObject.onload = () => {
            imageFile.width = imageObject.naturalWidth;
            imageFile.height = imageObject.naturalHeight;
            URL.revokeObjectURL(imageFile);
          };
          imageObject.src = localImageUrl;
        }
    const imageUploadedIcon = ( <div  className={`alert alert-success `}
    ><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="green" className="bi bi-check2-circle green-text" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M15.354 2.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L8 9.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
    <path fillRule="evenodd" d="M8 2.5A5.5 5.5 0 1 0 13.5 8a.5.5 0 0 1 1 0 6.5 6.5 0 1 1-3.25-5.63.5.5 0 1 1-.5.865A5.472 5.472 0 0 0 8 2.5z"/>
    </svg></div>);
    this.setState({imageUploaded : imageUploadedIcon});

      };
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
        const {register_email,register_password,register_confirm,register_name,error}=this.state
        if(register_confirm !== register_password){this.setState({authError : 'the passwords are not match !'}) ; return;}
        if (!this.state.file) this.setState( {errImage: true,imageBtn:'danger' });else this.setState( {errImage: false,imageBtn:'primary' });
        if(register_email=='')this.setState( {errRegister_email: true,error:true });else this.setState( {errRegister_email: false });
        if(register_password=='')this.setState( {errRegister_password: true,error:true });else this.setState( {errRegister_password: false });
        if(register_confirm=='')this.setState( {errRegister_confirm: true,error:true });else this.setState( {errRegister_confirm: false });
        if(register_name=='')this.setState( {errRegister_name: true,error:true });else this.setState( {errRegister_name: false });
       if(error)return;
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
                                            <label htmlFor="register-email">User name</label>
                                            <input
                                                id="register_name"
                                                type="text"
                                                className={"form-control "+(this.state.errRegister_name ? 'is-invalid': '')}
                                                placeholder="Enter User name"
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="register-email">Email address</label>
                                            <input
                                                id="register_email"
                                                type="email"
                                                className={"form-control "+(this.state.errRegister_email ? 'is-invalid': '')}
                                                placeholder="Enter email"
                                                onChange={this.handleChange}
                                            />
                                        </div>

                                        <div className="form_group">
                                            <label htmlFor="register-password">Password</label>
                                            <input
                                                id="register_password"
                                                type="password"
                                                className={"form-control "+(this.state.errRegister_password ? 'is-invalid': '')}
                                                placeholder="Password"
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="register-confirm">Repeat Password</label>
                                            <input
                                                id="register_confirm"
                                                type="password"
                                                className={"form-control "+(this.state.errRegister_confirm ? 'is-invalid': '')}
                                                placeholder="Password"
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        { this.state.authError  ? <div   className='alert alert-danger mb-3'>
                                        <label >{this.state.authError}</label>
                                        </div> : null}

                           <div className="form-group">
                           {' '} <button type="button" id="selctImageBtn" className={'btn btn-'+this.state.imageBtn+' btn-lg'}  onClick={() =>{
                                  this.fileInputRef.current.click()}} >Select image</button>
                              </div>
                              {this.state.imageUploaded ? <div  >{this.state.imageUploaded}</div> : null}

                              <input
                                type="file"
                                ref={this.fileInputRef}
                                onChange={event => this.fileChange(event)}
                                hidden
                              />



                                        <button type="submit" className="btn btn-primary mt-2 mt-md-3 mt-lg-4" onClick={this.handleSubmitRegister}>
                                            Register
                                        </button>{" "}
                                       { authError  ? <div   className='alert alert-danger mb-3'>
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

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProduct } from '../store/products/productAction'
import { Redirect } from 'react-router-dom'
import MainComponent from './MainComponent'



class CreateProduct extends Component {
  state = {
    title: '',
    content: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
    this.props.createProduct(this.state);
    this.props.history.push('/');// to back to home page
  }
  render() {

    //const { auth } = this.props;
  //  if (!auth.uid) return <Redirect to='/signin' />

//   window.addEventListener('load', function() {
//     document.querySelector('input[type="file"]').addEventListener('change', function() {
//         if (this.files && this.files[0]) {
//             var img = document.querySelector('img');  // $('img')[0]
//             img.src = URL.createObjectURL(this.files[0]); // set src to blob url
//             img.onload = imageIsLoaded;
//         }
//     });
//   });

  function imageIsLoaded() {

    // update width and height ...
  }

    return (
<div className="col-lg-4 ">
        <div className="form-group">
        <label htmlFor="input-default">Name</label>
        <input id="input-default" type="text" className="form-control" placeholder="Placeholder" />
</div>
<div className="form-group">
        <label htmlFor="input-default">Price</label>
        <input id="input-default" type="text" className="form-control" placeholder="Placeholder" />
</div>
<div className="form-group">
        <label htmlFor="input-default">Availability</label>
        <input id="input-default" type="text" className="form-control" placeholder="Placeholder" />
</div>
<div className="form-group">
        <label htmlFor="input-default">Badges</label>
        <input id="input-default" type="text" className="form-control" placeholder="Placeholder" />
</div>
<div className="form-group">
        <label htmlFor="input-default">Brand</label>
        <input id="input-default" type="text" className="form-control" placeholder="Placeholder" />
</div>
<div className="form-group">
        <label htmlFor="input-default">CompareAtPrice</label>
        <input id="input-default" type="text" className="form-control" placeholder="Placeholder" />
</div>
<div className="form-group">
        <label htmlFor="input-default">Rating</label>
        <input id="input-default" type="text" className="form-control" placeholder="Placeholder" />
</div>
<div className="form-group">
        <label htmlFor="input-default">Reviews</label>
        <input id="input-default" type="text" className="form-control" placeholder="Placeholder" />
</div>
<div className="form-group">
        <label htmlFor="input-default">Slug</label>
        <input id="input-default" type="text" className="form-control" placeholder="Placeholder" />

    </div>
    <div className="form-group">
         <label htmlFor="select-default">Categories</label>
         <select id="select-default" className="form-control">
         <option>Select value...</option>
         <option>Select value...</option>
         <option>Select value...</option>
         <option>Select value...</option>
         <option>Select value...</option>
         <option>Select value...</option>
         <option>Select value...</option>
         </select>
     </div>

     <div className="form-group">
        <label htmlFor="input-default">Upload Images</label>

        {/* <input type='file' />
         <img id="myImg" src="#" alt="your image" height='200' width='100'></img> */}
         <MainComponent/>
    </div>



</div>













    //   <div className="container">
    //     <form className="white" onSubmit={this.handleSubmit}>
    //       <h5 className="grey-text text-darken-3">Create a New Project</h5>
    //       <div className="input-field">
    //         <input type="text" id='title' onChange={this.handleChange} />
    //         <label htmlFor="title">Project Title</label>
    //       </div>
    //       <div className="input-field">
    //         <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
    //         <label htmlFor="content">Project Content</label>
    //       </div>
    //       <div className="input-field">
    //         <button className="btn pink lighten-1">Create</button>
    //       </div>
    //     </form>
    //   </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
 //   auth: state.firebase.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createProduct: (product) => dispatch(createProduct(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct)

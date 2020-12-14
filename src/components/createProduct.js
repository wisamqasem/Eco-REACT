import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProduct } from '../store/products/productAction'
import { Redirect } from 'react-router-dom'
import MainComponent from './MainComponent'
import { uploadImage, getData } from "../store/images/uploadImagesAction";


class CreateProduct extends Component {

  state = {
   // error: null,
  //  image: null,
  availability: null,
  badges: null,
  brand:null,
  categories: null,
  compareAtPrice: null,
  name:null,
  price:null,
  rating:null,
  reviews:null,
  slug:null,
  images:[]


  }
  componentDidMount() {
    this.props.getData();
  }

  fileInputRef = React.createRef();

  onFormSubmit = e => {
    e.preventDefault(); // Stop form submit

    //validating the file
    //check if the file is exists
    if (this.state.file === null) {
      alert("No image is selected!");
      return;
    }

    //check if the image size is larger than 1MB
    // if (this.state.file.size > 1048576) {
    //   alert("Image size must be less than 1MB!");
    //   return;
    // }

    //check if the dimension of the image is 2048 x 2048 px
    // if (this.state.file.width > 2048 || this.state.file.height > 2048) {
    //   alert("Image dimensions must be 2048 x 2048 px");
    //   return;
    // }

    //check if the file is an image
    if (
      this.state.file.type === "image/jpeg" ||
      this.state.file.type === "image/png" ||
      this.state.file.type === "image/jpg"
    ) {










this.props.createProduct(this.state);
     // this.props.uploadImage(this.state.file);
    } else {
      alert("Please provide a valid image. (JPG, JPEG or PNG)");
    }
  };


  fileChange = event => {
    event.preventDefault();
    this.state.images.push(event.target.files[0])
console.log("images : ",this.state.images);

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
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.showProgress !== prevState.showProgress) {
      return { showProgress: nextProps.showProgress };
    }
    if (nextProps.image !== prevState.image) {
      return { image: nextProps.image };
    }
    if (nextProps.percent !== prevState.percent) {
      return { percent: nextProps.percent };
    }

    if (nextProps.error !== prevState.error) {
      return { error: nextProps.error };
    } else {
      return null;
    }
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
    // this.props.history.push('/');// to back to home page
  }
  render() {

    const { image} = this.state;
  //  console.log("image : ",image);



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
        <input  type="text" className="form-control" placeholder="Placeholder" id='name' onChange={this.handleChange}/>
</div>
<div className="form-group">
        <label htmlFor="input-default">Price</label>
        <input  type="text" className="form-control" placeholder="Placeholder" id='price' onChange={this.handleChange}/>
</div>
<div className="form-group">
        <label htmlFor="input-default">Availability</label>
        <input  type="text" className="form-control" placeholder="Placeholder" id='availability' onChange={this.handleChange}/>
</div>
<div className="form-group">
<label htmlFor="input-default">Badges</label>
<select id='badges' className="form-control"  onChange={this.handleChange}>
         <option>new</option>
         <option>used</option>
         <option>hot</option>
         <option>sale</option>

         </select>



        {/* <label htmlFor="input-default">Badges</label>
        <input id="input-default" type="text" className="form-control" placeholder="Placeholder" id='badges' onChange={this.handleChange}/> */}
</div>
<div className="form-group">
        <label htmlFor="input-default">Brand</label>
        <input  type="text" className="form-control" placeholder="Placeholder" id='brand' onChange={this.handleChange}/>
</div>
<div className="form-group">
        <label htmlFor="input-default">CompareAtPrice</label>
        <input  type="text" className="form-control" placeholder="Placeholder" id='compareAtPrice' onChange={this.handleChange}/>
</div>
<div className="form-group">
        <label htmlFor="input-default">Rating</label>
        <input  type="text" className="form-control" placeholder="Placeholder" id='rating' onChange={this.handleChange}/>
</div>
<div className="form-group">
        <label htmlFor="input-default">Reviews</label>
        <input  type="text" className="form-control" placeholder="Placeholder" id='reviews' onChange={this.handleChange}/>
</div>
<div className="form-group">
        <label htmlFor="input-default">Slug</label>
        <input  type="text" className="form-control" placeholder="Placeholder" id='slug' onChange={this.handleChange}/>

    </div>
    <div className="form-group">
         <label htmlFor="select-default">Categories</label>
         <select id="categories" className="form-control"  onChange={this.handleChange}>
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
         <div >
              <div className="form-group">
              <div className="form-group">
              <button type="button" className={`btn btn-primary btn-lg`}  onClick={() =>
                                  this.fileInputRef.current.click()
                                }>Select Image</button>
                                {' '}
              <button type="button" className={`btn btn-primary btn-lg`}  onClick={() =>
                                  this.fileInputRef.current.click()
                                }>Select Image</button></div>
                                 <div className="form-group"></div>
                                 <div className="form-group">
              <button type="button" className={`btn btn-primary btn-lg`}  onClick={() =>
                                  this.fileInputRef.current.click()
                                }>Select Image</button>
                                {' '}
                              <button type="button" className={`btn btn-primary btn-lg`}  onClick={() =>
                                  this.fileInputRef.current.click()
                                }>Select Image</button></div>
                                {' '}
                              <button type="button" className={`btn btn-primary btn-lg`}  onClick={this.onFormSubmit}>Upload</button>
                              <input
                                type="file"
                                ref={this.fileInputRef}
                                onChange={event => this.fileChange(event)}
                                hidden
                              />
               </div>
</div>

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

const mapStateToProps = ({ image }) => ({



});








const mapDispatchToProps = dispatch => {
  return {
    createProduct: (product) => dispatch(createProduct(product)),
    uploadImage,
    getData

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct)

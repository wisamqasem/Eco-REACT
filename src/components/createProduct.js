import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProduct } from '../store/products/productAction'
import { Redirect } from 'react-router-dom'
import MainComponent from './MainComponent'
import { uploadImage, getData } from "../store/images/uploadImagesAction";
import ReactDOM from 'react-dom';
import {checkUserLoged}  from '../store/auth/authActions';


class CreateProduct extends Component {

  state = {
   // error: null,
  //  image: null,
  availability: 'In stock',
  badges: '....',
  //brand:null,
  categories: '....',
  compareAtPrice: '0',
  name:'',
  price:'',
  description:'',
  //rating:null,
  reviews:null,
  slug:null,
  userId:null,
  images:[],
  imagesUploaded: [],
  selectImageBtn:"select image",
  errdescription: false,
  errName:false,
  errImage:false,
  errPrice:false,
  }
  componentDidMount() {
    this.props.getData();
  }

  fileInputRef = React.createRef();

    changeText = (text) => this.state.selectImageBtn="add more images";
  onFormSubmit = e => {
    e.preventDefault(); // Stop form submit
    var {errName,errImage,errPrice,errdescription}=this.state;
    var {description , name,price} = this.state;
    //validating the file
    //check if the file is exists
    if (this.state.file === null) this.setState( {errImage: true });
    if(description=='')this.setState( {errdescription: true });
    if(name==='')this.setState( {errName: true });
    if(price==='')this.setState( {errPrice: true });
    if(description=='' || name=='' || price=='' ||  this.state.file === null){return;}
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
    try{
    if (
      this.state.file.type === "image/jpeg" ||
      this.state.file.type === "image/png" ||
      this.state.file.type === "image/jpg" ||
      this.state.description === null ||
      this.state.name === null ||
      this.state.price === null

    ) {




this.props.createProduct(this.state);
this.props.history.push('/')
     // this.props.uploadImage(this.state.file);
    } else {
      alert("Please provide a valid image. (JPG, JPEG or PNG) or there is some fields are empty");
    }
}catch(e){      alert("No image is selected!"); return;}
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
const imageUploadedIcon = ( <div  className={`alert alert-success `}
><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="green" className="bi bi-check2-circle green-text" viewBox="0 0 16 16">
<path fillRule="evenodd" d="M15.354 2.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L8 9.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
<path fillRule="evenodd" d="M8 2.5A5.5 5.5 0 1 0 13.5 8a.5.5 0 0 1 1 0 6.5 6.5 0 1 1-3.25-5.63.5.5 0 1 1-.5.865A5.472 5.472 0 0 0 8 2.5z"/>
</svg></div>);

this.state.imagesUploaded.push(imageUploadedIcon);












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
//   handleSubmit = (e) => {
//     e.preventDefault();
//     // console.log(this.state);
//     this.props.createProduct(this.state);
//     // this.props.history.push('/');// to back to home page
//   }





  render() {


    const {auth} = this.props
    const {errdescription,errPrice,errName,errImage} = this.state;
    if (!auth.uid) return <Redirect to='/' />
    this.state.userId = auth.uid;

    console.log("userId",auth.uid);
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
        <input  type="text" className={"form-control "+(errName ? 'is-invalid': '')}   placeholder="Enter product name " id='name' onChange={this.handleChange}/>
</div>
<div className="form-group">
        <label htmlFor="input-default">Price</label>
        <input  type="text" className={"form-control "+(errPrice ? 'is-invalid': '')} placeholder="Enter product price" id='price' onChange={this.handleChange}/>
</div>
<div className="form-group">
        <label htmlFor="input-default">Availability</label>
        <select id='availability' className="form-control"  onChange={this.handleChange}>
         <option>In stock</option>
         <option>Sold out</option>
         <option>Out of order</option>
         </select>
        {/* <input  type="text" className="form-control" placeholder="Placeholder" id='availability' onChange={this.handleChange}/> */}
</div>
<div className="form-group">
<label htmlFor="input-default">Badges</label>
<select id='badges' className="form-control"  onChange={this.handleChange}>
         <option>....</option>
         <option>new</option>
         <option>used</option>
         <option>hot</option>
         <option>sale</option>


         </select>



        {/* <label htmlFor="input-default">Badges</label>
        <input id="input-default" type="text" className="form-control" placeholder="Placeholder" id='badges' onChange={this.handleChange}/> */}
</div>
 <div className="form-group">
        <label htmlFor="input-default">Description</label>
        <textarea  type="text" className={"form-control "+(this.state.errdescription ? 'is-invalid': '')}   placeholder="Enter the Description of the product" id='description' onChange={this.handleChange}></textarea>
</div>
{/* <div className="form-group">
        <label htmlFor="input-default">Brand</label>
        <input  type="text" className="form-control" placeholder="Placeholder" id='brand' onChange={this.handleChange}/>
</div> */}
<div className="form-group">
        <label htmlFor="input-default">CompareAtPrice</label>
        <input  type="text" className="form-control" placeholder="Placeholder" id='compareAtPrice' onChange={this.handleChange}/>
</div>
{/* <div className="form-group">
        <label htmlFor="input-default">Rating</label>
        <input  type="text" className="form-control" placeholder="Placeholder" id='rating' onChange={this.handleChange}/>
</div> */}
{/* <div className="form-group">
        <label htmlFor="input-default">Reviews</label>
        <input  type="text" className="form-control" placeholder="Placeholder" id='reviews' onChange={this.handleChange}/>
</div> */}

    <div className="form-group">
         <label htmlFor="select-default">Categories</label>
         <select id="categories" className="form-control"  onChange={this.handleChange}>
         <option>....</option>
         <option>Pet Supplies</option>
         <option>Office Product</option>
         <option>Grocery & Gourmet Food</option>
         <option>Toys & Games</option>
         <option>Movies & TV</option>
         <option>Sports & Outdoors</option>
         <option>Tools & Home</option>
         <option>Clothing & Accessories</option>
         <option>Software & Mobile Apps</option>
         <option>Books</option>
         <option>Health & Beauty</option>
         <option>Electronics & Accessories</option>
         <option>Home & Kitchen</option>
         </select>
     </div>

     <div className="form-group">
        <label htmlFor="input-default">Upload Images</label>

        {/* <input type='file' />
         <img id="myImg" src="#" alt="your image" height='200' width='100'></img> */}
         <div >
              <div className="form-group">

                                 <div className="form-group" >
<div className={"row-reverse "}>
                                 {this.state.imagesUploaded.map((icon,i)=>{return <div  key={i}>{icon}</div>})}</div>
                              <button type="button" id="selctImageBtn" className={`btn btn-primary btn-lg`}  onClick={() =>{
                                  this.fileInputRef.current.click();this.changeText("add more images")}
                                }>{this.state.selectImageBtn}</button></div>
                                {' '} <button type="submit" className={"btn btn-primary  btn-lg"}  onClick={this.onFormSubmit} >Upload</button>



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



const mapStateToProps = (state) => {
    return{
      authError: state.auth.authError,
      auth: state.firebase.auth
    }
  }


const mapDispatchToProps = dispatch => {
  return {
    createProduct: (product) => dispatch(createProduct(product)),
    uploadImage,
    getData,
   // getUserId : () => dispatch(checkUserLoged()),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct)

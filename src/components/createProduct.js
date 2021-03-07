import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProduct } from '../store/products/productAction'
import { Redirect } from 'react-router-dom'
import MainComponent from './MainComponent'
import { uploadImage, getData } from "../store/images/uploadImagesAction";
import ReactDOM from 'react-dom';
import {checkUserLoged}  from '../store/auth/authActions';
import {  getCategoriesData} from '../store/categories/categoriesAction';
import Departments from './header/Departments'
import {
    Menu,
    MenuItem,
    MenuButton,
    SubMenu
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import { SwatchesPicker } from 'react-color';
import { Check12x9Svg } from '../svg';
import { colorType } from '../services/color';
import classNames from 'classnames';


class CreateProduct extends Component {

  state = {
   // error: null,
  //  image: null,
  availability: 'In stock',
  badges: '....',
  brand:null,
  categories:null,
  subCategory:null,
  colors:[],
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
  errBrand:false,
  categoryBtn:'primary',
  brandBtn:'primary',
  imageBtn:'primary',

  }
  componentDidMount() {
    this.props.getData();

  }


  fileInputRef = React.createRef();

    changeText = (text) => this.state.selectImageBtn="add more images";
  onFormSubmit = e => {
    e.preventDefault(); // Stop form submit
    var {errName,errImage,errPrice,errdescription}=this.state;
    var {description , name,price,brand,subCategory} = this.state;
    //validating the file
    //check if the file is exists
    console.log("🚀 ~ file: createProduct.js ~ line 72 ~ CreateProduct ~ this.state.file", this.state.file)
    if (!this.state.file) this.setState( {errImage: true,imageBtn:'danger' });else this.setState( {errImage: false,imageBtn:'primary' });
    if(description=='')this.setState( {errdescription: true });else this.setState( {errdescription: false });
    if(name==='')this.setState( {errName: true });else this.setState( {errName: false });
    if(price==='')this.setState( {errPrice: true });else this.setState( {errPrice: false });
    if(brand===null)this.setState( {brandBtn: 'danger'  });else this.setState( {brandBtn: 'primary'  });
    if(subCategory===null)this.setState({categoryBtn: 'danger' });else this.setState({categoryBtn: 'primary' });
    if(description=='' || name=='' || price=='' || brand=='' ||subCategory==null || this.state.file === null){return;}
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
  handleCategoryClick=(subCategoryName,categoryName)=>{
    this.setState({categories: categoryName,subCategory:subCategoryName})
  }
  handleBrandClick=(brandName)=>{
    this.setState({brand: brandName})
  }
  handleColorChange=(e)=>{
      var {colors} =this.state;
      if(e.target.checked){

      //console.log("color : ",e.target.value);
      //console.log("color arr : ",colors);
      //colors=colors.push(e.target.value)
      this.setState({colors:[...colors,e.target.value]});
    }

else {colors = colors.filter(x=>x!=e.target.value);  this.setState({colors:[...colors]}); }


  }
//   handleSubmit = (e) => {
//     e.preventDefault();
//     // console.log(this.state);
//     this.props.createProduct(this.state);
//     // this.props.history.push('/');// to back to home page
//   }





  render() {


    const {auth,categories} = this.props
    console.log("🚀 ~ file: createProduct.js ~ line 218 ~ CreateProduct ~ render ~ categories", categories)
    const {errdescription,errPrice,errName,errImage,subCategory,brand,brandBtn} = this.state;
    var subCategoryPath,categoryPath ='';
    const colors = [
        { slug: 'white', color: '#fff' },
        { slug: 'silver', color: '#d9d9d9' },
        { slug: 'light-gray', color: '#b3b3b3' },
        { slug: 'gray', color: '#808080' },
        { slug: 'dark-gray', color: '#666' },
        { slug: 'coal', color: '#4d4d4d' },
        { slug: 'black', color: '#262626' },
        { slug: 'red', color: '#ff4040' },
        { slug: 'orange', color: '#ff8126' },
        { slug: 'yellow', color: '#ffd333' },
        { slug: 'pear-green', color: '#becc1f' },
        { slug: 'green', color: '#8fcc14' },
        { slug: 'emerald', color: '#47cc5e' },
        { slug: 'shamrock', color: '#47cca0' },
        { slug: 'shakespeare', color: '#47cccc' },
        { slug: 'blue', color: '#40bfff' },
        { slug: 'dark-blue', color: '#3d6dcc' },
        { slug: 'violet', color: '#7766cc' },
        { slug: 'purple', color: '#b852cc' },
        { slug: 'cerise', color: '#e53981' },
    ];
    const colorsList = colors.map((item,index) =>
    {
    return (
        <div key={index} className="filter-color__item">
            <span
                className={classNames('filter-color__check input-check-color', {
                    'input-check-color--white': colorType(item.color) === 'white',
                    'input-check-color--light': colorType(item.color) === 'light',
                })}
                style={{ color: item.color }}
            >
                <label className="input-check-color__body">
                    <input
                        className="input-check-color__input"
                        type="checkbox"
                        value={item.slug}
                       // checked={value.includes(item)}
                        onChange={this.handleColorChange}
                    />
                    <span className="input-check-color__box" />
                    <Check12x9Svg className="input-check-color__icon" />
                    <span className="input-check-color__stick" />
                </label>
            </span>
        </div>
    )}
    );
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
        <input  type="text" className={"form-control "+(this.state.errBrand ? 'is-invalid': '')} placeholder="Placeholder" id='brand' onChange={this.handleChange}/>
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
<label htmlFor="input-default">Colors</label>
<div className="filter-color">
            <div className="filter-color__list">
            { colorsList }
            </div>
        </div>

{/* <SwatchesPicker color='#607d8b' onChange={ this.handleColorChange }/> */}

</div>


{/*this submenu from  https://szhsin.github.io/react-menu/ */}
<div className="form-group">
<Menu  menuButton={<button type="button" className={"btn btn-"+this.state.categoryBtn+"  btn-lg"}   >Category</button>} >
{categories.map((category,index)=>{
return( <SubMenu key={index} label={category.fields.name.stringValue}> {
category.fields.subCategories.arrayValue.values.map((x,index)=>{
  return ( <MenuItem    onClick={e=>{this.handleCategoryClick(x.stringValue,category.fields.name.stringValue)}} key={index}>{x.stringValue}</MenuItem>)
})
} </SubMenu>)
         })}
</Menu>

    {/* console.log('subcategories : ',this.props.categories.filter(x=>x.fields.name==this.state.categories))} */}
<label >{subCategory ? this.state.categories+'>'+subCategory:''}</label>
</div>

{this.state.categories &&
    <div className="form-group">
<Menu  menuButton={<button type="button" className={"btn btn-"+brandBtn+"  btn-lg"}   >Brand</button>} >
{categories.find(x=>x.fields.name.stringValue==this.state.categories).fields.brands.arrayValue.values.map((brand,index)=>{
    return ( <MenuItem onClick={e=>{this.handleBrandClick(brand.stringValue)}}  key={index}>{brand.stringValue}</MenuItem>)
         })}
</Menu>
<label >{brand ? brand:''}</label>
</div>
}


     <div className="form-group">
        <label htmlFor="input-default">Upload Images</label>

        {/* <input type='file' />
         <img id="myImg" src="#" alt="your image" height='200' width='100'></img> */}
         <div >
              <div className="form-group">
                                 <div className="form-group" >
                                 <div className={"row-reverse "}>
                                 {this.state.imagesUploaded.map((icon,i)=>{return <div  key={i}>{icon}</div>})}</div>
                              <button type="button" id="selctImageBtn" className={'btn btn-'+this.state.imageBtn+' btn-lg'}  onClick={() =>{
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
      auth: state.firebase.auth,
      categories:state.categories.categories,
    }
  }


const mapDispatchToProps = dispatch => {
  return {
    createProduct: (product) => dispatch(createProduct(product)),
    getCategoriesData: (category) => dispatch(getCategoriesData(category)),
    uploadImage,
    getData,
   // getUserId : () => dispatch(checkUserLoged()),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct)

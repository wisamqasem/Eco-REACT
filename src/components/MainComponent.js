import React, { Component } from "react";
import { uploadImage, getData } from "../store/images/uploadImagesAction";
//import Spinner from "../helpers/Spinner";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class MainComponent extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      percent: 0,
      showProgress: null,
      image: null
    };
  }

  componentDidMount() {
    this.props.getData();
  }

  //create ref
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
      this.props.uploadImage(this.state.file);
    } else {
      alert("Please provide a valid image. (JPG, JPEG or PNG)");
    }
  };

  //handle file change
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

  render() {
    const { image, percent, showProgress } = this.state;
    console.log("image : ",image);

      return (
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
      );

  }
}

const mapStateToProps = ({ image }) => ({
 error: image.error,
  percent: image.percent,
  showProgress: image.showProgress,
  image: image.image
// error:null,
// percent: null,
//    showProgress: null,
//    image: null
});

const mapDispatchToProps = {
  uploadImage,
  getData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MainComponent));

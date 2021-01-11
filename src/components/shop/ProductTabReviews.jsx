// react
import React, { Component } from 'react'

// application
import Pagination from '../shared/Pagination';
import Rating from '../shared/Rating';

// data stubs
import reviews from '../../data/shopProductReviews';
import {addreview} from '../../store/products/reviewAction'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { firebaseConnect } from 'react-redux-firebase'
import ErrorBoundary from './Errhandler'
import { object } from 'prop-types';

class ProductTabReviews extends Component {




state= {
    productId : this.props.productId,
    productRating : parseFloat(this.props.product.rating.stringValue),
    productPeopleRated : parseFloat(this.props.product.peopleRated.stringValue),
    review_stars:'5',
    review_author : '',
    review_email :'' ,
    review_text : '',
    errName : false ,
    errEmail : false ,
    errText : false


}
onFormSubmit = e => {
  var {review_author,review_email,review_text} = this.state
    e.preventDefault(); // Stop form submit
    if(review_author==='')this.setState( {errName: true });
    if(review_email==='')this.setState( {errEmail: true });
    if(review_text==='')this.setState( {errText: true });
    if(review_author=='' || review_email=='' || review_text=='' ){return;}
this.props.addreview(this.state)

}
handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }










render(){

const {productId}=this.props;

    return (
        <div className="reviews-view">
            <div className="reviews-view__list">
                <h3 className="reviews-view__header">Customer Reviews</h3>

                <div className="reviews-list">
                    <ol className="reviews-list__content">

                           {Object.keys(this.props.product.reviews.arrayValue).length  ?
                           this.props.product.reviews.arrayValue.values.map((review, index) => (
    <li key={index} className="reviews-list__item">
        <div className="review">
            <div className="review__avatar"><img src={review.mapValue.fields.avatar.stringValue} alt="" /></div>
            <div className=" review__content">
                <div className=" review__author">{review.mapValue.fields.name.stringValue}</div>
                <div className=" review__rating">
                    <Rating value={parseInt(review.mapValue.fields.rating.stringValue)} />
                </div>
                <div className=" review__text">{review.mapValue.fields.review.stringValue}</div>
                <div className=" review__date">{review.mapValue.fields.date.stringValue.slice(0,review.mapValue.fields.date.stringValue.length-38)}</div>
            </div>
        </div>
    </li>
)):
<div><h1>there is no reviews yet</h1></div>
}
                    </ol>
                    <div className="reviews-list__pagination">
                        <Pagination current={1} siblings={2} total={10} />
                    </div>
                </div>
            </div>

            <form className="reviews-view__form">
                <h3 className="reviews-view__header">Write A Review</h3>
                <div className="row">
                    <div className="col-12 col-lg-9 col-xl-8">
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label htmlFor="review-stars">Review Stars</label>
                                <select id="review_stars" className="form-control" onChange={this.handleChange}>
                                    <option>5</option>
                                    <option>4</option>
                                    <option>3</option>
                                    <option>2</option>
                                    <option>1</option>
                                </select>
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="review-author">Your Name</label>
                                <input type="text" className={"form-control "+(this.state.errName ? 'is-invalid': '')} id="review_author" placeholder="Your Name" onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="review-email">Email Address</label>
                                <input type="text" className={"form-control "+(this.state.errEmail ? 'is-invalid': '')} id="review_email" placeholder="Email Address" onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="review-text">Your Review</label>
                            <textarea className={"form-control "+(this.state.errText ? 'is-invalid': '')} id="review_text" rows="6"  onChange={this.handleChange}/>
                        </div>
                        <div className="form-group mb-0">
                            <button type="submit" className="btn btn-primary btn-lg" onClick={this.onFormSubmit} >Post Your Review</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
}

// export default compose(
//     firestoreConnect((props) => [
//       { collection: 'products', doc: props.productId } // or `todos/${props.todoId}`
//     ]),
//     connect(({ firestore: { data } }, props) => ({
//       products: data.products && data.products[productId]
//     }))
//   )(ProductTabReviews);
const mapStateToProps = (state) => {
    return{

    }
  }


const mapDispatchToProps = dispatch => {
  return {
    addreview: (review) => dispatch(addreview(review)),



  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductTabReviews)
//export default firebaseConnect()(ProductTabReviews)



import { combineReducers } from 'redux';

// reducers
import cartReducer from './cart';
import compareReducer from './compare';
import currencyReducer from './currency';
import localeReducer from './locale';
import mobileMenuReducer from './mobile-menu';
import quickviewReducer from './quickview';
import sidebarReducer from './sidebar';
import version from './version';
import wishlistReducer from './wishlist';
import productReducer from './products/productReducer';
import reviewReducer from './products/reviewReducer';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import uploadImagesReducer from './images/uploadImagesReducer';
import authReducer from './auth/authReducer';
import categoriesReducer from './categories/categoriesReducer';

export default combineReducers({
    version: (state = version) => state,
    cart: cartReducer,
    compare: compareReducer,
    currency: currencyReducer,
    locale: localeReducer,
    mobileMenu: mobileMenuReducer,
    quickview: quickviewReducer,
    sidebar: sidebarReducer,
    wishlist: wishlistReducer,
    product:productReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    image: uploadImagesReducer,
    auth : authReducer,
    review: reviewReducer,
    categories:categoriesReducer
});

// react
import React from 'react';

// third-party
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// application
import * as serviceWorker from './serviceWorker';
import Root from './components/Root';
import store from './store';


import firebase from 'firebase/app'
import fbConfig from './fbConfig'
import { reduxFirestore, getFirestore, createFirestoreInstance } from 'redux-firestore'
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase'


import Dashboard from './fake-server/database/Dashboard'

// styles
import 'slick-carousel/slick/slick.css';
import 'react-toastify/dist/ReactToastify.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-input-range/lib/css/index.css';
import './scss/style.scss';




const rrfProps = {
    firebase,
    config: fbConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
    userProfile: 'users', // where profiles are stored in database
    presence: 'presence', // where list of online users is stored in database
    sessions: 'sessions'
  };



ReactDOM.render((
    // eslint-disable-next-line react/jsx-filename-extension
    <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
<Dashboard/>
    <Root />
    </ReactReduxFirebaseProvider>

    </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

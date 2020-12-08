export const createProduct = (product) => {
    return (dispatch, getState, {getFirestore}) => {
      // make async call to database
      const firestore = getFirestore();
      firestore.collection('products').add({
        ...product,
        authorFirstName: 'Net',
        authorLastName: 'Ninja',
        authorId: 12345,
        createdAt: new Date()
      }).then(() => {
        dispatch({ type: 'CREATE_PRODUCT_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'CREATE_PRODUCT_ERROR' }, err);
      });
    }
  };

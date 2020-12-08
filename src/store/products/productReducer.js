const initState = {
    products: [
      {id: '1', title: 'help me find peach', content: 'blah blah blah'},
      {id: '2', title: 'collect all the stars', content: 'blah blah blah'},
      {id: '3', title: 'egg hunt with yoshi', content: 'blah blah blah'}
    ]
  }

  const productReducer = (state = initState, action) => {
    switch (action.type) {
      case 'CREATE_PRODUCT_SUCCESS':
        console.log('create product success');
        return state;
      case 'CREATE_PRODUCT_ERROR':
        console.log('create product error');
        return state;
      default:
        return state;
    }
  };

  export default productReducer;

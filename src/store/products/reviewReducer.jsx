const initState = {
    products: [
      {id: '1', title: 'help me find peach', content: 'blah blah blah'},
      {id: '2', title: 'collect all the stars', content: 'blah blah blah'},
      {id: '3', title: 'egg hunt with yoshi', content: 'blah blah blah'}
    ]
  }

  const reviewReducer = (state = initState, action) => {
    switch (action.type) {
      case 'CREATE_REVIEW_SUCCESS':
        console.log('create review success');
        alert("CREATE_REVIEW_SUCCESS");
        return state;
      case 'CREATE_REVIEW_ERROR':
        console.log('create review error');
        alert("CREATE_REVIEW_FAILED");
        return state;
      default:
        return state;
    }
  };

  export default reviewReducer;

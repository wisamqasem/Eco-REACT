function categoriesData(state,categories) {
console.log("🚀 ~ file: categoriesReducer.jsx ~ line 2 ~ categoriesData ~ categories", categories)

    if(!categories)return{
          ...state,
          categories:[]
        }
   // const categories = Products.data.fields.products.arrayValue.values;
    return{
        ...state,
        categories,
    }
}






const initialState = {
    categories:[]
};

export default function categoriesReducer(state = initialState, action) {

    switch (action.type) {
    case 'GET_CATEGORIES_DATA' : return categoriesData(state,action.categories);
    default:
        return state;
    }
}

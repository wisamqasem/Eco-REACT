import { toast } from 'react-toastify';
import { Object } from 'sugar';
import firebase from '../../config/fbConfig'

import shopApi from '../../api/shop'


export function getCategoriesData(){

    return (dispatch) => (
        new Promise((resolve) => {

            shopApi.getCategories({limit:20}).then((categories)=>{
            console.log("", categories)

                dispatch({ type: 'GET_CATEGORIES_DATA' ,categories :categories });

            })
         resolve();
        })

    )
}

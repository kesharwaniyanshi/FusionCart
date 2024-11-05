
import axios from "axios";
import * as actionTypes from "../constants/productConstants"

const URL = "https://fusion-cart-api.vercel.app";
// const URL = "http://localhost:5000";
export const getProducts=()=>async(dispatch)=>{
    try {    
       const {data}= await axios.get(`${URL}/products`);
        // console.log(response);
        dispatch({type:actionTypes.GET_PRODUCTS_SUCCESS,payload:data});
    } catch (error) {
        dispatch({ type: actionTypes.GET_PRODUCTS_FAIL, payload: error.message});
        console.error("Error fetching products:", error);

    }
}


export const getProductDetails = (product_id) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST});
        const { data } = await axios.get(`${URL}/product/${product_id}`);
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type:actionTypes.GET_PRODUCT_DETAILS_FAIL, payload:error.message});
    }
}

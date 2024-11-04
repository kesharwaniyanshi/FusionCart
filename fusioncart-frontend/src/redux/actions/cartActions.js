import axios from "axios"
import * as actionTypes from "../constants/cartConstant"


const URL = "http://localhost:5000"
export const AddToCart = (product_id, quantity) => async (dispatch) => {
    try {
        const { data } = await axios.get(`${URL}/product/${product_id}`)
        dispatch({ type: actionTypes.ADD_TO_CART, payload: { ...data, quantity } });
    } catch (error) {
        dispatch({ type: actionTypes.ADD_TO_CART_ERROR, payload: error.message });

    }
}

export const RemoveFromCart = (product_id) => (dispatch) => {

    dispatch({ type: actionTypes.REMOVE_FROM_CART, payload: product_id });

}   
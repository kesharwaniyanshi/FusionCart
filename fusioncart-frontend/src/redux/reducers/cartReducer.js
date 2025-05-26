import * as actionType from "../constants/cartConstant";

export const cartReducer=(state={cartItems:[]},action)=>{
    switch(action.type){
        case actionType.ADD_TO_CART:
            const item=action.payload;
            const exist= state.cartItems.find(product => product.product_id === item.product_id);
            if(exist){
                return { ...state, cartItems: state.cartItems.map(product => product.product_id === exist.product_id ? { ...product, quantity: product.quantity+1}:product)}
        }
        else{
            return {...state,cartItems:[...state.cartItems,{...item,quantity:1}]}
        }
        case actionType.REMOVE_FROM_CART:
            return {...state,cartItems: state.cartItems.filter(product=>product.product_id!==action.payload)};

        case actionType.UPDATE_ITEM_QUANTITY:
            return{
                ...state,
                cartItems:state.cartItems.map(product=>product.product_id===action.payload.product_id?{...product,quantity:action.payload.quantity}:product)
            }
            
        default:
            return state;
    }

}
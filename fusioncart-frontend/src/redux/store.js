import { getProductDetailsReducer } from './reducers/productReducer';
import { getProductsReducer } from './reducers/productReducer';
const { createStore, combineReducers, applyMiddleware } = require('redux');
const { composeWithDevTools } = require('redux-devtools-extension');
const thunk = require("redux-thunk").default;

const reducer = combineReducers({
    getProducts: getProductsReducer,
    getProductDetails: getProductDetailsReducer
});

const middleware = [thunk];
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

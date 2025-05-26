import { getProductDetailsReducer } from './reducers/productReducer';
import { getProductsReducer } from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // ✅ This enables localStorage

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    getProducts: getProductsReducer,
    getProductDetails: getProductDetailsReducer,
    cart: cartReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];

export const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);

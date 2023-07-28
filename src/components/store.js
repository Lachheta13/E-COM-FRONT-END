import { configureStore } from "@reduxjs/toolkit";
import productSlice from './reducer/productItem';
import authSlice from './reducer/auth'

const store = configureStore({
    reducer: {product: productSlice, auth: authSlice}
});

export default store;
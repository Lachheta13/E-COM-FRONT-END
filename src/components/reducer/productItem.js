import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    name: 'ArunLachheta',
    price: 0,
    category: '',
    company: '',
}

const productSlice = createSlice({
    name: 'productItem',
    initialState,
    reducers:{
        updateName(state,action){
            state.name = action.payload; 
        },
        updatePrice(state,action){
            state.price = action.payload;
        },
        updateCategory(state, action){
            state.category = action.payload;
        },
        updateCompany(state, action){
            state.company = action.payload;
        }
    }
});

export const productAction = productSlice.actions;
export default productSlice.reducer;
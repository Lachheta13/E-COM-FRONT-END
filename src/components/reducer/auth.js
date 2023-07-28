import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auth: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action) {
            state.auth = action.payload
        }
    }
});

export const authAction = authSlice.actions;
export default authSlice.reducer;

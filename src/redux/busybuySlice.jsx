import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productData: [],
    userInfo: null,
    orderData: [],
};

export const busybuySlice = createSlice({
    name: "busybuy",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = state.productData.find(
                (item) => item.id === action.payload.id
            );
            if(item) {
                item.quantity += action.payload.quantity;
            }else {
                state.productData.push(action.payload);
            }
        },
        deleteItem: (state, action) => {
            state.productData = state.productData.filter(
                (item) => item.id !== action.payload
            );
        },
        resetCart: (state) => {
            state.productData = [];
        },
        incrementQuantity: (state, action) => {
            const item = state.productData.find(
                (item) => item.id === action.payload.id
            );
            if(item){
                item.quantity++;
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.productData.find(
                (item) => item.id === action.payload.id
            );
            if(item.quantity === 1){
                item.quantity = 1;
            }else {
                item.quantity--;
            }
        },
        addUser: (state, action) => {
            state.userInfo = action.payload;
        },
        removeUser: (state) => {
            state.userInfo = null;
        },
        addToOrder: (state, action) => {
            state.orderData.push(action.payload);
        },
        resetOrder: (state) => {
            state.orderData = [];
        },
    },
});
// exporting all actions
export const { 
    addToCart, 
    deleteItem, 
    resetCart,
    incrementQuantity, 
    decrementQuantity, 
    addUser, 
    removeUser,
    addToOrder,
    resetOrder,
} = busybuySlice.actions;
// exporting the reducer
export default busybuySlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:"cart",
    initialState:[],
    reducers:{
        addToCart:(state,action)=>{
      const existingProduct = state.find((item) => item.id === action.payload.id);
      
      if (existingProduct) {
        existingProduct.quantity =  existingProduct.quantity + 1;
      } else {
        state.push(action.payload);
      }
        },
        removeFromCart:(state,action)=>{
            return state.filter((item) => item.id !== action.payload);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const product = state.find((item) => item.id === id);
            
            if (product) {
              product.quantity = quantity; // Update the quantity
            }
          }
    }
})

export const{addToCart,removeFromCart,updateQuantity}=cartSlice.actions;
export default cartSlice.reducer;
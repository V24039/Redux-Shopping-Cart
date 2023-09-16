import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { itemsList: [], totalItems: 0, showCart: false, totalAmount:0 },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.itemsList.find(
        (item) => item.id === newItem.id
      );
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      } else {
        state.itemsList.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.name,
        });
      }
      state.totalItems += 1;
      state.totalAmount += newItem.price;
    },
    showCart(state) {
      state.showCart = true;
    },
    removeFromCart(state,action){
      const id = action.payload
      const existingItem = state.itemsList.find(
        (item) => item.id === id
      );
      state.totalAmount += existingItem.price;
      if(existingItem.quantity === 1){
        state.itemsList = state.itemsList.filter(
          (item) => item.id !== id
        );
      }else{
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    }
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;

import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
  name: "basket",
  initialState: {
    items: [],
  },
  reducers: {
    addToBasket: (state, action) => {
      state.items.push({ ...action.payload, buyedQuantity: 1 });
    },
    removeFromBasket: (state, action) => {
      state.items = state.items.filter((item) => item._id != action.payload);
    },
    updateQuantity: (state, action) => {
      let product = state.items.filter(
        (item) => item._id == action.payload._id,
      )[0];
      product.buyedQuantity = action.payload.quantity;
    },
    clearBasket: (state) => {
      state.items = [];
    },
  },
});

export const { updateQuantity, addToBasket, clearBasket, removeFromBasket } =
  basketSlice.actions;

export default basketSlice.reducer;

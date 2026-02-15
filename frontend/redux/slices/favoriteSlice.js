import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    items: [],
  },
  reducers: {
    addToFavorite: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromFavorite: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    clearFavorite: (state) => {
      state.items = [];
    },
  },
});

export const { addToFavorite, removeFromFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatMessages: [],
  },
  reducers: {
    saveMessage: (state, action) => {
      console.log(action.payload);
      state.chatMessages.push(action.payload);
    },

    clearChat: (state) => {
      state.chatMessages = [];
    },
  },
});

export const { saveMessage, clearChat } = chatSlice.actions;

export default chatSlice.reducer;

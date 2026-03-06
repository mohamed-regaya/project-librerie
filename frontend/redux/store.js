import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import authReducer from "./slices/authSlice";
import basketReducer from "./slices/basketSlice";
import favoriteReducer from "./slices/favoriteSlice";
import chatReducer from "./slices/chatSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  basket: basketReducer,
  favorite: favoriteReducer,
  chat: chatReducer,
});

const persistConfig = {
  key: "root",
  version: 1,

  storage,
  whitelist: ["auth", "basket", "favorite", "chat"], // choose what to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

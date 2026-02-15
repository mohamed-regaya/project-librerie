import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import authReducer from "./slices/authSlice";
import basketReducer from "./slices/basketSlice";
import favoriteReducer from "./slices/favoriteSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  basket: basketReducer,
  favorite: favoriteReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "basket", "favorite"], // choose what to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

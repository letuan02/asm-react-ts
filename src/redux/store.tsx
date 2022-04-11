import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "./rootReducer";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { sizeApi } from "../api/size";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "cart"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleware = [
    thunk,
    sizeApi.middleware
]

export const store = createStore(persistedReducer, applyMiddleware(...middleware));
export default persistStore(store);

setupListeners(store.dispatch);
import { configureStore } from "@reduxjs/toolkit";
import { cartReducer, modalReducer } from "./reducers";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        modal: modalReducer
    }
})
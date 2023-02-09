import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import searchPizzaReducer from "./slices/searchSlice";
import pizza from "./slices/pizzaSlice";
import cart from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    searchPizza: searchPizzaReducer,
    cart,
    pizza,
  },
});

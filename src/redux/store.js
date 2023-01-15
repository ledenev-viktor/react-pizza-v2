import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import searchPizzaReducer from './slices/searchSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    searchPizza: searchPizzaReducer,
  },
});

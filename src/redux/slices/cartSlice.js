import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addItem(state, action) {
    //     state.items.push(action.payload);
    //     state.totalPrice  = state.items.reduce((sum, {price}) => {
    //         return sum += price;
    //     }, 0)
    // },
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, { price, count }) => {
        return price * count + sum;
      }, 0);
    },
    removeItem(state, action) {
        state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems(state, action) {
      state.items = [];
      state.totalPrice = 0;
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count--;
      }
    },
  },
});


/*
 создание селектора:
 Если есть повторяющийся код в заборе данных через useSelector, 
 то хорошей практикой является вынести эти селекторы:
 cartSelector, cartItemByIdSelector
*/
export const cartSelector = (state) => state.cart; 
export const cartItemByIdSelector = (id) => (state) => state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;
export default cartSlice.reducer;

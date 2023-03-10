import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async ({ currentPage, search, category, sort, order }, thunkAPI) => {
    const addressApi = `https://62eac342ad2954632593de7c.mockapi.io/items?&page=${currentPage}&limit=4${search}${category}${sort}${order}`;
    const { data } = await axios.get(addressApi);
    console.log(thunkAPI.getState());

    if (data.length === 0) {
      return thunkAPI.rejectWithValue('Пицц нет');
    }
    return thunkAPI.fulfillWithValue(data);
    // return data;
  }
);

const initialState = {
  items: [],
  status: "loading", // loading | success | error
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = "error";
      state.items = [];
    },
  },
});

export const pizzaDataSelector = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;

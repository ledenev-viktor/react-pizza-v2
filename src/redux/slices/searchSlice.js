import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchValue: "",
}

export const searchSlice = createSlice({
    name: "searchPizza",
    initialState,
    reducers: {
        setSearchValue(state, action) {
            state.searchValue = action.payload;
        },
    }
});

export const searchPizzaValueSelector = (state) => state.searchPizza.searchValue;

export const { setSearchValue } = searchSlice.actions;

export default searchSlice.reducer;
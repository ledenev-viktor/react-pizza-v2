import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryId: 0,
    pageCount: 1,
    sort: {
        name: 'популярности',
        sortProperty: 'rating',
    }
}

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        sort(state, action) {
            state.sort = action.payload;
        },
        setPageCount(state, action) {
            state.pageCount = action.payload;
        }
    }
})

export const { setCategoryId, sort, setPageCount } = filterSlice.actions;
export default filterSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchValue: '',
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
        },
        setFilters(state, action) {
            state.sort = action.payload.sort;
            state.currentPage = Number(action.payload.currentPage);
            state.categoryId = Number(action.payload.categoryId);
        }
    }
})

export const sortSelector = (state) => state.filter.sort;
export const categoryIdSelector = (state) => state.filter.categoryId;
export const pageCountSelector = (state) => state.filter.pageCount;


export const { setCategoryId, sort, setPageCount, setFilters } = filterSlice.actions;
export default filterSlice.reducer;

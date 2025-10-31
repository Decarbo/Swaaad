import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: 'all',
  search: '',
  restaurant: 'all',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setRestaurant: (state, action) => {
      state.restaurant = action.payload;
    },
    resetFilters: (state) => {
      state.category = 'all';
      state.search = '';
      state.restaurant = 'all';
    },
  },
});

export const { setCategory, setSearch, resetFilters, setRestaurant } = filterSlice.actions;
export default filterSlice.reducer;

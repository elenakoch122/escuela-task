import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: '',
  description: '',
  dateStart: '',
  dateEnd: '',
};

const promotionSlice = createSlice({
  name: 'promotion',
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },

    setDescription: (state, action) => {
      state.description = action.payload;
    },

    setDateStart: (state, action) => {
      state.dateStart = action.payload;
    },

    setDateEnd: (state, action) => {
      state.dateEnd = action.payload;
    },
  },
});

export const { setTitle, setDescription, setDateStart, setDateEnd } = promotionSlice.actions;
export default promotionSlice.reducer;
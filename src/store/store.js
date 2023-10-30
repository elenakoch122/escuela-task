import { configureStore } from "@reduxjs/toolkit";
import promotionReducer from '../slices/promotion';

export const store = configureStore({
  reducer: {
    promotion: promotionReducer,
  },
});
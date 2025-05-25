// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import { productsApi } from './api/productsApi'; 

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware), 
});

// Types for hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

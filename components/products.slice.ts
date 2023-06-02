'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface Product {
    readonly id: number;
    name: string;
    title: string;
    price: number;
    src: string;
    alt: string;
    mount: number;
}

const productsSlice = createSlice({
    name: 'products',
    initialState: Array<Product>,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            const findID = state.some((ele) => ele.id === action.payload.id);
            if (!findID) return [action.payload, ...state];
            state.find((product) => {
                if (product.id === action.payload.id) product.mount++;
            });
        },
        removeProduct: (state, action: PayloadAction<number>) => {
            return state.filter((product) => product.id !== action.payload);
        },
        increaseProduct: (state, action: PayloadAction<number>) => {
            state.find((product) => {
                if (product.id === action.payload) product.mount++;
            });
        },
        decreaseProduct: (state, action: PayloadAction<number>) => {
            state.find((product) => {
                if (product.id === action.payload) {
                    if (product.mount > 0) product.mount--;
                }
            });
        },
    },
});

export const { addProduct, removeProduct, increaseProduct, decreaseProduct } =
    productsSlice.actions;
export const getProductSelector = (state: RootState) => state.products;

export default productsSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { add, getAll, productApi, remove, update } from "../api/product";
import { ProductType } from "../types/product";

type ProductState = {
    value: ProductType[],
    totalProduct: number
}

const initialState: ProductState = {
    value: [],
    totalProduct: 0
}

export const getProducts = createAsyncThunk(
    "product/getProducts",
    async ({ start, limit }: { start: number, limit: number }) => {
        const { data } = await getAll();
        const totalProduct = data.length;
        
        const { data: productsData } = await getAll(start, limit);

        return { totalProduct, productsData };
    }
)

export const addProduct = createAsyncThunk(
    "product/addProduct",
    async (dataProduct: ProductType) => {
        const { data } = await add(dataProduct);
        return data;
    }
)

export const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async (dataProduct: ProductType) => {
        const { data } = await update(dataProduct);
        return data;
    }
)

export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    async (id?: string) => {
        return remove(id).then(() => id);
    }
)

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, { payload }) => {
            state.value = payload.productsData;
            state.totalProduct = payload.totalProduct;
        });

        builder.addCase(addProduct.fulfilled, (state, { payload }) => {
            state.value = [...state.value, payload];
        });

        builder.addCase(updateProduct.fulfilled, (state, { payload }) => {
            state.value = state.value.map(item => item._id === payload._id ? payload : item);
        });

        builder.addCase(deleteProduct.fulfilled, (state, { payload }) => {
            state.value = state.value.filter(item => item._id !== payload);
        });
    }
})

export const selectProducts = (state: any) => state.product.value;
export const selectTotalProduct = (state: any) => state.product.totalProduct;
export default productSlice.reducer;
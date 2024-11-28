import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {createOrder, getAllOrders} from "../thunks/dishes/ordersThunks.ts";

interface OrdersState {
    orderCart: IOrderCart;
    orders: IOrders[];
    isFetching: boolean;
    isMakeOrder: boolean;
}

const initialState: OrdersState = {
    orderCart: {},
    orders: [],
    isFetching: false,
    isMakeOrder: false,
};

export const selectIsFetchingLoading = (state: RootState) => state.orders.isFetching;
export const selectIsMakeOrderLoading = (state: RootState) => state.orders.isMakeOrder;
export const selectOrderCart = (state: RootState) => state.orders.orderCart;
export const selectAllOrders = (state: RootState) => state.orders.orders;


export const OrdersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addDishToCart: (state, action: PayloadAction<IDishes>) => {
            const dish = action.payload;

            if (state.orderCart[dish.id]) {
                state.orderCart[dish.id]++;
            } else {
                state.orderCart[dish.id] = 1;
            }
        },
        deleteDishFromCart: (state, action: PayloadAction<IDishes>) => {
            const dish = action.payload;

            if (state.orderCart[dish.id] > 0) {
                state.orderCart[dish.id]--;
            } else {
                delete state.orderCart[dish.id];
            }
        },
        clearCart: (state) => {
            state.orderCart = {};
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrders.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(getAllOrders.fulfilled, (state, action: PayloadAction<IOrders[]>) => {
                state.isFetching = false;
                state.orders = action.payload;
            })
            .addCase(getAllOrders.rejected, (state) => {
                state.isFetching = true;
            })

            .addCase(createOrder.pending, (state) => {
                state.isMakeOrder = true;
            })
            .addCase(createOrder.fulfilled, (state) => {
                state.isMakeOrder = false;
            })
            .addCase(createOrder.rejected, (state) => {
                state.isMakeOrder = true;
            })
    }

});


export const ordersReducer = OrdersSlice.reducer;
export const {addDishToCart, deleteDishFromCart, clearCart} = OrdersSlice.actions;
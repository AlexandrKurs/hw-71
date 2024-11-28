import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../../axiosAPI.ts";
import {RootState} from "../../../app/store.ts";


export const getAllOrders = createAsyncThunk<IOrders[], void, {state: RootState}>(
    'orders/getAllOrders',
    async (_arg, thunkAPI) => {
        const res = await axiosAPI<IOrderAPI>('order.json'); // {[], }

        if (!res.data) return [];

        const orders = res.data; // {} обьект с заказами
        const dishes = thunkAPI.getState().dishes.dishes;

        if (orders && dishes) {
            const ordersArray: IOrders[] = Object.keys(orders).map(orderId => {
                const orderObject = orders[orderId];

                const ordersDetailsArray: {dish: IDish, amount: number}[] = Object.keys(orderObject).map(dishID => {
                    return {dish: dishes[dishID], amount: Number(orderObject[dishID])}
                });



                return {order_id: orderId, total: 0, order: ordersDetailsArray}
            });

            ordersArray.map(order => {
                return order.total = order.order.reduce((acc, dish) => {
                    acc +=  Number(dish.amount * dish.dish.price);
                    return acc;
                }, 0)
            })


            return ordersArray;
        }

        return [];
    }
)



export const createOrder = createAsyncThunk<void, IOrderCart>(
    'orders/createOrder',
    async (orderCart) => {
        await axiosAPI.post('order.json', orderCart);
    }
)


export const deleteOrder = createAsyncThunk<void, string>(
    'orders/createOrder',
    async (orderID) => {
        await axiosAPI.delete(`order/${orderID}.json`);
    }
)

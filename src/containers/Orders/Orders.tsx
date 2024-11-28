import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {deleteOrder, getAllOrders} from "../../store/thunks/dishes/ordersThunks.ts";
import {getAllDishes} from "../../store/thunks/dishes/dishesThunks.ts";
import {selectAllOrders} from "../../store/slices/orderSlice.ts";
import {useCallback, useEffect} from "react";

const Orders = () => {
    const dispatch = useAppDispatch();
    const allOrders = useAppSelector(selectAllOrders);

    const fetchData = useCallback(async () => {
        await dispatch(getAllDishes());
        await dispatch(getAllOrders());
    }, [dispatch])

    useEffect(() => {
        void fetchData();
    }, [fetchData]);

    console.log(allOrders);

    const deleteOrderById = async (orderId: string) => {
        if (orderId) {
            await dispatch(deleteOrder(orderId));
            void fetchData();
        }
    };


    return (
        <div>
            {allOrders.length > 0 ? <>
                {allOrders.map(order => (
                    <div key={order.order_id} className="card p-3 mb-4">
                        {order.order.map(oneDish => (
                            <div key={oneDish.amount}>
                                {oneDish.dish.title} x{oneDish.amount} / {+oneDish.amount * +oneDish.dish.price} SOM
                            </div>
                        ))}

                        <p><b>Delivery: </b> 150</p>
                        <p><b>Total: </b> {order.total + 150} SOM</p>

                        <button onClick={() => deleteOrderById(order.order_id)} className="btn btn-danger">Complete order</button>
                    </div>
                ))}
            </> : <p>No orders</p>}
        </div>
    );
};

export default Orders;
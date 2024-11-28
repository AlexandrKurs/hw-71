import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect, useState} from "react";
import {getAllDishes} from "../../store/thunks/dishes/dishesThunks.ts";
import {selectAllDishes, selectIsFetchingLoading} from "../../store/slices/dishesSlice.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import Modal from "../../components/UI/Modal/Modal.tsx";
import {
    addDishToCart, clearCart,
    deleteDishFromCart,
    selectIsMakeOrderLoading,
    selectOrderCart
} from "../../store/slices/orderSlice.ts";
import {createOrder} from "../../store/thunks/dishes/ordersThunks.ts";
import {NavLink} from "react-router-dom";


const Home = () => {
    const dispatch = useAppDispatch();
    const allDishesInObject = useAppSelector(selectAllDishes);
    const isMakeOrderLoading = useAppSelector(selectIsMakeOrderLoading);
    const isLoading = useAppSelector(selectIsFetchingLoading);
    const orderCart = useAppSelector(selectOrderCart);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        dispatch(getAllDishes());
    }, [dispatch]);


    const getArrayOfDishes = (allDishesInObject: IDishAPI): IDishes[] => {
        console.log(Object.keys(allDishesInObject));

        return Object.keys(allDishesInObject).map(dishId => {
            return {
                ...allDishesInObject[dishId],
                id: dishId,
            }
        });
    };

    const total = !allDishesInObject ? 0 : Object.keys(allDishesInObject).reduce((acc, dishId) => {
        const dish = allDishesInObject[dishId];
        const dishCountFromCart = orderCart[dishId];

        if (dishCountFromCart) {
            acc += Number(dish.price) * dishCountFromCart;
        }
        return acc;
    }, 0);

    const submitOrder = async () => {
        await dispatch(createOrder(orderCart));
        await dispatch(clearCart());
        setModal(false);
        dispatch(getAllDishes());
    };


    console.log(allDishesInObject);
    return (
        <div className="container">
            {isLoading ? <Spinner/> :
                <div>

                    <div className="card p-4 bg-primary-subtle">
                        <div className="row justify-content-between row-cols-2 align-items-center">
                            <div>
                                <p className="fs-4"><strong>Total order:</strong> {total} som</p>
                            </div>
                            <button onClick={() => setModal(true)} className="w-25 btn btn-primary">Order</button>
                        </div>

                        <Modal show={modal} closeModal={() => setModal(false)}>
                            {isMakeOrderLoading ? <Spinner/> :
                                <>
                                    {allDishesInObject ? Object.keys(allDishesInObject).map(dishID => {
                                        const dish = {...allDishesInObject[dishID], id: dishID};

                                        if (orderCart[dishID]) {
                                            return (<div key={dish.id}>{dish.title} x{orderCart[dishID]}
                                                <button className="btn btn-danger" onClick={() => dispatch(deleteDishFromCart(dish))}>X</button></div>);
                                        }
                                    }) : null}

                                    <div>
                                        <p>  Delivery: 150</p>
                                        <p>Total: {total + 150} SOM</p>
                                    </div>
                                    <button onClick={submitOrder} className="btn btn-primary">Order</button>
                                </>

                            }
                        </Modal>

                    </div>


                    <hr/>

                    {allDishesInObject === null ? <p>No dishes yet</p> :
                        <>
                            {getArrayOfDishes(allDishesInObject).map(dish => (
                                <div onClick={() => dispatch(addDishToCart(dish))} key={dish.id} className="w-50 mx-auto card p-3 mb-4">
                                    <div className="row row-cols-5 justify-content-between align-items-center">
                                        <div>
                                            <img width="100" src={dish.image} alt={dish.title}/>
                                        </div>
                                        <div>
                                            <h6>{dish.title}</h6>
                                        </div>
                                        <div>
                                            {dish.price} som
                                        </div>
                                        <div>
                                            <NavLink className="btn btn-success"
                                                     to={'/edit-dish/' + dish.id}>Edit</NavLink>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    }

                </div>

            }
        </div>
    );
};

export default Home;
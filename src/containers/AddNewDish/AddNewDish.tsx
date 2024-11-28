import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {addNewDish} from "../../store/thunks/dishes/dishesThunks.ts";
import {selectIsFetchingLoading} from "../../store/slices/dishesSlice.ts";
import {useNavigate} from "react-router-dom";
import DishForm from "../../components/Dishform/DishForm.tsx";


const AddNewDish = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(selectIsFetchingLoading);
    const navigate = useNavigate();

    const onSubmitForm = async (dish: IDish) => {
        await dispatch(addNewDish(dish));
        navigate('/');
    };

    return (
        <>
            <DishForm submitForm={onSubmitForm}  isLoading={isLoading}/>
        </>
    );
};

export default AddNewDish;
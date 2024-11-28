import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectIsFetchingLoading, selectOneDish} from "../../store/slices/dishesSlice.ts";
import DishForm from "../../components/Dishform/DishForm.tsx";

const EditDish = () => {
    const isLoading = useAppSelector(selectIsFetchingLoading);
    const dispatch = useAppDispatch();
    const dish = useAppSelector(selectOneDish);



    const onSubmitForm = async (dish: IDish) => {

        console.log(dish);
    };


    return dish && (
        <>
            <DishForm submitForm={onSubmitForm} isLoading={isLoading} dish={dish}/>
        </>
    );
};

export default EditDish;
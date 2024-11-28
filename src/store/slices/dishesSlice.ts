import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addNewDish, getAllDishes, getDishById} from "../thunks/dishes/dishesThunks.ts";
import {RootState} from "../../app/store.ts";

interface DishesState {
    dishes: IDishAPI | null;
    oneDish: IDish | null;
    isFetching: boolean;
}

const initialState: DishesState = {
    dishes: null,
    oneDish:  null,
    isFetching: false
};

export const selectAllDishes = (state: RootState) => state.dishes.dishes;
export const selectOneDish = (state: RootState) => state.dishes.oneDish;
export const selectIsFetchingLoading = (state: RootState) => state.dishes.isFetching;


export const DishesSlice = createSlice({
    name: 'dishes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllDishes.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(getAllDishes.fulfilled, (state,  action: PayloadAction<IDishAPI | null>) => {
                state.isFetching = false;
                state.dishes = action.payload;
            })
            .addCase(getAllDishes.rejected, (state) => {
                state.isFetching = true;
            })
            .addCase(getDishById.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(getDishById.fulfilled, (state,  action: PayloadAction<IDish | null>) => {
                state.isFetching = false;
                state.oneDish = action.payload;
            })
            .addCase(getDishById.rejected, (state) => {
                state.isFetching = true;
            })
            .addCase(addNewDish.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(addNewDish.fulfilled, (state) => {
                state.isFetching = false;
            })
            .addCase(addNewDish.rejected, (state) => {
                state.isFetching = true;
            })
    }

});


export const dishesReducer = DishesSlice.reducer;
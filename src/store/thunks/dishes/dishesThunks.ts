import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../../axiosAPI.ts";


export const getAllDishes = createAsyncThunk<IDishAPI | null, void>(
    'dishes/getAllDishes',
    async () => {
        const res = await axiosAPI<IDishAPI>('meals.json');

        return res.data || null;
    }
)

export const addNewDish = createAsyncThunk<void, IDish>(
    'dishes/addNewDish',
    async (dishToAdd) => {
        await axiosAPI.post('meals.json', dishToAdd);
    }
)

export const getDishById = createAsyncThunk<IDish | null, string>(
    'dishes/getDishById',
    async (dishId) => {
        const res = await axiosAPI<IDish>(`meals/${dishId}.json`);
        return res.data || null;
    }
)
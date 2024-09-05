import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Home } from "../../services/types";

interface HomeState {
    editingHomeId: number | null;
    home: Home | null;
}

const initialState: HomeState = {
    editingHomeId: null,
    home: null,
}

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        updateEditingHomeId: (state, action: PayloadAction<number>) => {
            state.editingHomeId = action.payload;
        },
        resetEditingHomeId: (state) => {
            state.editingHomeId = null;
        },
        updateHome: (state, action: PayloadAction<Home>) => {
            state.home = action.payload;
        },
        resetHome: (state) => {
            state.home = null;
        }
    }
})

export const { updateEditingHomeId, resetEditingHomeId, updateHome, resetHome } = homeSlice.actions;

export default homeSlice.reducer;
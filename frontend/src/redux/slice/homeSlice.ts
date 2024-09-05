import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HomeState {
    editingHomeId: number | null
}

const initialState: HomeState = {
    editingHomeId: null
}

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        updateEditingHomeId: (state, action: PayloadAction<number>) => {
            state.editingHomeId = action.payload;
        },
        resetEditingHomeId: (state) =>{
            state.editingHomeId = null;
        }
    }
})

export const {updateEditingHomeId, resetEditingHomeId} = homeSlice.actions;

export default homeSlice.reducer;
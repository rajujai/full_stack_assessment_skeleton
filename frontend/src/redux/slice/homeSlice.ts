import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HomeState {
    homeEditMode: boolean
}

const initialState: HomeState = {
    homeEditMode: false
}

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        updateHomeEditMode: (state, action: PayloadAction<boolean>) => {
            state.homeEditMode = action.payload;
        }
    }
})

export const {updateHomeEditMode} = homeSlice.actions;

export default homeSlice.reducer;
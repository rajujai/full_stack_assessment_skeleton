import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { api } from "../services/api";
import homeSlice from "./slice/homeSlice";
import userSlice from "./slice/userSlice";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        user: userSlice,
        home: homeSlice
    },
    middleware: (middleWare) => middleWare().concat(api.middleware)
});


export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
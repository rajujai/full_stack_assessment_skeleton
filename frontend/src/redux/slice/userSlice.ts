import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../services/api';
import { User } from "../../services/types";


interface UserState {
  users: User[],
  selectedUser: User | null,
}

const initialState: UserState = {
  users: [],
  selectedUser: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    doSelectUser: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.getAllUsers.matchFulfilled, (state, action) => {
      state.users.push(...action.payload);
    })
  }
})

export const { doSelectUser } = userSlice.actions;

export default userSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

type User = any;

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
      window.localStorage.removeItem("userAuth");
      toast.error("User logged out.");
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;

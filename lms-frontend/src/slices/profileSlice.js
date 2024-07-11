import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: null,
  loading: false,
//chat-app
  otherUsers: null,
  selectedUser: null,
  onlineUsers: null,
}

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setUser(state, value) {
      state.user = value.payload
    },
    setLoading(state, value) {
      state.loading = value.payload
    },

    //chat-app

    setOtherUsers: (state, value) => {
      state.otherUsers = value.payload;
    },
    setSelectedUser: (state, value) => {
      state.selectedUser = value.payload;
    },
    setOnlineUsers: (state, value) => {
      state.onlineUsers = value.payload;
    },


  },
})

export const { setUser, setLoading,
  //chat-app
  setOtherUsers, setSelectedUser, setOnlineUsers
 } = profileSlice.actions

export default profileSlice.reducer

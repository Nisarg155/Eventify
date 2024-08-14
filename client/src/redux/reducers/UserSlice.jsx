import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: null
}


export const userSlice = createSlice(
    {
        name:'UserDetails',
        initialState,


        reducers:{

            AddUser: (state,action) => {
                state.user = action.payload;
            },

            RemoveUser : (state,action) => {
                state.user = action.payload;
            },
            UpdateUser: (state, action) => {
                state.user = action.payload;
            }
        }
    }
)

export const {AddUser , RemoveUser,UpdateUser} = userSlice.actions

export default userSlice.reducer
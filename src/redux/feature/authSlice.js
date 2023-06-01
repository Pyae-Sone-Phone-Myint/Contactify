import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';

const initialState = {
    user : null,
    token : null
}

export const authSlice = createSlice({
    name : "authSlice",
    initialState,

    reducers:{
        addUser : (state, {payload})=>{
            (state.user = payload.user),
            (state.token = payload.token),
            Cookies.set("user",JSON.stringify(state.user)),
            Cookies.set("token",state.token)
        }
    }
})

export const { addUser} = authSlice.actions;
export default authSlice.reducer;
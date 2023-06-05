import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';

const initialState = {
    user : null,
    token : null
}

const CookieUser=Cookies.get('user');
const CookieToken=Cookies.get('token');

if (CookieToken&& CookieUser) {
    const user=JSON.parse(CookieUser);
    initialState.user=user;
    initialState.token=CookieToken;
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
        },
        removeUser : (state)=>{
            (state.user = null),
            (state.token =null),
            Cookies.remove("user"),
            Cookies.remove("token")
        }
    }
})

export const { addUser , removeUser} = authSlice.actions;
export default authSlice.reducer;
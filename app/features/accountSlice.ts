import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@reduxjs/toolkit/query";

type InitialState = {
    username:string,
    email:string,
    password:string,
    confirmPassword:string
}
const initialState :InitialState= {
    username: "",
    email: "",
    password: "",
    confirmPassword:""
}

export const accountSlice = createSlice({
    name:"accounts",
    initialState,
    reducers:{
        setUsername: (state, action:PayloadAction<string>)=> {
            state.username = action.payload;
        },
        setEmail: (state, action:PayloadAction<string>)=>{
            state.email = action.payload;
        },
        setPassword: (state, action:PayloadAction<string>)=>{
            state.password = action.payload
        },
        setConfirmPassword: (state,action:PayloadAction<string>)=>{
            state.confirmPassword = action.payload
        }
    }
})

export const  { setUsername,setEmail,setConfirmPassword,setPassword } = accountSlice.actions
export default accountSlice.reducer
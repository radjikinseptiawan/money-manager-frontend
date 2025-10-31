import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    code : string
}

const initialState : InitialState= {
    code: ''
}

export const OtpSlice = createSlice({
    name:"code",
    initialState,
    reducers:{
        setOtp(state, action: PayloadAction<string>){
            state.code = action.payload
        }
    }
})

export const { setOtp } = OtpSlice.actions
export default OtpSlice.reducer
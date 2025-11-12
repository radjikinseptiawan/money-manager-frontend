import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type InitialState = {
    nominalTransaction : string,
    dateTransaction:string,
    nominalType:string,
    detailTransaction:string
}

const today = new Date()
const formattedDate = today.toISOString().split("T")[0]

const initialState : InitialState= {
    nominalTransaction : "",
    dateTransaction: formattedDate,
    nominalType: "",
    detailTransaction:""
}

export const transactionSlice = createSlice({
    name:"transaction",
    initialState,
    reducers:{
        setNominalTransaction: (state, action:PayloadAction<string>)=>{
            state.nominalTransaction = action.payload
        },
        setDateTransaction:(state, action: PayloadAction<string>)=>{
            state.dateTransaction = action.payload
        },
        setNominalType: (state, action:PayloadAction<string>)=>{
            state.nominalType = action.payload
        },
        setDetailTransaction:(state, action:PayloadAction<string>)=>{
            state.detailTransaction = action.payload
        }
    }
})

export const {setNominalTransaction, setDateTransaction, setNominalType, setDetailTransaction} = transactionSlice.actions
export default transactionSlice.reducer
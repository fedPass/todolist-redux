import { createSlice } from "@reduxjs/toolkit";
import { getLists } from "./thunksList";

export const listsSlice = createSlice({
    name:'lists',
    initialState:[],
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(getLists.pending, (state,action) => {
            console.log('pending state');
        })
        .addCase(getLists.fulfilled, (state, action) => {
            console.log('getLists.fulfilled');
            // setta lo state come quello ricevuto dal payload
            state = action.payload;
            return state;
          })
    }
})

export default listsSlice.reducer;
export {getLists}
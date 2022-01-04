import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice(
    {
        name:'filter',
        initialState:'',
        reducers: {
            filterTodo(state, action) {
                //riceve lo state vecchio da state e ritorno quello nuovo da action.payload
                return action.payload;
            }
        }
    }
);

export const {filterTodo} = filterSlice.actions;
export default filterSlice.reducer;
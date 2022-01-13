import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchList } from "../../service/listService";

export const getLists = createAsyncThunk(
    'lists/getLists',
    async (data = null, thnkAPI) => {
        const lists = await fetchList();
        console.log(lists);
        return lists;
    }
)
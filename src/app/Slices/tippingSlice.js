import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: false
};

const tippingSlice = createSlice({
    name: 'tipping',
    initialState,
    reducers: {
        toggle : (state) => {
            state.value = !state.value
        }
    }
})

export const { toggle } = tippingSlice.actions;

export const selectTippingBool = (state) => state.tipping.value;

export default tippingSlice.reducer;
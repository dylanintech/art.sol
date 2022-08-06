import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: false
};

const postingSlice = createSlice({
    name: 'posting',
    initialState,
    reducers: {
        toggle: (state) => {
            state.value = !state.value;
        }
    }
});

export const { toggle } = postingSlice.actions;

export const selectPostingBool = (state) => state.posting.value;

export default postingSlice.reducer;


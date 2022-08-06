import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { connectWallet } from '../../Solana/Solana';

const initalState = {
    value: '',
}


export const walletAddressSlice = createSlice({
    name: 'address',
    initalState,
    reducers: {
        
    }

});

export const selectWalletAddress = (state) => state.address.value;
export default walletAddressSlice.reducer;
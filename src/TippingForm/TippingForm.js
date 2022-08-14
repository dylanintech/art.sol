import React, { useState } from 'react';
import { sendSol } from "../Solana/Solana";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from '../app/Slices/tippingSlice';
import { selectWalletAddress } from '../app/Slices/receiverAddressSlice';


const TipForm = () => {
  const dispatch = useDispatch();
  const receiver = useSelector(selectWalletAddress);

  const [ tipAmount, setTipAmount ] = useState(0);
  const onTipAmountChange = (event) => {
    const { value } = event.target;
    setTipAmount(value);
  }

  return (
    <div className="dark:text-white dark:bg-black text-center">
    <h1 className="py-6 mb-3 font-bold text-2xl ">How much SOL do you want to tip?</h1>
    <form onSubmit={(event) => {
      event.preventDefault()
      sendSol(receiver, tipAmount);
      dispatch(toggle());
    }}
    >
      <input 
       type="number"
       value={tipAmount}
       onChange={onTipAmountChange}
       placeholder="ex: 0.7"
       name="tipAmount"
       id="tipAmount"
       min="0.0001"
       step="any"
       className="py-2 p-2 my-5 w-1/3 rounded-md text-black"
       required
      />
      <br />
      <button type="submit" className=" border-black border-2 rounded-lg w-1/3 bg-gradient-to-br from-button-gradient-start via-button-gradient-end to-black bg-gradient-to-r hover:bg-gradient-to-tl p-3 my-3">Tip SOL 💸</button>
    </form>
    <br />
    <button onClick={(event) => {
      event.preventDefault()
      dispatch(toggle());
    }}>
      <img src="https://media.giphy.com/media/KB8C86UMgLDThpt4WT/giphy.gif" alt="Thank you GIF" className="py-6 mb-2"/>
      <p className="py-2">Nevermind</p>
    </button>
  </div>
  )
}

export default TipForm;
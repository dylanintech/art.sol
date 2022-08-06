import React, { useState, useEffect } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FiStar } from 'react-icons/fi';
import { BsGithub, BsTwitter } from 'react-icons/bs';
import { FaDiscord } from "react-icons/fa";
import { shortenAddress } from '../util';
import { useSelector, useDispatch } from 'react-redux';
import { toggle, selectPostingBool } from '../app/Slices/postingSlice';

const Header = () => {
  const [ walletAddress, setWalletAddress ] = useState(null);
  const selectIsPosting = useSelector(selectPostingBool);
  const dispatch = useDispatch();

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString())
      setWalletAddress(response.publicKey.toString()); 
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log("Phantom Wallet found!");
          //The solana object provides a function that allows us to connect directly with the user's wallet
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            'Connected with Public Key:',
            response.publicKey.toString()
          );
          //Setting the user's publicKey in the state for use later
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert("Solana object not found! Get the Phantom Wallet: https://phantom.app/")
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
   <> 
    <div className="bg-white dark:bg-black text-black dark:text-white flex justify-center items-center h-40"> 
      <div className="flex w-1/6">
         <CgProfile className="text-4xl"/>
         <FiStar className="text-4xl"/>
      </div>

      <h1 className="font-bold text-8xl mx-4 pl-28">art.sol</h1>
      {walletAddress ?  
      <div className="border-white border-2 w-1/6 max-h-20 rounded-lg shadow-lg text-center ml-6 p-2">
          <h3>Connected ✅</h3>
          <p>{shortenAddress(walletAddress)}</p>
      </div> 
        :
      <div className="border-white border-2 w-1/6 max-h-20 rounded-lg shadow-lg text-center ml-6 p-2">
        <h3>Not Connected</h3>
      </div>
        }
      <div className="flex justify-between w-1/8 text-white ml-6">
        <a href="https://twitter.com/art__sol" target="_blank" rel="noreferrer">
          <BsTwitter className='text-4xl'/>
        </a>
        <a href="https://discord.gg/MnJ2f7Xt" target="_blank" rel="noreferrer">
          <FaDiscord className='text-4xl'/>
        </a>
      </div>
    </div>
    {!walletAddress ? 
    <div className="text-center dark:bg-black  bg-white text-black  dark:text-white">
      <button 
      className="border-white border-2 rounded-lg w-1/3 p-2 my-6 shadow-2xl hover:text-black hover:bg-white"
      onClick={(event) => {
        event.preventDefault();
        connectWallet();
      }}
      >
        Connect Wallet to Post, Tip, and be Tipped
      </button>
    </div>
    :
    <div className="text-center dark:bg-black  bg-white text-black  dark:text-white">
      <button 
      className="border-white border-2 rounded-lg w-1/3 p-2 my-6 shadow-2xl hover:text-black hover:bg-white"
      onClick={(event) => {
        event.preventDefault();
        dispatch(toggle());
        console.log(selectIsPosting);
        
      }}
      >
        Post My Art!
      </button>
    </div>
     } 
  </>
  )
}

export default Header;
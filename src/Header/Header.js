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
      <div className="w-1/6 sm:mr-2 ml-1 ">
         <button onClick={(event) => {
           event.preventDefault();
           window.alert("Profiles Coming Soon!")
         }}>
           <CgProfile className="text-4xl"/>
         </button>
      </div>
      
      {/* wrap header and connected button in a div so that they're stacked */}
      <div className="sm:mr-4 md:mr-8">
        <h1 className="mt-3 ml-2 sm:mr-2 md:text-8xl md:mr-10 lg:mr-28 lg:mt-8 font-bold text-7xl pt-4 pb-2  bg-clip-text text-transparent bg-gradient-to-tr from-fuchsia-500 to-yellow-500">art.sol</h1>
        {walletAddress ?
            <>
            <h3 className="text-center ml-5 md:mr-10 lg:mr-32  ">Connected ✅</h3>
            <p className="text-center pb-1 ml-5 md:mr-10 lg:mr-32 lg:pb-4">{shortenAddress(walletAddress)}</p>
            </>
        
          :
          <h3 className="text-center ml-5 md:mr-10 lg:mr-32">Not Connected ❌</h3>
          }
      </div>
      <div className="flex justify-between w-1/8 text-white ml-6 sm:ml-4 pb-1">
        <a href="https://twitter.com/art__sol" target="_blank" rel="noreferrer">
          <BsTwitter className='text-4xl display:none'/>
        </a>
        <a href="https://discord.gg/MnJ2f7Xt" target="_blank" rel="noreferrer">
          <FaDiscord className='text-4xl'/>
        </a>
      </div>
    </div>
    {!walletAddress ? 
    <div className="text-center dark:bg-black  bg-white text-black  dark:text-white">
      <button 
      className="md:w-1/3 border-white border-2 rounded-xl w-1/2 p-1 shadow-2xl hover:text-black hover:bg-white text-black bg-white lg:text-white lg:bg-black lg:rounded-md lg:p-2 lg:my-4"
      onClick={(event) => {
        event.preventDefault();
        connectWallet();
      }}
      >
        Connect phantom wallet to post & tip 😁
      </button>
    </div>
    :
    <div className="text-center dark:bg-black  bg-white text-black  dark:text-white">
      <button 
      className="md:w-1/3 border-white border-2 rounded-xl w-1/2 p-1 mt-1 shadow-2xl hover:text-black hover:bg-white text-black bg-white lg:text-white lg:bg-black lg:rounded-md lg:p-2 lg:my-8"
      onClick={(event) => {
        event.preventDefault();
        dispatch(toggle());
        console.log(selectIsPosting);
        
      }}
      >
        Post My Art 🎨
      </button>
    </div>
     } 
  </>
  )
}

export default Header;
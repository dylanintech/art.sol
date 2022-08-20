import React from 'react';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Program, web3 } from '@project-serum/anchor';
import kp from '../keypair.json';
import idl from '../idl.json';
import { shortenAddress } from '../util';
const anchor = require('@project-serum/anchor');


const { SystemProgram } = web3;

const arr = Object.values(kp._keypair.secretKey);
const secret = new Uint8Array(arr);
const baseAccount = web3.Keypair.fromSecretKey(secret);

export const programID = new PublicKey(idl.metadata.address);

export const network = clusterApiUrl('mainnet-beta'); 

export const opts = {
    preflightCommitment: "processed",
}

export const checkIfWalletIsConnected = async () => {
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
          return response.publicKey.toString(); //Update Redux store
        }
      } else {
        alert("Solana object not found! Get the Phantom Wallet: https://phantom.app/")
      }
    } catch (error) {
      console.error(error);
    }
};

export const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString())
      return response.publicKey.toString(); //update Redux Store
    }
}

export const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new anchor.AnchorProvider(
      connection, window.solana, opts.preflightCommitment,
    );
    return provider;
}

//Call submitPost() function

export const submitPost = async (title, description, artwork, cta) => {
    try {
       const provider = getProvider();
       const program = new Program(idl, programID, provider);

       const post = anchor.web3.Keypair.generate();

       await program.methods
       .submitPost(title, description, artwork, cta)
       .accounts({
         post: post.publicKey,
         creator: provider.wallet.publicKey,
         systemProgram: anchor.web3.SystemProgram.programId,
       })
       .signers([post])
       .rpc();

       console.log('Successfully submitted post!')
    } catch (error) {
        console.error(error);
    }
}

export const fetchPosts = async () => {
    const provider = getProvider();
    const program = new Program(idl, programID, provider);

    const postAccounts = await program.account.post.all();
    return postAccounts;
}

export const sendSol = async (receiverAddress, tipAmount) => {
  try {
    const provider = getProvider();
    const program = new Program(idl, programID, provider);
    const lamportAmount = tipAmount * 1e9;
    const amount = new anchor.BN(lamportAmount);

    await program.methods
    .sendSol(amount)
    .accounts({
      from: provider.wallet.publicKey,
      to: receiverAddress,
      systemProgram: SystemProgram.programId,
    })
    .rpc();
    window.alert("Successfully sent SOL💸!");
  } catch (error) {
    window.alert("Failed to send SOL!");
  }
}
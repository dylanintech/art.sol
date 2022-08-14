import React, { useState, useEffect } from 'react';
import Header from './Header/Header';
import Content from './Content/Content';
import './App.css';
import { useSelector } from 'react-redux';
import { selectPostingBool } from './app/Slices/postingSlice';
import { selectTippingBool } from './app/Slices/tippingSlice';
import PostForm from './PostForm/PostForm';
import TipForm from './TippingForm/TippingForm';
import * as buffer from "buffer";

window.Buffer = buffer.Buffer;

function App() {
  const selectIsPosting = useSelector(selectPostingBool);
  const selectIsTipping = useSelector(selectTippingBool);

  // return (
  //   <div className="">
  //     {selectIsPosting ? 
  //     <PostForm /> :
  //     <>
  //      < Header /> 
  //      < Content />
  //     </>
  //     } 
  //   </div>
  // );

  if (selectIsPosting) {
    return (
      <PostForm />
    )
  } else if (selectIsTipping) {
    return (
      <TipForm />
    )
  } else {
    return (
     <>
       < Header />
       < Content />
     </>
    )
  }

  

}

export default App;

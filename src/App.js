import React, { useState, useEffect } from 'react';
import Header from './Header/Header';
import Content from './Content/Content';
import './App.css';
import { useSelector } from 'react-redux';
import { selectPostingBool } from './app/Slices/postingSlice';
import PostForm from './PostForm/PostForm';
import * as buffer from "buffer";

window.Buffer = buffer.Buffer;

function App() {
  const selectIsPosting = useSelector(selectPostingBool);

  return (
    <div className="">
      {selectIsPosting ? 
      <PostForm /> :
      <>
       < Header /> 
       < Content />
      </>
      } 
    </div>
  );
}

export default App;

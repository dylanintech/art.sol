import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggle } from '../app/Slices/postingSlice';
import { submitPost, getProvider, fetchPosts } from '../Solana/Solana';


const PostForm = () => {
  const dispatch = useDispatch();
  //Individual Post
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [artworkLink, setArtworkLink] = useState('');
  const [ctaLink, setCtaLink] = useState('');
  //All Posts
  const [posts, setPosts] = useState([]);


  return (
      <div className="dark:bg-black dark:text-white text-black bg-white text-center h-screen">
          <h1 className="py-5 mb-3 font-bold text-2xl ">Create Your Beautiful Post</h1>
          <form>
          <p><label for="title" className="mx-2">
            Title
          </label></p>
          <input
            type="text"
            value={title}
            placeholder="Overlooking the sunset"
            name="title"
            id="title"
            onChange={(event) => {
                const {value} = event.target;
                setTitle(value)
            }}
            className="py-2 p-2 my-5 w-1/2 rounded-md text-black"
            required
          />
          <br />
          <p><label for="description" className="mx-2 inline-block align-">
            Brief Description (one or two lines)
          </label></p>
          <textarea
            type="text" 
            value={description}
            placeholder="This artwork is part of a collection that I plan on releasing in the future called EtherealAmbience. I want this collection to foster a community of peaceful, happy people. What do you guys think? "
            rows="3"
            cols="25"
            name="description"
            id="description"
            onChange={(event) => {
                const description = document.getElementById('description');
                const value = description.value;
                setDescription(value);
            }}
            className="py-2 p-2 my-5 w-1/2 rounded-md text-black"
            required
            >
          </textarea>
          <br />
          <p><label for="artwork" className="mx-2">
            Link to Artwork
          </label></p>
          <input
            type="text"
            value={artworkLink}
            placeholder="https://your-artwork   or    https://gatewway.ipfs.io/ipfs/your-artwork"
            name="artwork"
            id="artwork"
            onChange={(event) => {
                const { value } = event.target;
                setArtworkLink(value);
            }}
            className="py-2 p-2 my-5 w-1/2 rounded-md text-black"
            required
          >
          </input>
          <br />
          <p><label for="cta" className="mx-2">
            Link to CTA (optional)
          </label></p>
          <input
            type="text"
            value={ctaLink}
            placeholder="This can be a link to your twitter, MagicEden drop, or anything that will support your work"
            name="cta"
            id="cta"
            onChange={(event) => {
                const { value } = event.target;
                setCtaLink(value);
            }}
            className="py-2 p-2 my-5 w-1/2 rounded-md text-black"
          >
          </input>
          <br />
          <button className="border-black border-2 rounded-lg w-1/3 p-3 my-3 bg-white" type="submit" onClick={(event) => {
              event.preventDefault();
              submitPost(title, description, artworkLink, ctaLink);
              dispatch(toggle());
            //   fetchPosts();
          }}
          
          
          >
              <p className='font-bold bg-clip-text text-transparent bg-gradient-to-tr from-fuchsia-500 to-yellow-500'>Post!</p>
          </button>
        </form>
        <br />
        <button onClick={(event) => {
            event.preventDefault();
            dispatch(toggle());
            fetchPosts();
        }}
        
        >
          <p className="text-white ">Go back</p>
          </button>
      </div>
   )
}

export default PostForm;
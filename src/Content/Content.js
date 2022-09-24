import React, { useState, useEffect } from 'react';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import { FiStar } from 'react-icons/fi';
import { fetchPosts } from '../Solana/Solana';
import { shortenAddress } from '../util';
import { useSelector, useDispatch } from 'react-redux';
import { toggle, selectTippingBool } from '../app/Slices/tippingSlice';
import { selectReceiver } from '../app/Slices/receiverAddressSlice';

const Content = () => {
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();
    const tipping = useSelector(selectTippingBool);

    const getPosts = async () => {
        try {
          const fetchedPosts = await fetchPosts();
          console.log("Got the posts", fetchedPosts);
          setPosts(fetchedPosts);
        } catch (error) {
          console.error('Failed to get posts', error);
        }
    }

    useEffect(() => {
          console.log("Fetching post list...");
          getPosts()
      }, []);

    return (
        <div className="flex flex-col items-center dark:bg-black dark:text-white bg-white text-black ">
            <div className="md:w-1/2 p-1 shadow-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-3xl m-6">
              <a className="block p-6 bg-white sm:p-8 rounded-3xl text-black flex-col" href="">
                     <h1 className="text-2xl mb-3 font-bold text-center">Artwork Title</h1>
                     <h3 className="font-bold lg:text-center">Created by ------</h3>
                     <h1 className="text-9xl my-2 lg:text-center">🖼️</h1>
                     {/* used to be wrapped in a div ^ */}
                     <p className="text-center pt-2 pb-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<span className='font-bold block'> **This is an example post! You can't interact with it.**</span></p>
                     <button className="w-full border-black border-2 bg-black text-white rounded-lg p-2 my-3 shadow-lg shadow-red-500 lg:p-3 ">
                        <p>Tip artist 💸</p>
                     </button>
                     <div className="w-full flex justify-evenly pt-3 pl-2">
                         <div className="flex">
                           <div>  
                              <BiUpvote className="text-xl"/>
                              <BiDownvote className="text-xl"/>
                           </div>
                           <p className="text-gray-600 pt-1 pl-1">3.2k</p>
                         </div>
                         <div className="flex">
                              <FiStar className='text-4xl'/>
                              <p className="text-gray-600 pt-1 pl-1">1.1k</p>
                         </div>
                         <button className='border-black border-2 rounded-lg bg-black text-white w-1/4 p-1'>
                             CTA
                         </button>
                     </div>    
                
              </a>   
            </div>
            {posts.filter(post => post.account.title != "BAYC #197" && post.account.cta != "https://twitter.com/dxlantxch" && post.account.description != "This is a cool sunflower that my sister made when she was like 4.").map((post, index) => (
             <div className=" md:w-1/2 p-1 shadow-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-3xl m-6">
                 <a className="block bg-white sm:p-8 rounded-3xl text-black flex-col p-6" href="">
                        <h1 className="text-2xl mb-3 font-bold text-center">{post.account.title}</h1>
                        <h3 className="font-bold ">Created by {shortenAddress(post.account.creator.toString())}</h3> 
                        {post.account.title != "Earth Mother // Mother Earth - FIRST EVER DEMO" ?
                        <a href={post.account.artwork} target="_blank" rel='noreferrer' className="object-cover" >
                            <img  className="shadow-2xl rounded-lg object-cover " src={post.account.artwork}>
                            </img>
                        </a> :
                        <a href={post.account.artwork} target="_blank" rel='noreferrer' className="m-0" >
                          <img  className=" shadow-2xl rounded-lg m-0 " src='https://i.pinimg.com/564x/ff/86/78/ff867868807b83a768c2fb0f7e4172bd.jpg'>
                          </img>
                        </a>
                      }
                        <p className='my-2 text-center pt-2'>{post.account.description}</p>
                        <button className="w-full border-black border-2 bg-black text-white rounded-lg p-2 my-4 shadow-lg hover:shadow-xl hover:shadow-red-500 shadow-red-500 lg:p-3" 
                        onClick={(event) => {
                            event.preventDefault();
                            dispatch(toggle());
                            console.log(tipping);
                            dispatch(selectReceiver(post.account.creator.toString()));
                        }}
                        >
                           Tip artist 💸
                        </button>
                        <div className="w-full flex justify-evenly pt-3 pl-2 my-4">
                            <div className="flex">
                              <div>  
                                 <BiUpvote className="text-xl" onClick={(event) => {
                                     event.preventDefault();
                                     window.alert("You'll be able to upvote posts soon!");
                                 }}/>
                                 <button onClick={(event) => {
                                     event.preventDefault();
                                     window.alert("You'll be able to downvote posts soon!")
                                 }}>
                                     <BiDownvote className="text-xl"/>
                                 </button>
                              </div>
                              <p className="text-gray-600 pt-1 pl-1">{post.account.points.toString()}</p>
                            </div>
                            <div className="flex">
                                 <FiStar className='text-4xl' onClick={(event) => {
                                     event.preventDefault();
                                     window.alert("You'll be able to favorite posts soon!");
                                 }}/>
                                 <p className="text-gray-600 pt-1 pl-1">{post.account.stars.toString()}</p>
                            </div>
                            {post.account.cta ? 
                            <button className='border-black border-2 rounded-lg bg-black text-white w-1/4 p-1 hover:shadow-2xl hover:bg-gray-700 hover:border-gray-700'>
                                <a href={post.account.cta} target='_blank' rel="noreferrer">
                                    <span className="underline underline-offset-2">More?</span>
                                </a>
                            </button> :
                            <>

                            </>
                            }
                        </div>     
                 </a>   
               </div>
            ))}

        </div>
    )
}

export default Content;
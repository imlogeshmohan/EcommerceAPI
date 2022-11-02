import { useEffect } from 'react'
import { useState } from 'react'
import {like,dislike} from "../Assets/PostLeftSideBar"

function Likes({post,width=48}) {
  const [liked,setliked]=useState(false)
  const [firstliked,setFirstliked]=useState(false)
  const [postLikes,setPostLikes]=useState(post.likes)
    function PostLiked(){
        setFirstliked(true)
        setliked(!liked)
        if(!liked){
          setPostLikes(postLikes+1)
        }
        else{
          setPostLikes(postLikes-1)
        }
      }
    useEffect(()=>{
      const data= window.localStorage.getItem(`JASQU_LIKED_${post.id}`)
      if (data !== null ){
        setliked(JSON.parse(data))
      }

    },[])

    useEffect(()=>{
      if(firstliked){
        window.localStorage.setItem(`JASQU_LIKED_${post.id}`,JSON.stringify(liked))
      }
    },[liked])
    // console.log("liked Render")
  return (
    <div className=''>
        <button 
        className=''
        onClick={PostLiked}>
        <svg width={width} height={width}>{liked?like:dislike}</svg>
        </button>
    </div>
  )
}

export default Likes
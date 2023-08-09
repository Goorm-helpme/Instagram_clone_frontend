import React, { useState } from 'react';
import "./Timeline.css";
import Sugesstions from './Sugesstions';
import Post from './posts/Post';


function Timeline() {
  const [posts, setPosts] = useState([
    {
      user: "kanginleeoficial",
      poseImage: "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202307/06/f6172498-7909-4050-b835-ef2822ecc26e.jpg",
      likes: 12,
      timestamp: "8h"
    },
    {
      user: "yalruu",
      poseImage: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
      likes: 12,
      timestamp: "8h"
    },
    {
      user: "hello_",
      poseImage: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80",
      likes: 55,
      timestamp: "2d"
    },
    {
      user: "itsme",
      poseImage: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
      likes: 29,
      timestamp: "12d"
    },
    
  ]);


  return <div className="timeline">
    <div className="timeline__left">
      <div className="timeline__posts">
        {posts.map((post) => (
          <Post 
            user={post.user} 
            postImage={post.poseImage} 
            likes={post.likes} 
            timestamp={post.timestamp} 
          />
        ))}
      </div>
    </div>
    <div className="timeline__right">
      <Sugesstions />
    </div>
  </div>
  
}

export default Timeline;
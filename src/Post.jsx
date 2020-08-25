import React from 'react'
import './Post.css'
import Avatar from "@material-ui/core/Avatar"

 export default function Post({username, caption, imageUrl}) {
  return (
    <div className="post">
     {/* header -> avatar+username */}
    <div className="post__header">
      <Avatar 
      className="post__avatar"
      alt="Shirshakkandel"
      src="/static/images/avatar/1.jpg"
      />

      <h3>{username}</h3>
    </div>
      {/* Image*/}
      <img  className="post__image" src={imageUrl}  alt="Post Image" />
      {/* username+caption */}
      <h4 style={{fontWeight: "normal"}}><strong>{username}</strong>:{caption}</h4>
    </div>
  )
}



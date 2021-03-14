import React from 'react'
import "./post.css"
import Avatar from '@material-ui/core/Avatar'
function Post( { imageUrl, UserName, caption} ) {
    return (
        <div className = "post">
            <div className = "post_header">
                <Avatar
                    className = " post_avatar"
                    alt = {UserName}
                    src = {imageUrl}
                />
                <h3> {UserName} </h3>
            </div>
            <img className = "post_image" src = {imageUrl} alt="flight attendant user icons png @transparentpng.com" />
            <h4 className = "post_text"> <strong> {UserName} </strong>: {caption}</h4>
            
        </div>
    )
}

export default Post;

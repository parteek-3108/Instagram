import React, { useEffect, useState } from "react";
import { storage, db } from "./firebase";
import "./post.css";
import Avatar from "@material-ui/core/Avatar";
import { Button } from "@material-ui/core";
import firebase from "firebase";

function Post({ postId, imageUrl, UserName, caption, user }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  useEffect(() => {
    let unsuscribe;
    if (postId) {
      unsuscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsuscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setComment("");
  };

  return (
    <div className="post">
      <div className="post_header">
        <Avatar className=" post_avatar" alt={UserName} src={imageUrl} />
        <h3> {UserName} </h3>
      </div>
      <img
        className="post_image"
        src={imageUrl}
        alt="flight attendant user icons png @transparentpng.com"
      />
      <h4 className="post_text">
        {" "}
        <strong> {UserName} </strong>: {caption}
      </h4>

      <div class="post_comments">
        {comments.map((comment) => {
          return (
            <p>
              <b>{comment.username}</b>
              {comment.text}
            </p>
          );
        })}
      </div>

      {user && (
        <form className="post_commentbox">
          <input
            className="post_input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <button
            disabled={!comment}
            className="post_button"
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;

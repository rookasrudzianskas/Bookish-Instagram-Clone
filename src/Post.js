import React, {useEffect, useState} from "react";
import './Post.css';
import Avatar from "@material-ui/core/Avatar"
import { db } from "./firebase";
import firebase from 'firebase';
const Post = ({ postId, username, user, caption, imageUrl}) => {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');


    useEffect(() => {
        let unsubscribe;
        if(postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
                }));
        }
        return () => {
            unsubscribe();
        };
    }, [postId]);

    // the function to submit the specific comment to the database

    const postComment = (event) => {
        event.preventDefault();

        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');

    }

    // end of the comment function

    return (
        <div className="post">
            <div className="post__header">
                <Avatar className="post__avatar" alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <h3>{username}</h3>
            </div>

            <img className="post__image" src={imageUrl} alt=""/>

            <h4 className="post__text"><strong>{username } </strong> { caption}</h4>

            {/* listed comments */}

            <div className="post__comments">
                {comments.map((comment) => (
                    <p>
                        <strong>{comment.username}</strong> {comment.text}
                    </p>
                ))}
            </div>


            {/* end of lsited comments */}

            {/* comments    */}

            <form action="" className="post__commentBox">
                <input type="text" className="post__input" placeholder="enter the comment..." value={comment} onChange={(e) => setComment(e.target.value)}/>
                <button className="post__button" disabled={!comment} type="submit" onClick={postComment}>Post</button>
            </form>


        </div>
    )
}

export default Post;
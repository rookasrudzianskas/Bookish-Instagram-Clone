import React from "react";
import './Post.css';
import Avatar from "@material-ui/core/Avatar"

const Post = () => {
    return (
        <div className="post">
            <div className="post__header">
                <Avatar className="post__avatar" alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <h3>Username</h3>
            </div>


            <img className="post__image" src="https://later.com/blog/wp-content/uploads/2020/11/FacebookImageSize-Infographic-SizeRatio.png" alt=""/>




            <h4 className="post__text"><strong>ByRookas</strong> Wow the day 3!</h4>


        </div>
    )
}

export default Post;
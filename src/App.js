import './App.css';
import Post from "./Post";
import {useEffect, useState} from "react";
import {db} from "./firebase";

function App() {

    const [post, setPosts] = useState([]);

    // Runs a piece of code, based on a specific condition

    useEffect(() => {
        // this is where the code runs
        db.collection('posts').onSnapshot(snapshot => {
            // every time posts changes, this code fires
            setPosts(snapshot.docs.map(doc => doc.data()));
        })

    }, []);

    return (
    <div className="app">
        <div className="app__header">
            <img className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt=""/>
        </div>
        <h1>Hello, world! 🚀</h1>
        {
            post.map(post => (
                <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
            ))
        }

    {/*     Post    */}
    {/*     Post    */}
    </div>
  );
}

export default App;

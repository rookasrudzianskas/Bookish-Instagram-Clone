import './App.css';
import Post from "./Post";
import {useEffect, useState} from "react";
import {db} from "./firebase";
import {makeStyles} from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import React from "react";
import {Button, Input} from "@material-ui/core";

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function App() {
    const [modalStyle] = React.useState(getModalStyle);
    const [post, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');

    // Runs a piece of code, based on a specific condition

    useEffect(() => {
        // this is where the code runs
        db.collection('posts').onSnapshot(snapshot => {
            // every time posts changes, this code fires
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data()})));
        })

    }, []);

    const signUp = (event) => {

    }

    return (
    <div className="app">


        <Modal
            open={open}
            onClose={() => setOpen(false)}>
            <div style={modalStyle} className={classes.paper}>
                <form className="app__signup">

                    <center>
                        <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" className="app__headerImage" alt=""/>
                    </center>

                    <Input placeholder="text" type="username" value={username} onChange={(e) => setEmail(e.target.value)}/>
                    <Input placeholder="text" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <Input placeholder="password" type="password" value={password} onChange={(e) => setEmail(e.target.value)}/>
                    <Button onClick={signUp}>Sign Up</Button>

                </form>

            </div>
        </Modal>


        <div className="app__header">
            <img className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt=""/>
        </div>
        <Button onClick={() => setOpen(true)}>Sign Up</Button>
        <h1>Hello, world! 🚀</h1>
        {
            post.map(({id, post}) => (
                <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
            ))
        }

    {/*     Post    */}
    {/*     Post    */}
    </div>
  );
}

export default App;

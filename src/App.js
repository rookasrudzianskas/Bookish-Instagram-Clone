import './App.css';
import Post from "./Post";
import {useEffect, useState} from "react";
import {db, auth} from "./firebase";
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
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser) {
                // user has logged in
                console.log(authUser);
                setUser(authUser);
            } else {
                // user has logged out
                setUser(null);
            }
        })
        return () => {
            // perform some cleanup actions before again
            unsubscribe();
        }
    }, [user, username]);

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
        event.preventDefault();

        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                return authUser.user.updateProfile({
                    displayName: username
                })
            })
            .catch((error) => alert(error.message));
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

                    <Input placeholder="username" type="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <Input placeholder="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <Button type="submit" onClick={signUp}>Sign Up</Button>

                </form>

            </div>
        </Modal>


        <div className="app__header">
            <img className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt=""/>
        </div>

        {user ? (
            <Button onClick={}></Button>
        )}

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

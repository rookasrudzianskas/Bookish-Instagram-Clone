import './App.css';
import Post from "./Post";
import {useEffect, useState} from "react";
import {db, auth} from "./firebase";
import {makeStyles} from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import React from "react";
import {Button, Input} from "@material-ui/core";
import ImageUpload from "./ImageUpload";
import InstagramEmbed from 'react-instagram-embed';




// ================== Modal Style ==============================================//

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

// ================== End of Modal Style ==============================================//

// ================== Main App ==============================================//

function App() {

    // ================== States ==============================================//

    const [modalStyle] = React.useState(getModalStyle);
    const [post, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [user, setUser] = useState(null);
    const [openSignIn, setOpenSignIn] = useState(false);

    // ================== End of States ==============================================//

    // ================== Use Effect for Auth off ==============================================//

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

    // ================== End of Use Effect for Auth off ==============================================//

    // ================== Get posts from firebase ==============================================//
    // Runs a piece of code, based on a specific condition
    useEffect(() => {
        // this is where the code runs
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            // every time posts changes, this code fires
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data()})));
        })

    }, []);

    // ================== End of Get posts from firebase ==============================================//

    // ================== Sign Up form ==============================================//

    const signUp = (event) => {
        event.preventDefault();

        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                return authUser.user.updateProfile({
                    displayName: username
                })
            })
            .catch((error) => alert(error.message));
        setOpen(false);
    }

    // ================== End of Sign Up form ==============================================//

    // ==================  Sign In form ==============================================//


    const signIn = (event) => {
        event.preventDefault();

        auth.signInWithEmailAndPassword(email, password).catch((error) => alert(error.message))
        setOpenSignIn(false);
    }

    // ==================  End of Sign In form ==============================================//

    return (
    <div className="app">


        {/*// ================== 1st modal ==============================================//*/}

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

        {/*// ================== end of 1st modal ==============================================//*/}

        {/*// ================== 2nd modal ==============================================//*/}

        <Modal
            open={openSignIn}
            onClose={() => setOpenSignIn(false)}>
            <div style={modalStyle} className={classes.paper}>
                <form className="app__signup">
                    <center>
                        <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" className="app__headerImage" alt=""/>
                    </center>s
                    <Input placeholder="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <Button type="submit" onClick={signIn}>Sign In</Button>

                </form>

            </div>
        </Modal>

        {/*// ================== end of 2nd modal ==============================================//*/}

        <div className="app__header">
            <img className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt=""/>

            {user ? (
                <Button onClick={() => auth.signOut()}>Log Out</Button>
            ):(
                <div className="app__loginContainer">
                    <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
                    <Button onClick={() => setOpen(true)}>Sign Up</Button>
                </div>
            )}

        </div>


        <div className="app__posts">

            {/* everythiig what goes to the left */}
            <div className="app__postLeft">
                {
                    post.map(({id, post}) => (
                        <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
                    ))
                }
            </div>

            {/* end of everything what goes to the left */}

            {/* start of the right */}
            <div className="app__postRight">
                {/* instagram embed does not work for some reason */}
                <InstagramEmbed
                    url='https://instagr.am/p/Zw9o4/'
                    clientAccessToken='123|456'
                    maxWidth={320}
                    hideCaption={false}
                    containerTagName='div'
                    protocol=''
                    injectScript
                    onLoading={() => {}}
                    onSuccess={() => {}}
                    onAfterRender={() => {}}
                    onFailure={() => {}}
                />
            {/*    end of does not work */}


            </div>

        {/*     end of the elements on the right!   */}

        </div>

        {/*// ================== Instagram embed ==============================================//*/}


        {/*// ================== End of instagram embed ==============================================//*/}




    {/*     Post    */}
    {/*     Post    */}

        {user?.displayName ? (
            <ImageUpload username={user.displayName}/>
        ): (
            <h3>Sorry you need to login, to upload something</h3>
        )}
    </div>
  );
}

export default App;

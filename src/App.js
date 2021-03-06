import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import Post from "./Post";
import "./App.css";

import { makeStyles } from "@material-ui/core/styles";

import { db, auth } from "./firebase.jsx";
import { Button, Input } from "@material-ui/core";
import ImageUploads from "./ImageUploads";
import InstagramEmbed from "react-instagram-embed";

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
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([
    // {
    // username:"Shirshak_Kandel",
    // caption: "wow it work",
    // imageUrl:"http://78.media.tumblr.com/c66f403cbcef956e5d2c3c8f6502be92/tumblr_onl5wvdipu1ulwtp8o2_400.gif  "
    // },
    // {
    // username: "Anuz gurung",
    // caption: "nice one",
    // imageUrl: "http://gifcandy.net/wp-content/uploads/2016/04/gifcandy-titfuck-5.gif"
    // }
  ]);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);

  //useEffect -> run piece of code based on a specific condition
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in..
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      //perform some cleanup action
      unsubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    //this is where the code runs
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        //everytimes a new post is added, this code fires...
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
    setOpen(false);
  };

  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    setOpenSignIn(false);
  };

  //---------------------------------------------------------------------------------------//
  return (
    /* Header */
    /* Posts*/
    /* Posts */
    <div className="App">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              {/* Header Logo*/}

              <h1>Sablook</h1>
            </center>
            <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>
              SignUP
            </Button>
          </form>
        </div>
      </Modal>

      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              {/* Header Logo*/}

              <h1>Sablook</h1>
            </center>

            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>
              SignIn
            </Button>
          </form>
        </div>
      </Modal>

      {/* Header */}
      <div className="app__header">
        <h1>Sablook</h1>

        {user ? (
          <Button onClick={() => auth.signOut()}> Logout </Button>
        ) : (
          <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign in</Button>
            <Button onClick={() => setOpen(true)}> Sign up</Button>
          </div>
        )}
      </div>

      <div className="app__posts">
        <div className="app__postsleft">
          {posts.map(({ id, post }) => (
            <Post
              key={id}
              postId={id}
              user={user}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
            />
          ))}
        </div>
        <div className="app__postright"></div>
      </div>

      {user?.displayName ? (
        <ImageUploads username={user.displayName} />
      ) : (
        <h3>Sorry you need to login to upload</h3>
      )}
      {/*  */}
    </div>
  );
}
//export default App;

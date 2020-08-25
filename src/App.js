import React , {useState, useEffect} from 'react';
import Modal from "@material-ui/core/Modal"
import Post from './Post'
import './App.css';
import {makeStyles} from '@material-ui/core/styles'

import {db, auth} from './firebase.jsx'
import {Button, Input} from '@material-ui/core';

    function getModalStyle() 
    {
      const top = 50 
      const left = 50

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




export default function App() 
{
        const classes= useStyles();
        const [modalStyle]=useState(getModalStyle);
        const [posts,setPosts]=useState([
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

        const [open,setOpen]=useState(false);
        const [username,setUsername]=useState('');
        const [password,setPassword]=useState('');
        const [email,setEmail]=useState('');
        const [user,setUser] = useState(null)

        //useEffect -> run piece of code based on a specific condition
        useEffect(()=> {
         const unsubscribe= auth.onAuthStateChanged((authUser) => {
            if(authUser){
              //user has logged in..
              console.log(authUser);
              setUser(authUser);
          
            }else{
              setUser(null);
            }
          })
          return()=> {
            //perform some cleanup action
            unsubscribe();
          }
        }, [user,username]);

        
        useEffect(()=> {
          //this is where the code runs
          db.collection('posts').onSnapshot((snapshot)=> {
            //everytimes a new post is added, this code fires...
            setPosts(snapshot.docs.map(doc=>({
            id:doc.id,
            post: doc.data()
            })));
          })

        }, []);

        const signUp = (event)=>{
            event.preventDefault();
            auth.createUserWithEmailAndPassword(email,password)
            .then((authUser)=>{
             return  authUser.user.updateProfile({
                displayName:username
              })
            })
            .catch(error=>alert(error.message))
        }

        return (  
               /* Header */
                /* Posts*/
                /* Posts */
          <div className="App">
           
          <Modal
            open={open}
            onClose={()=>setOpen(false)}
          >
              <div style={modalStyle} className={classes.paper}>
              <form className="app__signup">
                <center>
                      {/* Header Logo*/}
                     
                   <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" />
              </center>
                   <Input type="text" placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)} />
                   <Input placeholder="email" type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                   <Input placeholder="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                   <Button type="submit" onClick={signUp}>SignUP</Button>

                   </form>
              </div>
          </Modal>
         
               {/* Header */}
            <div className="app__header">
            <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" />

             

            </div> 
            {user ? (
              <Button onClick={()=>setOpen(true)}> Logout </Button>
              ): (
                <Button onClick={()=>setOpen(true)}> Sign up</Button>
              
              
            )}  
           

              <h1>Hello Shirshak kandel Lets build an instragram clone with React and Firebase</h1>
            {
              posts.map(({id,post}) => 
              <Post key ={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
              )
            }
      {/*  */}
            {/* <Post username="Shirshak_Kandel" caption="Wow its work" imageUrl="https://pornstarstop.files.wordpress.com/2013/08/capri-anderson.jpg"/>     */}
            {/* <Post username="Satish_thapa" caption="Instragram clone" imageUrl="https://di.phncdn.com/pics/pornstars/000/255/751/(m=lciuhScOb_c)(mh=uUx0JjPjHO2LUl_W)thumb_1116181.jpg"/>  */}
            {/* <Post username="Satish_thapa" caption="Instragram clone" imageUrl="https://ci.phncdn.com/videos/201803/26/159637462/original/(m=eaAaGwObaaaa)(mh=VEOqsaDaU50rJdNt)4.jpg"/> */}
          </div>
        );
      }
      //export default App;

import React from "react";
import './App.css';
import Post from "./Post.js";
import { db, auth } from "./firebase";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from "@material-ui/core";
import { center } from "@material-ui/core";
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

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

  const [posts, setPost] = React.useState([]); 
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [openSignIn, setOpenSignIn] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged( ( authUser) => {
       console.log(authUser);
      if(authUser) {
        setUser(authUser);
        console.log("Logged In");
      }
      else {
        setUser(null);
        }
     })
     return () => {
       unsuscribe();
     }
  }, [user, username])

  const handleOpen = () => {
    setOpen(true);
  }
  const signup = (event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
    .then( (authUser) => {
        return authUser.user.updateProfile( {
        displayName : username
    });
    })
    .catch( (error) => alert(error.message))

  }
  
  const handleLogin=(event) => {
      

  }

  const signIn = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword( email, password)
    .then()
    .catch( ( error ) => alert(error.message))


    setOpenSignIn(false);
  }

  React.useEffect( ()=> {
    db.collection('posts').onSnapshot(snapshot => {
      setPost(snapshot.docs.map(doc => doc.data()))
    })
    },
    []);

  return (
    <div className="App">
      <Modal  
      open = { open}
      onClose = {() => setOpen(false)}
      >
      <div style={modalStyle} className={classes.paper}>
        <form type = "" className = "app_signup">   
          <center>
              <img  className = "app_headerImage w-1"
              src = "https://img.icons8.com/metro/26/000000/instagram-new.png" alt="logo Instagram free transparent @transparentpng.com"
              alt = "https://www.transparentpng.com/thumb/flight-attendant/flight-attendant-user-icons-png-6.png"
              />
          </center>
              <Input  
              placeholder = "UserName"
              type = "text"
              value = {username}
              onChange = { (e) => setUsername(e.target.value)  }
              />
              <Input  
              placeholder = "Email"
              type = "email"
              value = {email}
              onChange = { (e) => setEmail(e.target.value)  }
              />
              <Input  
              placeholder = "Password"
              type = "password"
              value = {password}
              onChange = { (e) => setPassword(e.target.value)  }
              />
              <Button type = "submit" onClick = {signup}> Sign Up</Button>
        </form>  
      </div>
      </Modal>
      <Modal // modal 2
      open = { openSignIn}
      onClose = {() => setOpenSignIn(false)}
      >
      <div style={modalStyle} className={classes.paper}>
        <form type = "" className = "app_signup">   
            <center>
              <img  className = "app_headerImage w-1"
              src = "https://img.icons8.com/metro/26/000000/instagram-new.png" alt="logo Instagram free transparent @transparentpng.com"
              alt = "https://www.transparentpng.com/thumb/flight-attendant/flight-attendant-user-icons-png-6.png"
              />
            </center>
              {/* <Input  
              placeholder = "UserName"
              type = "text"
              value = {username}
              onChange = { (e) => setUsername(e.target.value)  }
              /> */}
              <Input  
              placeholder = "Email"
              type = "email"
              value = {email}
              onChange = { (e) => setEmail(e.target.value)  }
              />
              <Input  
              placeholder = "Password"
              type = "password"
              value = {password}
              onChange = { (e) => setPassword(e.target.value)  }
              />
              <Button type = "submit" onClick = {signIn}> Sign In</Button>
        </form>  
      </div>
      </Modal>
      <div className = "app_header" >
        <img className = "app_headerImage h-10 w-10" src="https://img.icons8.com/metro/26/000000/instagram-new.png" alt="logo Instagram free transparent @transparentpng.com"></img>
      </div>
      {  user ? (
        <Button onClick = { () => 
          auth.signOut()
        }  >
          Log Out
        </Button>
      ) 
      :
      (
        <div>
          <Button onClick = { () => 
            setOpen(true)
          }  >
            Sign Up
          </Button>
          <Button onClick = { () => 
          setOpenSignIn(true)
          }  >
            Sign In
          </Button>
        </div>
      )
      
      
      }

      {
        posts.map( post => (
            <Post imageUrl = { post.imageUrl}  UserName = {post.username}  caption = {post.caption}  />
        ))
      }
    </div>
  );
}

export default App;
// export default function SimpleModal() {
  
// }
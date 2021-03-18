import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';
import { useContext, useState } from 'react';
import { getByDisplayValue } from '@testing-library/dom';
import { userContext } from "../../App";
import { useHistory, useLocation } from "react-router";


firebase.initializeApp(firebaseConfig);

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: true
  });

  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };




  const provider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();

  const  handleSignIN = () => {
    firebase.auth()
    .signInWithPopup(provider)
    .then(res => {
      const {email, displayName, photoURL} = res.user;
      const signInUser = {
        isSignIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(signInUser);
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  }

  const handleFbSignIn = () => {
    firebase.auth().signInWithPopup(fbProvider)
  .then((res) => {
    const user = res.user;
    console.log(user); 
  })
  .catch((error) => {
    console.log(error);
  });
  }

  const handleSingOut = () => {
    firebase.auth().signOut()
    .then(() => {
      const signOutUser = {
        isSignIn: false,
        name: '',
        email: '',
        photo: ''
      }
      setUser(signOutUser);
    })
    .catch(err => {
      console.log(err);
    })
      console.log('click me');
  }

  const  handleChange = event => {
    // console.log(event.target.name, event.target.value);
    let isFormValid = true;
    if(event.target.name === 'email'){
      isFormValid  = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if(event.target.name === 'password'){
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFormValid = isPasswordValid &&  passwordHasNumber;
    }
    if(isFormValid){
      const newUserInfo = {...user};
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = (event) => {
    if(newUser && user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(res => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        history.replace(from);
        updateUserName(user.name);
      })
      .catch((error) => {
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
    }
    if(!newUser && user.email && user.password){
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        setLoggedInUser(newUserInfo);
        console.log('sign in user info', res.user.name);
      })
      .catch((error) => {
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
    });
    }

    const updateUserName = name => {
      const user = firebase.auth().currentUser;

      user.updateProfile({
        displayName: name,
      }).then(() => {
        console.log('user name update successfully');
      }).catch(error => {
        console.log(error);
      });

    }
    event.preventDefault();
  }

  return (
    <div style={{textAlign: 'center'}}>
      <h1>hello</h1>
      <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} id=""/>
      <label htmlFor="newUser">New User Sign Up</label>
      <p>error: {user.error}</p>
      <button onClick={handleFbSignIn}>log in using facebook</button>
      {
        user.success && <p>success: user {newUser ? 'create' : 'Logged In'} successfully</p>
      }
      
      {
        user.isSignIn ? <button onClick={handleSingOut}>sign out</button> : <button onClick={handleSignIN}>sign in</button>
      }

      {
        user.isSignIn && <p>welcome, {user.name}</p>
      }
      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" name='name' onBlur={handleChange} placeholder='your name'/>}
        <br/>
        <input type="text" name='email' onBlur={handleChange} placeholder='your email' required/>
        <br/>
        <input type="password" name='password' onBlur={handleChange} placeholder='password' required/>
        <br/>
        <input type="submit" value="submit"/>
      </form>
    </div>
  );
}

export default Login;

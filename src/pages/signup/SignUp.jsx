import { React, useRef, useState, useEffect } from "react";
import "./signup.css";
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from "../../firebaseInit";

const SignUp = () => {
  const userName = useRef();
  const userEmail = useRef();
  const userPassword = useRef();
  const navigate = useNavigate(); 
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  
  useEffect(() => {
      userName.current.focus()
  },[]);

  const onSubmit = async (e) => {
    e.preventDefault()
    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            navigate(-1)
    })
    await updateProfile(auth.currentUser, { displayName: name }).catch(
        (err) => console.log(err)
    )
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    });
  }

  return (
    <>
    <div className="form-container">
      <form className="registerpage-form">
        <h2>Sign Up</h2>
        <input type="text" 
          name="name" 
          placeholder="Enter Name" 
          ref={userName}
          value={name}
          onChange={(e) => setName(e.target.value)}/>
        <input type="email"
          name="email" 
          placeholder="Enter Email"
          ref={userEmail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" 
          name="password" 
          placeholder="Enter Password"
          ref={userPassword}
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit" onClick={onSubmit}>Sign Up</button>
      </form>
    </div>
    </>
  )
}

export default SignUp
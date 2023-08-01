import { React, useRef, useState } from "react";
import "./signin.css";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../firebaseInit";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/busybuySlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const useremail = useRef();
  const userPassword = useRef();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((result) => {
        const user = result.user;
        dispatch(addUser({
          id: user.uid,
          name: user.displayName,
          email: user.email,
        }))
        navigate("/");
        console.log(user);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
    });  
  }

  return (
    <>
        <div className="loginform-container">
            <form className="login-form">
              <h2 className="login-title">Sign In</h2>
              <input type="email" 
                name="email" 
                className="login-input" 
                ref={useremail}
                placeholder="Enter Email"
                value={email}
                required
                onChange={e => setEmail(e.target.value)}/>
              <input type="password" 
                name="password" 
                className="login-input" 
                ref={userPassword}
                placeholder="Enter Password"
                value={password}
                required
                onChange={e => setPassword(e.target.value)}/>
              <button type='submit' 
                className="login-button"
                onClick={onLogin}>
                Sign In
              </button>
              <NavLink className="nav-links" to="/signup">
                Or SignUp instead
              </NavLink>
            </form>
        </div>
        </>
  )
}

export default SignIn
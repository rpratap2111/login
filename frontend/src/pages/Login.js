import React from 'react'
import '../design/style.css'
import { ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../util';

function Login() {

  const [loginInfo, setLoginInfo] = React.useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newLoginInfo = { ...loginInfo, [name]: value };
    setLoginInfo(newLoginInfo);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError('Please fill all the fields!');
    }
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });
      const result = await response.json();
      console.log(result);
      const { message, success, token, name, error } = result;
      const jwtToken = token;
      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name); 
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      }
      else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      }
      else if (!success) {
        handleError(message);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="wrapper">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        
        <div className="input-field">
          <input
            type="email" 
            required
            name="email"
            onChange={handleChange}
            value={loginInfo.email}
          />
          <label>Enter your email</label>
        </div>
        <div className="input-field">
          <input
            type="password" 
             required
            name="password"
            onChange={handleChange}
            value={loginInfo.password}
          />
          <label>Enter your password</label>
        </div>
        <div className="forget">
          <label>
            <input type="checkbox" />
            <p>Remember me</p>
          </label>
          <a >Forgot password?</a>
        </div>
        <button type="submit">Log In</button>
        <div className="register">
          <p>Don't have an account? <a href='/signup'>Register</a></p>
        </div>
      <ToastContainer />
      </form>
    </div>
  )
}

export default Login

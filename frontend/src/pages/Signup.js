import React, { useState } from 'react'
import '../design/style2.css'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../util';
import { useNavigate } from 'react-router-dom';


function Signup() {

    const [signupInfo, setSignUpInfo] = useState({
        name: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const handelChange = (e) => {        
        const {name, value} = e.target;
        const newSignupInfo = { ...signupInfo, [name]: value };
        setSignUpInfo(newSignupInfo);
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('Please fill all the fields!');
        }
        try{
            const response = await fetch('http://localhost:8080/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            console.log(result);
            const { message, success, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            }
            else if(error){
                const details = error?.details[0].message;
                handleError(details);
            }
            else if(!success){
                handleError(message);
            }
            
            // if (result.success) {
            //     alert('Signup successful!');
            //     window.location.href = '/login';
            // } else {
            //     handleError(result.message);
            // }
        }
        catch(err){
            handleError(err.message);
        }
        
    }

    return (
        <div className="wrapper">
            <form onSubmit={handleSignup}>
                <h2>Register</h2>

                <div className="input-field">
                    <input type="text" name="name" required onChange={handelChange} value={signupInfo.name}/>
                    <label>Enter your name</label>
                </div>
                <div className="input-field">
                    <input type="email" name="email" required onChange={handelChange} value={signupInfo.email}/>
                    <label>Enter your email</label>
                </div>
                <div className="input-field">
                    <input type="password" name="password" required onChange={handelChange} value={signupInfo.password}/>
                    <label>Enter your password</label>
                </div>
                <div className="terms">
                    <label>
                        <input type="checkbox" name="agreed" required />
                        <p>I agree to the <a>Terms & Conditions</a></p>
                    </label>
                </div>
                <button type="submit">Register</button>
                <div className="login">
                    <p>Already have an account? <a href='/login'>Log In</a></p>
                </div>
            </form>
            < ToastContainer/>
        </div>
    )
}

export default Signup

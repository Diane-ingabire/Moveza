import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../Styles/login.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Notify } from "notiflix";
import mylogimg from "../assets/pixel1.jpg"
import logo from "../assets/logo (2).png"

const API_URL = 'https://swift-ride-backend-4.onrender.com';

function LoginPage() {
  const navigate = useNavigate();
  
  // Separate form handlers for login and register
  const {
    register: registerSignIn,
    handleSubmit: handleSubmitSignIn,
    formState: { errors: errorsSignIn },
  } = useForm();
  

  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    formState: { errors: errorsSignUp },
  } = useForm();

  const [isLogin, setIsLogin] = useState(true);
  const [logPasswordType, setLogPasswordType] = useState('password');
  const [regPasswordType, setRegPasswordType] = useState('password');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const toggleLogPassword = () => setLogPasswordType(prev => prev === 'password' ? 'text' : 'password');
  const toggleRegPassword = () => setRegPasswordType(prev => prev === 'password' ? 'text' : 'password');
  const toggleForm = () => setIsLogin(prev => !prev);
  
  // Login function with role-based redirection
  const onSubmitSignIn = async (data) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post(`${API_URL}/user/login`, {
        userEmail: data.userEmail,
        userPassword: data.userPassword,
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      const responseData = response.data;
      
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', data.userEmail);

      // Backend sends tokens.accessToken
      if (responseData.user && responseData.user.tokens && responseData.user.tokens.accessToken) {
        localStorage.setItem('token', responseData.user.tokens.accessToken);
      }

      if (responseData.user) {
        localStorage.setItem('userId', responseData.user._id);
        localStorage.setItem('userName', responseData.user.userName);
        localStorage.setItem('role', responseData.user.userRole);
        
        // Redirect based on user role
        if (responseData.user.userRole === 'admin') {
          Notify.success('Admin Login Successful');
          navigate('/admin');
        } else {
          Notify.success('Login Successful');
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
      Notify.failure(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const onSubmitSignUp = async (data) => {
    if (!agreeToTerms) {
      setErrorMessage("Please agree to the terms");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(`${API_URL}/user/register`, {
        userName: data.userName,
        userEmail: data.userEmail,
        userPassword: data.userPassword,
        userRole: "user"
      }, {
        headers: { "Content-Type": "application/json" },
      });

      const responseData = response.data;
      
      // Store user information similar to login
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', data.userEmail);
      
      if (responseData.user && responseData.user.tokens && responseData.user.tokens.accessToken) {
        localStorage.setItem('token', responseData.user.tokens.accessToken);
      }
      
      if (responseData.user) {
        localStorage.setItem('userId', responseData.user._id);
        localStorage.setItem('userName', responseData.user.userName);
        localStorage.setItem('role', responseData.user.userRole);
      }

      Notify.success("Registration Successful");
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
      Notify.failure(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="containerlogin">
      <div className='my_image'>
        <h2>Swift Ride</h2>
        <p>Smart Bus Booking Made Easy – Travel Smarter with SwiftRide!</p>
        <img src= {mylogimg} />
    
      </div>
      <div className="boxlogin">
        <h2 className="logo"><span className="logocardlogin"><img src={logo} alt="logo"/></span></h2>
        {/* Login Form */}
        <form 
          className="box-login" 
          style={{ left: isLogin ? '27px' : '-350px' }}
          onSubmit={handleSubmitSignIn(onSubmitSignIn)}
        >
          <div className="top-header-login">
            <h3>Hello, Again!</h3>
            <p>We are happy to have you back</p>
          </div>
          
          <div className="input-group-login">
            <div className="input-field">
              <input 
                type="text" 
                {...registerSignIn("userEmail", { required: true })} 
                className="input-box" 
                placeholder=" "
              />
              <label>Email address</label>
              {errorsSignIn.userEmail && <p className="error">Email is required</p>}
            </div>
            
            <div className="input-field">
              <input 
                type={logPasswordType} 
                {...registerSignIn("userPassword", { required: true })} 
                className="input-box" 
                placeholder=" "
              />
              <label>Password</label>
              <div className="eye-box" onClick={toggleLogPassword}>
                {logPasswordType === 'password' ? <FaEye /> : <FaEyeSlash />}
              </div>
              {errorsSignIn.userPassword && <p className="error">Password is required</p>}
            </div>

            <button type="submit" className="input-submit">
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
            
            {errorMessage && <p className="error">{errorMessage}</p>}
          </div>
        </form>

        {/* Register Form */}
        <form 
          className="box-register" 
          style={{ left: isLogin ? '-350px' : '27px' }}
          onSubmit={handleSubmitSignUp(onSubmitSignUp)}
        >
          <div className="top-header">
            <h3>Sign Up</h3>
            <p>Create a new account</p>
          </div>
          
          <div className="input-group">
            <div className="input-field">
              <input 
                type="text" 
                {...registerSignUp("userName", { required: true })} 
                className="input-box" 
                placeholder=" "
              />
              <label>Full Name</label>
              {errorsSignUp.userName && <p className="error">Name is required</p>}
            </div>
            
            <div className="input-field">
              <input 
                type="email" 
                {...registerSignUp("userEmail", { required: true })} 
                className="input-box" 
                placeholder=" "
              />
              <label>Email address</label>
              {errorsSignUp.userEmail && <p className="error">Email is required</p>}
            </div>
            
            <div className="input-field">
              <input 
                type={regPasswordType} 
                {...registerSignUp("userPassword", { required: true })} 
                className="input-box" 
                placeholder=" "
              />
              <label>Password</label>
              <div className="eye-box" onClick={toggleRegPassword}>
                {regPasswordType === 'password' ? <FaEye /> : <FaEyeSlash />}
              </div>
              {errorsSignUp.userPassword && <p className="error">Password is required</p>}
            </div>

            <div className="terms-checkbox">
              <input 
                type="checkbox" 
                id="terms" 
                checked={agreeToTerms}
                onChange={() => setAgreeToTerms(prev => !prev)}
              />
              <label htmlFor="terms">I agree to the Terms & Conditions</label>
            </div>

            <button type="submit" className="input-submit">
              {isLoading ? 'Registering...' : 'Register'}
            </button>
            
            {errorMessage && <p className="error">{errorMessage}</p>}
          </div>
        </form>

        {/* Toggle Between Login and Register */}
        <div className="toggle-container">
          <button 
            className={`toggle-btn ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Sign In
          </button>
          <button 
            className={`toggle-btn ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
          <div className={`toggle-slider ${!isLogin ? 'right' : ''}`}></div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
import React from 'react';
import {  signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react";
import {auth} from './firebase'
import { Link } from 'react-router-dom';
import { ReactTyped } from "react-typed";
import { ToastContainer, toast } from 'react-toastify';

const Login = ({onLogin}) => {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const handleSubmit= async(e)=>{
    e.preventDefault();        
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      // Signed in successfully
      const user = auth.user;
      console.log(user)
      console.log("User signed in:", user);
        toast.success("Login successful!", {
            position: 'top-center',
            autoClose: 3000,
            
        });
      onLogin();
    })
    .catch((error) => {
      console.error("Sign in error:", error.message);
        toast.error("Login failed: " + error.message, {
            position: 'bottom-center',
            autoClose: 3000,
        });
    });}

    // Handle login logic here
    // For example, you can redirect the user to the home page or show a success message
    // onLogin(); // Call the onLogin function passed as a prop to update the login
    
    // Redirect to home or perform any other action after login

    
    return (
    <>
    
    <div className='flex overflow-hidden flex-col gap-10 md:gap-1 items-center justify-center min-h-screen bg-[url("./assets/home_bg.png")] bg-cover bg-center bg-no-repeat bg-opacity-80'>
    <div className='text-white text-center md:text-6xl sm:text-6xl font-bold md:py-6'><p className='md:text-6xl sm:text-6xl font-bold md:py-6'>Unlimited movies,</p>
    <ReactTyped strings ={['TV', 'Shows','and more.']} typeSpeed={200}backSpeed={100}  backDelay={7000} loop={true} />
    </div>
    <form action="" name='forms'  onSubmit ={handleSubmit} className=' text-center mx-auto  w-450px bg- p-8  h-110 max-w-m relative z-10 bg-black/70 text-white px-8 py-10 rounded-lg shadow-lg max-w-md w-full backdrop-blur-sm '>
<h1 className='text-3xl font-bold mb-8 text-center '>Login Page</h1>
<div className="mb-4">
    <label htmlFor="Email" className="block mb-1 text-left pl-5 ">Email Address:</label>
    <input
          type="email"
          required
          placeholder="Enter email"
          value={email}
          className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none "
          onChange={(e) => setEmail(e.target.value)}/>
    </div>
    <div className="mb-4" >
        <label htmlFor="Password" className="block mb-1 text-left pl-5 "> Password</label>
    <input
          type="password"
          className="form-control w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
    </div>
<button onClick={handleSubmit} className="w-full bg-[#e50914] text-white py-3 rounded font-semibold hover:bg-red-700 transition duration-300 cursor-pointer my-2" type='submit'>Submit</button>    
<ToastContainer />
 <span className="text-sm mt-2 text-gray-300  flex justify-end mr-4 "> new user?{"  "}
     <Link to='/signup' className="text-[#e50914] hover:underline "> &nbsp; Register Here</Link></span>
    </form>
</div>
      
</>
  )

}
export default Login
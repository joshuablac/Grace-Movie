import React from 'react';
//import { useState } from "react";
import { Link } from 'react-router-dom';
import { FaGooglePlusG } from "react-icons/fa";
import {createUserWithEmailAndPassword,signInWithPopup} from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import { setDoc, doc } from 'firebase/firestore';
import { auth,db,google } from './firebase'; // Adjust the import path as necessary
const Signup = ({onLogin}) => {
   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
const handleGoogle = async ()=>{
  try{
const result =await signInWithPopup(auth , google)
const user= result.user
console.log("login succesful" +result.user)
const fullName = user.displayName || "";
    const firstName = fullName.split(" ")[0] || "";
    const lastName = fullName.split(" ")[1] || "";

    // Save to Firestore
    await setDoc(doc(db, "users", user.uid), {
      firstName,
      lastName,
      email: user.email,
      photo: user.photoURL,
    }, { merge: true }); // merge: true to avoid overwriting
onLogin()
}
  catch(error){
    console.log("there is problem with ur sign in " + error.message)
  }
}
  const handleSubmit = async (e) => {
e.preventDefault();
    try {
      // Create user with email and password
      await createUserWithEmailAndPassword(auth, email, password);
      
const user = auth.currentUser;
console.log(user)
      // Save additional user information to Firestore
      if(user){
        await setDoc(doc(db, "users", user.uid), {
          firstName: fname,
          lastName: lname,
          email: user.email,
        });
      }
      console.log("User created successfully");
      toast.success("Login successful!", {
                  position: 'top-center',
                  autoClose: 3000,
                  
              });
      // You can also save additional user information (like first name and last name) to your database here
    } catch (error) {
      console.error("Error creating user:", error.message);
       toast.error("Login failed: " + error.message, {
                  position: 'bottom-center',
                  autoClose: 3000,
              });
      // Handle error (e.g., show a notification to the user)
    }
  
  }

  return (

    <div className='flex items-center justify-center min-h-screen bg-[url("./assets/home_bg.png")] bg-cover bg-center bg-no-repeat bg-opacity-80'>
      <form onSubmit={handleSubmit}  className=' text-center mx-auto  w-450px bg- p-8  h-160 max-w-m relative z-10 bg-black/70 text-white px-8 py-10 rounded-lg shadow-lg max-w-md w-full backdrop-blur-sm '>
    <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
      <div className="mb-4">
        <label className="block mb-1 text-left pl-5 ">First Name</label>
        <input
          type="text"
          className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none "
          placeholder="First name"
          onChange={(e) => setFname(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-left pl-5 ">Last Name</label>
        <input
          type="text"
          className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none "
          placeholder="Last name"
          onChange={(e) => setLname(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-left pl-5 ">Email Address</label>
        <input
          type="email"
          className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1 text-left pl-5 ">Password</label>
        <input
          type="password"
          className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button onSubmit={handleSubmit}
        type="submit"
        className="w-full bg-[#e50914] text-white py-3 rounded font-semibold hover:bg-red-700 transition duration-300 cursor-pointer"
      >
        Sign Up
      </button>
      <button onClick={handleGoogle}
        className="w-full bg-white flex justify-center items-center gap-3  mt-6 text-black py-3 rounded font-semibold transition duration-300 cursor-pointer">
        Sign in using Google <FaGooglePlusG size={28} className='text-[#e50914] hover:text-blue-400' />
      </button>
<ToastContainer/>
    <p className="text-sm text-center mt-6 text-gray-300">
      Already registered?{" "}
      <Link to="/login" className="text-[#e50914] hover:underline">
        Login
      </Link>
    </p>
    </form>
    </div>
    
  );
  }
export default Signup
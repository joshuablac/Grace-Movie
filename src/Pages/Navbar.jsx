import React from 'react';
import { useState } from 'react';
import { MdMovieCreation } from "react-icons/md"
import { Link,useLocation } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillAppstore } from "react-icons/ai";
import { TbDeviceTvOld } from "react-icons/tb";
import { IoBookmarkSharp } from "react-icons/io5";
import { MdLocalMovies } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import {auth} from './firebase'; // Adjust the import path as necessary
function Navbar({onLogin}) {
  const Location = useLocation()
  const [isOpen, setIsOpen] = useState(false);
  const [hambug, setHambug] = useState(true);
  const toggleMenu = () => {
    setIsOpen(!isOpen); setHambug(!hambug);};
 const  handleLogout = async()=> {
  
  try{
    await auth.signOut();
    console.log("User logged out successfully"); // Redirect to home page after logout
  }
  catch (error) {
    console.error("Error logging out:", error);
  }
 }
   return (
    <>
    
    <div
  className={`group md:fixed absolute top-0 left-0 cursor-pointer h-170 pt-4 hover:w-46 mt-0 flex flex-col text-gray-500
    md:w-26 w-20 text-[12px] gap-8 bg-[#161d2f] overflow-hidden transition-all duration-500 ease-in-out z-40
    rounded-3xl shadow-lg
    ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'} 
    md:opacity-100 md:translate-x-0 md:flex list-none`}
>
  <ul className='flex flex-col justify-center items-center gap-6 md:gap-10 text-center mt-5 group-hover:gap-16'>

    <li>
      <Link
        className={`flex items-center group-hover:items-start flex-col group-hover:flex-row gap-2 px-2 mb-5 ${
          location.pathname === '/' ? 'text-white' : 'text-gray-500'
        }`}
        to="/"
      >
        <i className="text-xl group-hover:text-red-500 hover:text-red-500 group-hover:pl-1">
          <MdMovieCreation />
        </i>
        <span className="text-sm opacity-0 group-hover:text-red-500 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Movies
        </span>
      </Link>
    </li>

    <div className='flex flex-col justify-center text-center gap-7 items-center group-hover:gap-10'>
      <li>
        <Link
          className={`flex items-center group-hover:items-start flex-col group-hover:flex-row gap-2 px-2 ${
            location.pathname === '/homes' ? 'text-white' : 'text-gray-500'
          }`}
          to="/homes"
        >
          <i className="text-xl group-hover:text-red-500">
            <AiFillAppstore />
          </i>
          <span className="text-sm opacity-0 group-hover:text-red-500 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Home
          </span>
        </Link>
      </li>

      <li>
        <Link
          className={`flex items-center group-hover:items-start flex-col group-hover:flex-row gap-2 px-2 ${
            location.pathname === '/tvicons' ? 'text-white' : 'text-gray-500'
          }`}
          to="/tvicons"
        >
          <i className="text-xl group-hover:text-red-500 group-hover:pl-3">
            <MdLocalMovies />
          </i>
          <span className="text-sm opacity-0 group-hover:text-red-500 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            TV Icons
          </span>
        </Link>
      </li>

      <li>
        <Link
          className={`flex items-center group-hover:items-start flex-col group-hover:flex-row gap-2 px-2 ${
            location.pathname === '/shows' ? 'text-white' : 'text-gray-500'
          }`}
          to="/shows"
        >
          <i className="text-xl group-hover:text-red-500">
            <TbDeviceTvOld />
          </i>
          <span className="text-sm opacity-0 group-hover:text-red-500 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Shows
          </span>
        </Link>
      </li>

      <li>
        <Link
          className={`flex items-center group-hover:items-start flex-col group-hover:flex-row gap-2 px-2 ${
            location.pathname === '/foot' ? 'text-white' : 'text-gray-500'
          }`}
          to="/foot"
        >
          <i className="text-xl group-hover:text-red-500 group-hover:pl-6">
            <IoBookmarkSharp />
          </i>
          <span className="text-sm opacity-0 group-hover:text-red-500 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Bookmarks
          </span>
        </Link>
      </li>
    </div>
  </ul>

  <button
    className="h-8 text-center text-white w-20 bg-[#e50914] mt-auto mx-auto mb-8 rounded font-semibold hover:bg-red-700 transition duration-300 cursor-pointer"
    
    onClick={()=>{handleLogout;
      onLogin();
    }}
  >
    Logout
  </button>
</div>

{/* Mobile Menu Toggle Button */}
<div className="md:hidden fixed top-4 right-4 text-white z-50">
  <button onClick={toggleMenu}>
    {hambug ? <GiHamburgerMenu /> : <FaTimes />}
  </button>
</div>
</>
   )}
   export default Navbar
import React from 'react'
import './App.css'
import { useEffect } from 'react'
import {Route, Routes,Navigate, } from 'react-router-dom'
import {db,} from './firebase' // Adjust the import path as necessary
import Login from "./Component/login"
import About from "./Pages/About"
import Contact from "./Pages/Contact"
import Project from "./Pages/Project"
import Navbar from "./Pages/Navbar"
import Home from "./Pages/Home"
import Footer from './Component/Footer'
import Buttons from './Props/Buttons'
import Signup from './Component/Signup'
import { doc,setDoc, } from 'firebase/firestore'
import { useState } from 'react'
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
  return localStorage.getItem('isLoggedIn') === 'true';
});
  if(isLoggedIn){
    localStorage.setItem('isLoggedIn', 'true')
  }
  else{
    localStorage.removeItem('isLoggedIn');
  }
  const fetchUserData = async () => {
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjA4OTUxYmI3ZjI5OTYwZGUzNThmYzBiODZjNWU2NyIsIm5iZiI6MTc1MTYzMTY1NS44MzAwMDAyLCJzdWIiOiI2ODY3YzcyNzA2YjgyNzQ2NmU1M2I4YTIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.7dHa7DBREfgiJkB7wiCYLMDJFv2LBXLDcYMBtpaQyBA'
  }
};
const resp = await fetch (`https://api.themoviedb.org/3/movie/550/recommendations?language=en-US&page=1`, options)
try{
  if(!response.ok) {
    throw new Error('Network response was not ok');
  }
  const datae = await resp.json();
   console.log(datae);
  return datae
 
}
catch(error){
  console.error('There has been a problem with your fetch operation:', error);
}

 const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
try{
  if(!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  console.log(data);
  const ooh =doc(db, "movies","200") 
    
  data.results.forEach(async (movie) => {
     await setDoc(ooh, {
        id: movie.id,
        movie_type: movie.media_type || 'movie',
        title: movie.title,
        overview: movie.overview,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        movie_vote: movie.vote_average
      });
    
  });
    
   
}
catch (error) {
console.error('There has been a problem with your fetch operation:', error);
}
  }
  useEffect(() => {
    fetchUserData();
  }, []);
   return (

        <>
        
          {!isLoggedIn ? (
            
        <Routes>
          
          <Route path="/" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="/signup" element={<Signup onLogin={()=> setIsLoggedIn(true)} />} />
          <Route path='/home' element={<Home/>}/>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        // If logged in, show full app with Navbar and Routes
        <>
<div className=' bg-gray-900  md:justify-left md:items-left justify-center  text-center '>
          <Buttons/>
  <Navbar  onLogin={() => setIsLoggedIn(false)}/>
  
        </div>
        

          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path= "/project" element = {<Project/>}/>
            <Route path="/home" element={<Buttons />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/homes" element={<About />} />
            <Route path="/tvicons" element={<Contact />} />
            <Route path = "/foot" element={<Footer/>}/>
            <Route path="/shows" element={<About/>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      )}
      </>)
  
}

export default App




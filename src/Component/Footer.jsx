import React, { useEffect ,useState} from 'react';
import { getDoc,doc,setDoc } from 'firebase/firestore';
import {IoBookmarkSharp} from "react-icons/io5";
import { Link } from 'react-router-dom';
import { MdLocalMovies } from "react-icons/md";
import { db } from '../Pages/firebase';
const Footer = () => {
  const  [movies, setMovies] = useState([]);
  const movieRecommendation = async () => {
    const moviedot = doc(db,'moviseBook',"100");
    const snapshot = await getDoc(moviedot);
  
    if (snapshot.exists()) {
      const data = snapshot.data();
      console.log("Full Data:", data);
      console.log("Fetched Recommendations:", data.details);
      return setMovies(data.details)
    } else {
      console.log(" Document not found");
      return [];
    }
  };
  const getData =async(move)=>{
   await setDoc(doc(db, 'accomodations','10'), {
        details:move, // Or save entire 'responses' array if you prefer
      });
      console.log("Saved")
    };  
  useEffect(()=>
    {
      movieRecommendation()
    },[])

  return (
    <>
    <div className=' bg-gray-900  z-0 min-h-screen w-screen overflow-hidden'>
    <div>
<h1 className='text-4xl pl-27 md:pl-45 bg-gray-900  text-white w-full h-17 pt-14 flex gap-3'>Bookmarks <IoBookmarkSharp className='hover:text-red-700 mt-1 cursor-pointer' size={38}/></h1>
<div className=' text-blue-600 justify-start md:pl-50 flex-row gap-5 flex-wrap flex overflow-y-auto w-screen pt-16 mx-auto items-center whitespace-nowrap no-scrollbar'>
{movies.map((movie)=>(<div ><Tree {...movie} key={movie.id} hanleClick={()=>getData(movie)}/></div>))}
    </div>
</div>  
    </div>
  
    </>
  )
}
export default Footer

// adult
// : 
// false
// backdrop_path
// : 
// "/a8a8z4aJr40zYgRMfmSESppX2eO.jpg"
// 
// : 
// "2015-12-05"
// genre_ids
// : 
// (2) [10764, 35]
// id
// : 
// 70672
// 
// : 
// "Men on a Mission"
// origin_country
// : 
// ['KR']
// original_language
// : 
// "ko"
// original_name
// : 
// "

const Tree =(prop)=>{
  
return(
  <>
  <Link to="/project" onClick={prop.hanleClick} >
  
  <div className="relative w-110 h-98 md:h-110 text-white overflow-hidden group bg-gray-900 p-4 flex flex-col gap-4 " >
  <img className=" md:w-100  rounded-xl  md:h-68 w-90 h-48  object-cover  group-hover:scale-105 transition-transform duration-300 ease-in-out" src={`https://image.tmdb.org/t/p/w500/${prop.backdrop_path||prop.poster_path}`} alt={prop.title} />
<div>
  <div className="flex items-start pl-4 text-sm  mt-[-0px] gap-4 opacity-95">
  <h4>{prop.release_date||prop.first_air_date}</h4>
  <h5 className="text-sm font-semibold leading-tight truncate">{prop.movie_vote}</h5>
<p className='flex text-sm'><MdLocalMovies className='mt-1'/>{prop.movie_type}</p>
<p>PG</p>
</div>
<h1 className="text-2xl text-white  font-semibold leading-tight truncate flex items-start pl-4 text-center pt-4">{prop.title||prop.name}</h1>

  </div>
  </div>
  </Link>

  </>
)
}
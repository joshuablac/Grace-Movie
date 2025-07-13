import React, { useEffect,useState,updateDoc,arrayRemove,arrayUnion} from 'react';
import { MdLocalMovies } from "react-icons/md";
import { IoBookmarkSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import {db} from './firebase';
import { doc,setDoc,getDoc } from 'firebase/firestore';
const Contact = () => {
  const [move, setmove]=useState([])
  const [fullDetails,setDetails] = useState([])
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
  const handleBookmarkClick = async(moviee) => {
setBookmarkedMovies(prev => {
    const isAlreadyAdded = prev.some(m => m.id === moviee.id);
    if (isAlreadyAdded) return prev;   // avoid duplicates6
    const update =  [...prev, moviee];
        console.log(update)
        const books = async()=>{
    const savebook = doc(db,'moviseBook',"100")
         await setDoc(savebook,{
          details:update,
        })
        }
        books()
        return update
  });
};
const filterBook =async(movie)=>{
 const savebook = doc(db, "moviseBook","100");  // Use user ID as document name

  const snap = await getDoc(savebook);
  const existingBookmarks = snap.exists() ? snap.data().details || [] : [];

  const isAlreadyBookmarked = existingBookmarks.some(m => m.id === movie.id);

  if (isAlreadyBookmarked) {
    await updateDoc(savebook, {
      details: arrayRemove(movie)
    });
    setBookmarkedMovies(prev => prev.filter(m => m.id !== movie.id));
    console.log("✅ Removed from Firestore");
  } else {
    await setDoc(savebook, {
      details: arrayUnion(movie)
    }, { merge: true });

    setBookmarkedMovies(prev => [...prev, movie]);
    console.log("✅ Added to Firestore");
  }
}


const getData =async(move)=>{
console.log(setDetails([move]))
 await setDoc(doc(db, 'accomodations','10'), {
      details:move, // Or save entire 'responses' array if you prefer
    });
    console.log("Saved")
  };  

  console.log(fullDetails)
console.log(bookmarkedMovies)
  const functiondata = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjA4OTUxYmI3ZjI5OTYwZGUzNThmYzBiODZjNWU2NyIsIm5iZiI6MTc1MTYzMTY1NS44MzAwMDAyLCJzdWIiOiI2ODY3YzcyNzA2YjgyNzQ2NmU1M2I4YTIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.7dHa7DBREfgiJkB7wiCYLMDJFv2LBXLDcYMBtpaQyBA'
      }
    };
  
    let totalPages = 3;
    const fetchPromises = [];
  
    for (let i = 1; i <= totalPages; i++) {
      const url = `https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=${i}`;
      fetchPromises.push((fetch(url, options).then(res =>res.json())));
    }
  
    const responses = await Promise.all(fetchPromises);
    console.log(responses)
     const allMovies = responses.flatMap(res => res.results);
  
    responses.forEach(res => {
      if (res.results && Array.isArray(res.results)) {
       // recommendations.push(...res.results);
        
      }
    });
  
    
    console.log(allMovies.length)
  
    try {
      const movieRef = doc(db, "movies8", "510");
      await setDoc(movieRef, {allMovies });  // match the name exactly
      console.log(" Recommendations stored successfully!");

    } catch (error) {
      console.error("Error storing recommendations:", error);
    }
  };
  const movieRecommendation = async () => {
    const moviedot = doc(db, "movies8", "510");
    console.log(moviedot)
    const snapshot = await getDoc(moviedot);
   console.log(snapshot)
    if (snapshot.exists()) {
      const data = snapshot.data();
      console.log("Full Data:", data);
      return setmove(data.allMovies);
    } else {
      console.log(" Document not found");
      return [];
    }
  };
  useEffect(()=>{
functiondata()
movieRecommendation ()
  },[])
  return (
    <>
    <div className='bg-gray-900  z-0 min-h-screen w-screen overflow-hidden'>
      <div className='bg-gray-900 overflow-hidden'>
<h1 className='md:text-4xl text-2xl pl-15 md:pl-27 md:pl-45 bg-gray-900  text-white w-full h-17 pt-14'>TV SHOWS </h1>
<div className=' text-blue-600 justify-center flex-row gap-5  flex-wrap flex overflow-y-auto w-screen pt-10 mx-auto items-center whitespace-nowrap no-scrollbar'>
{move.map((movie)=>(<div ><Tree {...movie} key={movie.id} onBookmark={() => handleBookmarkClick(movie)} onDropbook={()=>filterBook(movie)} isBookmark={bookmarkedMovies.some(m => m.id === movie.id)} hanleClick={()=>getData(movie)}/></div>))}
    </div>
</div> 
    </div>
   
    </>
  )
}
export default Contact

const Tree =(prop)=>{
  const [clicked, setClick] = useState(false);

  const handleClick = () => {
    if (!clicked) {
      prop.onBookmark();  // Add movie
    } else {
      prop.onDropbook();  // Remove movie
    }
    setClick(!clicked);  // Flip button color
  };
return(
  <>
  <Link to="/project" onClick={prop.hanleClick} >
  <div className="relative w-90   h-98 md:h-98 text-white overflow-hidden group bg-gray-900 p-4 flex flex-col justify-between " >
  <img className=" w-93  rounded-xl h-68  object-cover  group-hover:scale-105 transition-transform duration-300 ease-in-out" src={`https://image.tmdb.org/t/p/w500/${prop.backdrop_path}`} alt={prop.title} />
<Link className={`absolute top-6 right-8 bg-gray-800 bg-opacity-60 p-2 rounded-full text-white hover:bg-opacity-80 transition ${clicked ? 'bg-red-700' : 'bg-gray-800 bg-opacity-60 hover:bg-opacity-80'} `} onClick={(e) => { e.stopPropagation(); handleClick(); }}><IoBookmarkSharp size={18}/></Link>
<div className="flex items-left  pl-10 text-sm  mt-[-0px] gap-4 opacity-95">
  <h4>{prop.first_air_date.slice(0,4)}</h4>
  <h5 className="text-sm font-semibold leading-tight truncate">{prop.original_language}</h5>
<p className='flex text-sm gap-3'><MdLocalMovies className='mt-1'/>{prop.popularity}</p>
<p>TV</p>
</div>
<h1 className="text-2xl text-white  font-semibold leading-tight truncate flex items-left  pl-10">{prop.name.slice(0,25)}</h1>
</div>
  </Link>

  </>
)
}
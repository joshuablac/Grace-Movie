import React from 'react';
import { useState, useEffect } from 'react';
import { getDoc, doc,updateDoc,arrayRemove,arrayUnion} from 'firebase/firestore';
import { BookmarkArrayProvider } from '../Bookmap';
import { Link } from 'react-router-dom';
//use context learn on react contextand uyse it
import { IoBookmarkSharp } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import { MdLocalMovies } from "react-icons/md";
import { getDocs} from 'firebase/firestore';
import { collection,setDoc,query} from 'firebase/firestore';
import { db ,auth} from './firebase';
import { limit } from 'firebase/firestore';  // Adjust the import path as necessary
const Home = () => {
  const [fullDetails,setDetails]=useState([])
  const  [movies, setMovies] = useState([]);
  const  [move, setmove]= useState([])
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

setDetails([move])
window.location.href = './project'

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
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjA4OTUxYmI3ZjI5OTYwZGUzNThmYzBiODZjNWU2NyIsIm5iZiI6MTc1MTYzMTY1NS44MzAwMDAyLCJzdWIiOiI2ODY3YzcyNzA2YjgyNzQ2NmU1M2I4YTIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.7dHa7DBREfgiJkB7wiCYLMDJFv2LBXLDcYMBtpaQyBA' //
        }
      };
  
      let totalPages = 4;
      const fetchPromises = [];
  
      for (let i = 1; i <= totalPages; i++) {
        const url = `https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=${i}`;
        fetchPromises.push(fetch(url, options).then(res => res.json()));
      }
  
      const forbiddenGenres = [27, 53, 80, 9648, 99, 10764, 10766, 10749];
      const blacklist = ['sex', 'erotic', 'evil', 'lust', 'sin', 'sinners', 'horror', 'curse', 'thriller', 'demon', 'witch', 'kill', 'murder', 'love', 'romance', 'romantic', 'affair', 'affairs', 'mistress'];
  
      const responses = await Promise.all(fetchPromises);
  
      const allMovies = responses.flatMap(res => res.results)
        .filter(tv =>
          !tv.genre_ids?.some(id => forbiddenGenres.includes(id)) &&
          !blacklist.some(word =>
            (tv.name || '').toLowerCase().includes(word) ||
            (tv.original_name || '').toLowerCase().includes(word) ||
            (tv.overview || '').toLowerCase().includes(word)
          )
        );
  
      try {
        const movieRef = doc(db, "movies2", "550");
        await setDoc(movieRef, { allMovies });
      } catch (error) {
        console.error("Error storing recommendations:", error);
      }
    };
const movieRecommendation = async () => {
  const moviedot = doc(db, "movies2", "550");
  const snapshot = await getDoc(moviedot);


  if (snapshot.exists()) {
    const data = snapshot.data();
    console.log("Full Data:", data);
    console.log("Fetched Recommendations:", data.allMovies);
    console.log(data.allMovies)
    return setmove(data.allMovies);
  } else {
    console.log(" Document not found");
    return [];
  }
};
  useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(async (user) => {
    if (user) {
      const userDoc = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDoc);
          const name = userSnap.data().firstName.toUpperCase();
      if (userSnap.exists()) {
        toast.success(`Welcome ${''} ${name}`,{
        position:'top-center'
        })
      }
    } 
  });

  return () => unsubscribe();
}, []);


useEffect(()=>{
  movieRecommendation()
  functiondata()
  const fetchMovies = async () => {
  const moviesCollection = query(collection(db, "movies"),limit(8));
    try{
      const snapShot = await getDocs(moviesCollection);
      
      console.log(snapShot)
const movies = snapShot.docs.map(doc => ({
 
  id:doc.id,
...doc.data(),
 
}))
console.log(movies.length)
      setMovies(movies);
      console.log("Movies fetched successfully:", movies);
    }
    catch{
      console.error("Error fetching movies:");
    }
}
fetchMovies();
},[])
  return (
    <>
    <BookmarkArrayProvider value={bookmarkedMovies}>
      <ToastContainer/>
<div className='bg-gray-900  z-0 min-h-screen w-screen overflow-hidden'   >
<div>
<h1 className='md:text-4xl text-2xl pl-24 md:pl-27 bg-gray-900  text-white w-full h-17 pt-4'>Trending</h1>
   <div className=' text-blue-600  gap-9 overflow-x-auto bg-gray-900 flex w-screen md:pl-30   whitespace-nowrap no-scrollbar'>
{movies.map((movie) => (
    <div key={movie.id}>
      <Trend {...movie} onBookmark={() => handleBookmarkClick(movie)} onDropbook={()=>filterBook(movie)} isBookmark={bookmarkedMovies.some(m => m.id === movie.id)}  hanleClick={()=>getData(movie)}/>
    </div>
  ))}
    </div></div>

<div>
<h1 className='md:text-4xl text-center text-2xl  ml-[-50px] md:text-left md:pl-45 bg-gray-900  text-white w-full h-17 pt-14'>Recommended for you </h1>
<div className=' text-blue-600 justify-center flex-row gap-4 pl-10  flex-wrap flex overflow-y-auto w-screen pt-10 mx-auto items-center whitespace-nowrap no-scrollbar'>
{move.map((movie)=>(<div ><Tree {...movie} key={movie.id} onBookmark={() => handleBookmarkClick(movie)} onDropbook={()=>filterBook(movie)} isBookmark={bookmarkedMovies.some(m => m.id === movie.id)} hanleClick={()=>getData(movie)}/></div>))}
    </div>
</div>    
    </div>
   
    </BookmarkArrayProvider>
    </>
  )
}

// id: movie.id,
//         movie_type: movie.media_type || 'movie',
//         title: movie.title,
//         overview: movie.overview,
//         poster_path: movie.poster_path,
//         release_date: movie.release_date,
//         movie_vote: movie.vote_average
export default Home

const Trend =(prop)=>{
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
  <div onClick={prop.hanleClick} >
  <div className="relative w-75 md:w-120  h-48 md:h-68 text-white overflow-hidden shadow-lg group bg-gray-900 p-4 flex flex-col justify-between " >
  <img className=" w-75 md:w-110 rounded-xl h-78  object-cover  group-hover:scale-105 transition-transform duration-300 ease-in-out" src={`https://image.tmdb.org/t/p/w500/${prop.poster_path}`} alt={prop.title} />
<button className={`absolute top-6 right-8 bg-gray-800 bg-opacity-60 p-2 rounded-full text-white hover:bg-opacity-80 transition ${clicked ? 'bg-red-700' : 'bg-gray-800 bg-opacity-60 hover:bg-opacity-80'} `} onClick={(e) => { e.stopPropagation(); e.preventDefault; handleClick(); }}><IoBookmarkSharp size={18}/></button>
<div className="flex items-left  pl-10 text-sm md:mt-[-130px] mt-[-0px] gap-4 opacity-95">
  <h4>{prop.release_date.slice(0,4)}</h4>
  <h5 className="text-sm font-semibold leading-tight truncate">{prop.movie_vote}</h5>
<p className='flex text-sm'><MdLocalMovies className='mt-1'/>{prop.movie_type}</p>
<p>PG</p>
</div>
<h1 className="text-2xl text-white  font-semibold leading-tight truncate flex items-left  pl-10">{prop.title}</h1>
</div>
  </div>

  </>
)
}
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
  <div onClick={prop.hanleClick} >
  
  <div className="relative w-90   h-98 md:h-83 text-white overflow-hidden group bg-gray-900 p-4 flex flex-col justify-between gap-4 ">
  <img className=" w-90  rounded-xl h-68  object-cover  group-hover:scale-105 transition-transform duration-300 ease-in-out" src={`https://image.tmdb.org/t/p/w500/${prop.backdrop_path || prop.poster_path}`} alt={prop.title} />
<div className={`absolute top-6 right-10 bg-gray-800 bg-opacity-60 p-2 rounded-full text-white hover:bg-opacity-80 transition ${clicked ? 'bg-red-700' : 'bg-gray-800 bg-opacity-60 hover:bg-opacity-80'} `} onClick={(e) => { e.stopPropagation();e.preventDefault; handleClick(); }}><IoBookmarkSharp size={18}/></div>
<div>
  <div className="flex items-left  pl-5 text-sm  mt-[-0px] gap-4 opacity-95">
  <h4>{prop.first_air_date.slice(0,4)}</h4>
  <h5 className="text-sm font-semibold leading-tight truncate">{prop.movie_vote}</h5>
<p className='flex text-sm'><MdLocalMovies className='mt-1'/>{prop.movie_type}</p>
<p>PG</p>
</div>
<h1 className="text-2xl text-white  font-semibold leading-tight truncate flex items-left  pl-5">{prop.name.slice(0,23)}</h1>

  </div>
  </div>
  </div>

  </>
)
}
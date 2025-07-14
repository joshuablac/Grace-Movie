import React, { useEffect, useState } from 'react';
import { MdLocalMovies } from "react-icons/md";
import { IoBookmarkSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { db } from './firebase';
import { doc, setDoc, getDoc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';

const About = () => {
  const [movies, setMovies] = useState([]);
  const [fullDetails, setDetails] = useState([]);
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
console.log(fullDetails)
  const handleBookmarkClick = async (movie) => {
    setBookmarkedMovies(prev => {
      const isAlreadyAdded = prev.some(m => m.id === movie.id);
      if (isAlreadyAdded) return prev;
      const updated = [...prev, movie];
      const books = async () => {
        const savebook = doc(db, 'moviseBook', "100");
        await setDoc(savebook, { details: updated });
      };
      books();
      return updated;
    });
  };

  const filterBook = async (movie) => {
    const savebook = doc(db, "moviseBook", "100");
    const snap = await getDoc(savebook);
    const existingBookmarks = snap.exists() ? snap.data().details || [] : [];
    const isAlreadyBookmarked = existingBookmarks.some(m => m.id === movie.id);

    if (isAlreadyBookmarked) {
      await updateDoc(savebook, {
        details: arrayRemove(movie)
      });
      setBookmarkedMovies(prev => prev.filter(m => m.id !== movie.id));
    } else {
      await setDoc(savebook, {
        details: arrayUnion(movie)
      }, { merge: true });
      setBookmarkedMovies(prev => [...prev, movie]);
    }
  };

  const getData = async (movie) => {
    setDetails([movie]);
    window.location.href = './project'
    await setDoc(doc(db, 'accomodations', '10'), { details: movie });
  };

  const functiondata = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjA4OTUxYmI3ZjI5OTYwZGUzNThmYzBiODZjNWU2NyIsIm5iZiI6MTc1MTYzMTY1NS44MzAwMDAyLCJzdWIiOiI2ODY3YzcyNzA2YjgyNzQ2NmU1M2I4YTIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.7dHa7DBREfgiJkB7wiCYLMDJFv2LBXLDcYMBtpaQyBA'
      }
    };

    let totalPages = 5;
    const fetchPromises = [];

    for (let i = 1; i <= totalPages; i++) {
      const url = `https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&page=${i}&include_adult=false`;
      fetchPromises.push(fetch(url, options).then(res => res.json()));
    }

    const forbiddenGenres = [27, 53, 80, 9648, 99, 10764, 10766, 10749];
    const blacklist = ['sex', 'erotic', 'evil', 'lust', 'sin', 'sinners', 'horror', 'curse', 'thriller', 'demon', 'witch', 'kill', 'murder', 'love', 'romance', 'romantic', 'affair', 'affairs', 'mistress'];

    const responses = await Promise.all(fetchPromises);

    const allMovies = responses.flatMap(res => res.results)
      .filter(movie =>
        !movie.genre_ids?.some(id => forbiddenGenres.includes(id)) &&
        !blacklist.some(word =>
          (movie.title || '').toLowerCase().includes(word) ||
          (movie.original_title || '').toLowerCase().includes(word) ||
          (movie.overview || '').toLowerCase().includes(word)
        )
      );

    try {
      const movieRef = doc(db, "moviesAbout", "20");
      await setDoc(movieRef, { allMovies });
    } catch (error) {
      console.error("Error storing recommendations:", error);
    }
  };

  const movieRecommendation = async () => {
    const moviedot = doc(db, "moviesAbout", "20");
    const snapshot = await getDoc(moviedot);
    if (snapshot.exists()) {
      const data = snapshot.data();
      setMovies(data.allMovies);
    }
  };

  useEffect(() => {
    functiondata();
    movieRecommendation();
  }, []);

  return (
    <>
      <div className='bg-gray-900 z-0 min-h-screen w-screen overflow-hidden'>
        <h1 className='md:text-4xl text-2xl pl-15 md:pl-27 bg-gray-900 text-white w-full h-17 pt-14'>MOVIES</h1>
        <div className='text-blue-600 justify-center flex-row gap-5 md:pl-10 flex-wrap flex overflow-y-auto w-screen pt-10 mx-auto items-center whitespace-nowrap no-scrollbar'>
          {movies.map((movie) => (
            <div key={movie.id}>
              <Tree
                {...movie}
                onBookmark={() => handleBookmarkClick(movie)}
                onDropbook={() => filterBook(movie)}
                isBookmark={bookmarkedMovies.some(m => m.id === movie.id)}
                hanleClick={() => getData(movie)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default About;

const Tree = (prop) => {
  const [clicked, setClick] = useState(false);

  const handleClick = () => {
    if (!clicked) {
      prop.onBookmark();
    } else {
      prop.onDropbook();
    }
    setClick(!clicked);
  };

  return (
    <>
      <div onClick={prop.hanleClick}>
        <div className="relative w-90 h-98 md:h-98 text-white overflow-hidden group bg-gray-900 p-4 flex flex-col justify-between">
          <img className="w-93 rounded-xl h-68 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
            src={`https://image.tmdb.org/t/p/w500/${prop.backdrop_path||prop.poster_path}`} alt={prop.title} />
          <button className={`absolute top-6 right-8 bg-gray-800 bg-opacity-60 p-2 rounded-full text-white hover:bg-opacity-80 transition ${clicked ? 'bg-red-700' : 'bg-gray-800 bg-opacity-60 hover:bg-opacity-80'}`}
            onClick={(e) => { e.stopPropagation(); handleClick(); }}>
            <IoBookmarkSharp size={18} />
          </button>
          <div className="flex items-left pl-10 text-sm gap-4 opacity-95">
            <h4>{prop.release_date?.slice(0, 4)}</h4>
            <h5 className="text-sm font-semibold leading-tight truncate">{prop.original_language}</h5>
            <p className='flex text-sm gap-3'><MdLocalMovies className='mt-1' />{prop.popularity}</p>
            <p>Movie</p>
          </div>
          <h1 className="text-2xl text-white font-semibold leading-tight truncate flex items-left pl-10">
            {prop.title?.slice(0, 25)}
          </h1>
        </div>
      </div>
    </>
  );
};

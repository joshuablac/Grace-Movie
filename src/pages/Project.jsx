import React, { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { MdLocalMovies } from "react-icons/md";
import { PiPlayFill } from "react-icons/pi";
import { db } from '../firebase';

const Project = () => {
  const [move, setMove] = useState([]);
  const userUid = localStorage.getItem('myUserId');

  const movieRecommendation = async () => {
    if (!userUid) return;
    const moviedot = doc(db, 'accomodations', userUid);
    const snapshot = await getDoc(moviedot);

    if (snapshot.exists()) {
      const data = snapshot.data();
      console.log("Full Data:", data);
      setMove([data.details]);
    } else {
      console.log("Document not found");
      setMove([]);
    }
  };

  useEffect(() => {
    movieRecommendation();
  }, [userUid]); // Only run when userUid changes.

  return (
    <div className='bg-gray-900 z-0 min-h-screen w-screen overflow-hidden'>
      {move.map((movie) => (
        <div key={movie.id}><Tree {...movie} /></div>
      ))}
    </div>
  );
};

export default Project;

const Tree = (prop) => {
  const openYouTubeTrailer = () => {
    const movie = prop.title || prop.original_title;
    const search = encodeURIComponent(`${movie} trailer`);
    window.open(`https://www.youtube.com/results?search_query=${search}`, '_blank');
  };

  return (
    <div className="relative w-full min-h-screen bg-gray-900 text-white overflow-hidden">
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/original/${prop.backdrop_path || prop.poster_path}`}
          alt={prop.title}
          className="w-full h-full object-cover object-center filter brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
      </div>

      <div className="px-8 md:px-20 py-10 flex flex-col gap-9 max-w-4xl mx-auto">
        <div className="flex gap-9 md:gap-7 justify-center items-center text-center mx-auto w-full px-4">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-wide text-white">
            {prop.title || prop.original_title || prop.original_name}
          </h1>
          <div
            className="text-black cursor-pointer md:w-70 hover:text-red-700 bg-white flex gap-1 sm:gap-3 sm:w-auto h-12 mt-3 text-center justify-center items-center rounded-full px-2"
            onClick={openYouTubeTrailer}
          >
            <PiPlayFill className="hover:text-blue-400 transition-transform transform hover:scale-110" size={28} />
            <p className="sm:text-[17px] font-semibold">Play trailer</p>
          </div>
        </div>

        <div className="flex gap-6 text-sm text-gray-300 items-center">
          <span className="bg-gray-800 px-3 py-1 rounded-full text-xs">
            {prop.release_date ? prop.release_date.slice(0, 4) : 'N/A'}
          </span>
          <span className="bg-gray-800 px-3 py-1 rounded-full text-xs">{prop.movie_vote ?? 'NR'}</span>
          <span className="flex items-center bg-gray-800 px-3 py-1 rounded-full text-xs">
            <MdLocalMovies className="mr-1" /> {prop.movie_type || 'Movie'}
          </span>
        </div>

        <p className="text-gray-300 text-base leading-relaxed max-w-3xl">
          {prop.overview || "No description available."}
        </p>
      </div>
    </div>
  );
};

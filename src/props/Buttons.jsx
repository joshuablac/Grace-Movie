import React from 'react';
import { FaSearch } from "react-icons/fa";
const Buttons = () => {
  return (
    <>
    <div className='bg-gray-900 flex gap-5 pl-4 w-full md:justify-start md:pl-42 pb-2 md:items-left justify-start items-left text-left md:text-left md:pt-7   pt-6  '>
      <FaSearch className='sm:text-[24px] text-white border-none mt-2 ml-4'/>
      <input type="text" name="search" id="" className='sm:text-2xl text-[12px] fl text-gray-200 sm:w-100 w-40 border-none h-10' placeholder='Search for movies or TV series '  />
    </div>
    </>
  )
}
export default Buttons
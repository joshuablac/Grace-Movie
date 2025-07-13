import React, { createContext, useContext } from 'react';

// Create context
const BookmarkArrayContext = createContext();

// Provider (it only provides the value you pass to it)
export const BookmarkArrayProvider = ({ children, value }) => (
  <BookmarkArrayContext.Provider value={value}>
    {children}
  </BookmarkArrayContext.Provider>
);

// Hook to use the array anywhere
export const useBookmarkArray = () => useContext(BookmarkArrayContext);
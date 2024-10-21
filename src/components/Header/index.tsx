'use client'

import React, { useState, useEffect, useCallback } from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import SearchBar from "./SearchBar";
import { debounce } from "@/utils/debounce";

const Header: React.FC = () => {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const toggleSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

  const debouncedSetSearchTerm = useCallback(
    debounce((term: string) => {
      setDebouncedSearchTerm(term);
    }, 300),
    []
  );

  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
    debouncedSetSearchTerm(term);
  };

  useEffect(() => {
    console.log('Término de búsqueda (debounced):', debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <header className="bg-background h-[70px] border-b border-gray-200 fixed left-0 top-0 w-full z-50">
      <div className="w-full bg-background left-0 top-0 mx-auto h-full border-b relative z-20">
        <div className="container mx-auto h-full flex items-center justify-between">
          <Logo />
          <Navigation onSearchClick={toggleSearchBar} />
        </div>
      </div>
      <div className={`absolute h-full ${isSearchBarVisible ? 'top-[100%]' : 'top-0'} left-0 bg-background border-t border-b border-gray-200 w-full shadow-md z-10 transition-all duration-300`}>
        <SearchBar 
          onClose={toggleSearchBar} 
          searchTerm={searchTerm}
          setSearchTerm={handleSearchTermChange}
        />
      </div>
    </header>
  );
};

export default Header;
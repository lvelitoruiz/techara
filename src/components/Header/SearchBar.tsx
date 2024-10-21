'use client'

import React from 'react';
import LinearIcon from '../LinearIcon';
import InputComponent from '../FormItems/InputComponent';

interface SearchBarProps {
  onClose: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose, searchTerm, setSearchTerm }) => {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Realizando búsqueda con:', searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className='h-full w-full'>
      <div className='flex container mx-auto px-2 h-full justify-between items-center'>
        <LinearIcon name='magnifier' className='h-full px-2 w-10 flex items-center' size={24} color='currentColor' />
        <div className='w-[calc(100%-80px)]'>
          <InputComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <button type="button" onClick={onClose}>
          <LinearIcon name='cross' className='h-full px-2 w-10 flex items-center' size={24} color='currentColor' />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
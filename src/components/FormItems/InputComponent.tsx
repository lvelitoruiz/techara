import React from "react";

interface InputComponentProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const InputComponent: React.FC<InputComponentProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Buscar productos..."
      className="w-full bg-background px-4 h-full py-2 flex items-center border-none outline-none text-xl font-thin uppercase tracking-widest"
    />
  );
};

export default InputComponent;
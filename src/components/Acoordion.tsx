import React, { useState } from 'react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen, onClick }) => {
  return (
    <div className="border-b border-[#d1d1cd]">
      <button
        className="w-full flex items-center justify-between py-4 transition-colors"
        onClick={onClick}
      >
        <span className="uppercase font-light text-xs">{title}</span>
        <span 
          className={`lnr lnr-chevron-down transition-transform duration-200 text-sm ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-96 pb-4' : 'max-h-0'
        }`}
      >
        <div className='font-light text-sm'>{children}</div>
      </div>
    </div>
  );
};

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());

  const toggleItem = (index: number): void => {
    setOpenIndexes(prev => {
      const newIndexes = new Set(prev);
      if (newIndexes.has(index)) {
        newIndexes.delete(index);
      } else {
        newIndexes.add(index);
      }
      return newIndexes;
    });
  };

  return (
    <div className="border-t border-[#d1d1cd]">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          isOpen={openIndexes.has(index)}
          onClick={() => toggleItem(index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;
'use client';

import React, { useEffect } from 'react';
import LinearIcon from '../LinearIcon';

interface CartNotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
}

const CartNotification: React.FC<CartNotificationProps> = ({ 
  message, 
  type, 
  isVisible, 
  onClose 
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const bgColor = {
    success: 'bg-[#7e807c]',
    error: 'bg-[#F5222D]',
    info: 'bg-[#7e807c]'
  }[type];

  const textColor = {
    success: 'text-white',
    error: 'text-white',
    info: 'text-white'
  }[type];

  return (
    <div className={`fixed top-20 right-4 z-50 ${bgColor} p-4 rounded-sm shadow-lg max-w-sm`}>
      <div className="flex items-center gap-2">
        <span className={`${textColor} text-sm tracking-widest`}>{message}</span>
        <button onClick={onClose} className="ml-2 text-white">
          <LinearIcon className='text-white' name="cross" size={16} />
        </button>
      </div>
    </div>
  );
};

export default CartNotification;
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
    success: 'bg-[#f1f2ee]',
    error: 'bg-red-50',
    info: 'bg-blue-50'
  }[type];

  const textColor = {
    success: 'text-[#1a1311]',
    error: 'text-red-800',
    info: 'text-blue-800'
  }[type];

  return (
    <div className={`fixed top-20 right-4 z-50 ${bgColor} border border-[#d1d1cd] p-4 rounded-sm shadow-lg max-w-sm`}>
      <div className="flex items-center gap-2">
        <span className={`${textColor} text-sm tracking-widest`}>{message}</span>
        <button onClick={onClose} className="ml-2">
          <LinearIcon name="cross" size={16} />
        </button>
      </div>
    </div>
  );
};

export default CartNotification;
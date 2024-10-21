import React from 'react';

interface LinearIconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

const LinearIcon: React.FC<LinearIconProps> = ({ name, size = 24, color = 'currentColor', className = '' }) => {
  return (
    <i 
      className={`lnr lnr-${name} ${className}`}
      style={{ 
        fontSize: `${size}px`, 
        color,
        display: 'flex',
        lineHeight: 1,
      }}
    />
  );
};

export default LinearIcon;
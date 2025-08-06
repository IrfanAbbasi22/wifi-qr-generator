import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10 sm:w-12 sm:h-12',
    lg: 'w-12 h-12 sm:w-16 sm:h-16'
  };

  const textSizes = {
    sm: 'text-xs sm:text-sm',
    md: 'text-sm sm:text-base',
    lg: 'text-base sm:text-lg'
  };

  return (
    <div className="flex items-center space-x-2 sm:space-x-3">
      <div className={`${sizeClasses[size]} glass rounded-lg sm:rounded-xl p-1.5 sm:p-2 glow-hover flex items-center justify-center`}>
        <svg
          viewBox="0 0 24 24"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Wi-Fi arcs */}
          <path
            d="M12 3C7.95 3 4.21 4.34 1.2 6.6L3 9C5.5 7.12 8.62 6 12 6C15.38 6 18.5 7.12 21 9L22.8 6.6C19.79 4.34 16.05 3 12 3Z"
            fill="white"
            opacity="0.8"
          />
          <path
            d="M12 9C9.66 9 7.46 9.78 5.65 11.2L7.5 13.5C8.8 12.4 10.35 11.8 12 11.8C13.65 11.8 15.2 12.4 16.5 13.5L18.35 11.2C16.54 9.78 14.34 9 12 9Z"
            fill="white"
            opacity="0.6"
          />
          <path
            d="M12 15C10.9 15 9.9 15.3 9.1 15.9L12 19L14.9 15.9C14.1 15.3 13.1 15 12 15Z"
            fill="white"
            opacity="0.4"
          />
          
          {/* QR code pattern */}
          <rect x="16" y="16" width="2" height="2" fill="white" opacity="0.8" />
          <rect x="19" y="16" width="2" height="2" fill="white" opacity="0.8" />
          <rect x="16" y="19" width="2" height="2" fill="white" opacity="0.8" />
          <rect x="19" y="19" width="2" height="2" fill="white" opacity="0.8" />
          
          <rect x="16" y="22" width="2" height="2" fill="white" opacity="0.6" />
          <rect x="19" y="22" width="2" height="2" fill="white" opacity="0.6" />
          <rect x="22" y="16" width="2" height="2" fill="white" opacity="0.6" />
          <rect x="22" y="19" width="2" height="2" fill="white" opacity="0.6" />
          <rect x="22" y="22" width="2" height="2" fill="white" opacity="0.6" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className={`font-bold text-white ${textSizes[size]}`}>
          Wi-Fi QR
        </span>
        <span className={`text-gray-300 ${textSizes[size]}`} style={{ fontSize: '0.7em' }}>
          Generator
        </span>
      </div>
    </div>
  );
};

export default Logo; 
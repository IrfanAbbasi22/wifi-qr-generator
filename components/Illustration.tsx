import React from 'react';

const Illustration: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[400px] sm:min-h-[500px] glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 glow-strong">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl">
        <div className="absolute top-4 left-4 w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full blur-lg animate-float"></div>
        <div className="absolute bottom-4 right-4 w-12 h-12 sm:w-16 sm:h-16 bg-white/8 rounded-full blur-lg animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-8 h-8 sm:w-12 sm:h-12 bg-white/6 rounded-full blur-md animate-pulse-glow"></div>
      </div>

      {/* Main illustration content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center space-y-6 sm:space-y-8">
          {/* Smartphone */}
          <div className="relative mx-auto">
            <div className="w-48 h-80 sm:w-56 sm:h-88 bg-black/80 border-2 border-white/20 rounded-3xl sm:rounded-4xl glass relative overflow-hidden">
              {/* Screen */}
              <div className="absolute inset-2 sm:inset-3 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl sm:rounded-3xl">
                {/* QR Code on screen */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-lg sm:rounded-xl p-2 sm:p-3">
                  <div className="w-full h-full grid grid-cols-4 gap-0.5">
                    <div className="bg-black rounded-sm"></div>
                    <div className="bg-black rounded-sm"></div>
                    <div className="bg-black rounded-sm"></div>
                    <div className="bg-black rounded-sm"></div>
                    <div className="bg-black rounded-sm"></div>
                    <div className="bg-transparent rounded-sm"></div>
                    <div className="bg-transparent rounded-sm"></div>
                    <div className="bg-black rounded-sm"></div>
                    <div className="bg-black rounded-sm"></div>
                    <div className="bg-transparent rounded-sm"></div>
                    <div className="bg-transparent rounded-sm"></div>
                    <div className="bg-black rounded-sm"></div>
                    <div className="bg-black rounded-sm"></div>
                    <div className="bg-black rounded-sm"></div>
                    <div className="bg-black rounded-sm"></div>
                    <div className="bg-black rounded-sm"></div>
                  </div>
                </div>
                
                {/* Wi-Fi icon */}
                <div className="absolute top-4 left-4 w-8 h-8 sm:w-10 sm:h-10 glass rounded-lg sm:rounded-xl flex items-center justify-center">
                  <div className="w-4 h-4 sm:w-5 sm:h-5">
                    <div className="w-full h-full border-2 border-white rounded-full opacity-60"></div>
                    <div className="absolute top-1 left-1 w-2 h-2 border-2 border-white rounded-full opacity-80"></div>
                    <div className="absolute top-1.5 left-1.5 w-1 h-1 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Connection lines */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-40 sm:h-40">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <path
                  d="M50 50 Q70 30 90 50"
                  stroke="url(#connectionGradient)"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.6"
                />
                <path
                  d="M50 50 Q70 70 90 50"
                  stroke="url(#connectionGradient)"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.4"
                />
              </svg>
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute top-8 right-8 text-white/80 text-xs sm:text-sm font-medium">
            Connected
          </div>
          <div className="absolute bottom-8 left-8 text-white/60 text-xs sm:text-sm font-medium">
            Secure
          </div>
        </div>
      </div>
    </div>
  );
};

export default Illustration; 
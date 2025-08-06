'use client';

import { useEffect } from 'react';
import Logo from '@/components/Logo';
import WifiQRGenerator from '@/components/WifiQRGenerator';
import Illustration from '@/components/Illustration';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Home() {
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { elementRef: generatorRef, isVisible: generatorVisible } = useScrollAnimation();
  const { elementRef: aboutRef, isVisible: aboutVisible } = useScrollAnimation();

  useEffect(() => {
    // Handle stagger animations for grid items with improved timing
    const staggerItems = document.querySelectorAll('.stagger-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 150); // Increased delay for smoother effect
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px', // Increased margin for earlier triggering
    });

    staggerItems.forEach(item => observer.observe(item));

    return () => {
      staggerItems.forEach(item => observer.unobserve(item));
    };
  }, []);

  return (
    <main className="min-h-screen">
      {/* Header with enhanced blur and responsive design */}
      <header className="glass-strong backdrop-blur-sm border-b border-white/10 sticky top-0 z-50 blur-layer-2">
        <div className="container-responsive py-4">
          <div className="flex items-center justify-between">
            <Logo size="md" />
            <nav className="flex items-center space-x-4">
              <a 
                href="#generator" 
                className="text-white hover:text-gray-300 font-medium transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                Generator
              </a>
              <a 
                href="#about" 
                className="text-gray-300 hover:text-white font-medium transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                About
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section with enhanced effects and responsive design */}
      <section className="padding-responsive px-4 sm:px-6">
        <div className="container-responsive">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Hero Content */}
            <div 
              ref={heroRef}
              className={`space-y-6 lg:space-y-8 section-fade-in ${heroVisible ? 'visible' : ''}`}
            >
              <div className="space-y-4">
                <h1 className="heading-responsive font-bold gradient-text leading-tight">
                  Share Your
                  <span className="text-gray-300 block">Wi-Fi Instantly</span>
                </h1>
                <p className="text-responsive text-gray-300 leading-relaxed">
                  Generate QR codes for your Wi-Fi network and let guests connect with just a scan. 
                  No more typing passwords or sharing network details manually.
                </p>
              </div>
              
              <div className="mobile-stack gap-4">
                <a 
                  href="#generator"
                  className="glass-dark hover:bg-white/20 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all duration-300 text-center glow-strong hover-lift blur-layer-1 mobile-first"
                >
                  Get Started
                </a>
                <button className="glass-strong border border-white/20 hover:border-white/40 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all duration-300 glow-strong hover-lift blur-layer-1 mobile-first">
                  Learn More
                </button>
              </div>

              {/* Features with enhanced glass and responsive grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 lg:pt-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3 stagger-item">
                  <div className="w-8 h-8 glass-strong rounded-lg flex items-center justify-center glow-strong hover-lift blur-layer-1">
                    <span className="text-white text-lg">⚡</span>
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-300 text-center sm:text-left">Instant Connection</span>
                </div>
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3 stagger-item">
                  <div className="w-8 h-8 glass-strong rounded-lg flex items-center justify-center glow-strong hover-lift blur-layer-1">
                    <span className="text-white text-lg">🔒</span>
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-300 text-center sm:text-left">Secure Sharing</span>
                </div>
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3 stagger-item">
                  <div className="w-8 h-8 glass-strong rounded-lg flex items-center justify-center glow-strong hover-lift blur-layer-1">
                    <span className="text-white text-lg">📱</span>
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-300 text-center sm:text-left">Mobile Friendly</span>
                </div>
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3 stagger-item">
                  <div className="w-8 h-8 glass-strong rounded-lg flex items-center justify-center glow-strong hover-lift blur-layer-1">
                    <span className="text-white text-lg">🎨</span>
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-300 text-center sm:text-left">Customizable</span>
                </div>
              </div>
            </div>

            {/* Illustration - hidden on mobile for better performance */}
            <div className="hidden lg:block stagger-item">
              <Illustration />
            </div>
          </div>
        </div>
      </section>

      {/* Generator Section */}
      <section id="generator" className="padding-responsive">
        <div className="container-responsive">
          <div 
            ref={generatorRef}
            className={`text-center mb-8 lg:mb-12 section-fade-in ${generatorVisible ? 'visible' : ''}`}
          >
            <h2 className="heading-responsive font-bold gradient-text mb-4">
              Wi-Fi QR Code Generator
            </h2>
            <p className="text-responsive text-gray-300 max-w-2xl mx-auto">
              Enter your Wi-Fi network details below and generate a QR code that anyone can scan to connect instantly.
            </p>
          </div>
          
          <WifiQRGenerator />
        </div>
      </section>

      {/* How It Works Section with enhanced effects and responsive design */}
      <section id="about" className="padding-responsive">
        <div className="container-responsive">
          <div 
            ref={aboutRef}
            className={`text-center mb-8 lg:mb-12 section-fade-in ${aboutVisible ? 'visible' : ''}`}
          >
            <h2 className="heading-responsive font-bold gradient-text mb-4">
              How It Works
            </h2>
            <p className="text-responsive text-gray-300 max-w-2xl mx-auto">
              Our Wi-Fi QR generator creates standardized QR codes that work with any smartphone camera.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center space-y-4 stagger-item hover-lift">
              <div className="w-12 h-12 sm:w-16 sm:h-16 glass-strong rounded-full flex items-center justify-center mx-auto glow-strong blur-layer-1">
                <span className="text-xl sm:text-2xl">📝</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white">1. Enter Details</h3>
              <p className="text-sm sm:text-base text-gray-300">
                Input your Wi-Fi network name, password, and encryption type. We support WPA, WEP, and open networks.
              </p>
            </div>

            <div className="text-center space-y-4 stagger-item hover-lift">
              <div className="w-12 h-12 sm:w-16 sm:h-16 glass-strong rounded-full flex items-center justify-center mx-auto glow-strong blur-layer-1">
                <span className="text-xl sm:text-2xl">🎯</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white">2. Generate QR Code</h3>
              <p className="text-sm sm:text-base text-gray-300">
                Our tool creates a standardized Wi-Fi QR code that follows the WIFI:T: format specification.
              </p>
            </div>

            <div className="text-center space-y-4 stagger-item hover-lift md:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 glass-strong rounded-full flex items-center justify-center mx-auto glow-strong blur-layer-1">
                <span className="text-xl sm:text-2xl">📱</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white">3. Scan & Connect</h3>
              <p className="text-sm sm:text-base text-gray-300">
                Anyone can scan the QR code with their smartphone camera to automatically connect to your network.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with enhanced glass and responsive design */}
      <footer className="glass-dark border-t border-white/10 py-8 lg:py-12 blur-layer-2">
        <div className="container-responsive">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="space-y-4 stagger-item">
              <Logo size="sm" />
              <p className="text-gray-400 text-xs sm:text-sm">
                Generate QR codes for easy Wi-Fi network sharing. 
                Simple, secure, and works with any smartphone.
              </p>
            </div>

            <div className="stagger-item">
              <h4 className="font-semibold mb-4 text-white text-sm sm:text-base">Features</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
                <li>Wi-Fi QR Generation</li>
                <li>Multiple Encryption Types</li>
                <li>Hidden Network Support</li>
                <li>Download & Share</li>
              </ul>
            </div>

            <div className="stagger-item">
              <h4 className="font-semibold mb-4 text-white text-sm sm:text-base">Support</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
                <li>How to Use</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Contact Us</li>
              </ul>
            </div>

            <div className="stagger-item">
              <h4 className="font-semibold mb-4 text-white text-sm sm:text-base">Connect</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
                <li>GitHub</li>
                <li>Twitter</li>
                <li>LinkedIn</li>
                <li>Blog</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-6 lg:mt-8 pt-6 lg:pt-8 text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              © 2024 Wi-Fi QR Generator. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
} 
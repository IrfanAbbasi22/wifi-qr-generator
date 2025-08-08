'use client';

import React, { useState, useRef } from 'react';
import QRCode from 'qrcode';
import { Wifi, Download, Copy, Eye, EyeOff } from 'lucide-react';

interface WifiConfig {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

const WifiQRGenerator: React.FC = () => {
  const [wifiConfig, setWifiConfig] = useState<WifiConfig>({
    ssid: '',
    password: '',
    encryption: 'WPA',
    hidden: false
  });
  
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const generateWifiString = (config: WifiConfig): string => {
    const { ssid, password, encryption, hidden } = config;
    const hiddenParam = hidden ? 'H:true;' : '';
    return `WIFI:T:${encryption};S:${ssid};P:${password};${hiddenParam};`;
  };

  const generateQRCode = async () => {
    if (!wifiConfig.ssid) {
      alert('Please enter a network name (SSID)');
      return;
    }

    setIsGenerating(true);
    try {
      const wifiString = generateWifiString(wifiConfig);
      const dataUrl = await QRCode.toDataURL(wifiString, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });
      setQrCodeDataUrl(dataUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
      alert('Error generating QR code. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeDataUrl) return;
    
    const link = document.createElement('a');
    link.download = `wifi-${wifiConfig.ssid}-qr.png`;
    link.href = qrCodeDataUrl;
    link.click();
  };

  const copyToClipboard = async () => {
    if (!qrCodeDataUrl) return;
    
    try {
      const response = await fetch(qrCodeDataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': blob
        })
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  const handleInputChange = (field: keyof WifiConfig, value: string | boolean) => {
    setWifiConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden">
        {/* Enhanced gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/15 to-cyan-900/10 rounded-2xl sm:rounded-3xl"></div>
        
        {/* Main glass container with improved visibility */}
        <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl shadow-purple-500/20">
          {/* Header with enhanced styling */}
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-white/20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-500/30 to-blue-500/30 backdrop-blur-md rounded-lg sm:rounded-xl border border-white/20 shadow-lg shadow-purple-500/25">
                  <Wifi className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-lg" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent drop-shadow-sm">Wi-Fi QR Generator</h1>
                  <p className="text-gray-100 text-xs sm:text-sm drop-shadow-sm">Generate QR codes for easy network sharing</p>
                </div>
              </div>
            </div>
                     </div>
         </div>
 
         <div className="p-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Input Form with enhanced glass effects */}
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-4 drop-shadow-sm">Network Information</h2>
                
                {/* SSID Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white">
                    Network Name (SSID)
                  </label>
                  <input
                    type="text"
                    value={wifiConfig.ssid}
                    onChange={(e) => handleInputChange('ssid', e.target.value)}
                    placeholder="Enter your Wi-Fi network name"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/15 backdrop-blur-md border border-white/25 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 hover:bg-white/20 hover:border-white/40 transition-all duration-300 text-white placeholder-gray-200 text-sm sm:text-base shadow-lg shadow-black/20"
                  />
                </div>

                {/* Password Input */}
                <div className="space-y-2 mt-4">
                  <label className="block text-sm font-medium text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={wifiConfig.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Enter your Wi-Fi password"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 sm:pr-12 bg-white/15 backdrop-blur-md border border-white/25 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 hover:bg-white/20 hover:border-white/40 transition-all duration-300 text-white placeholder-gray-200 text-sm sm:text-base shadow-lg shadow-black/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-200 hover:text-white transition-colors drop-shadow-sm"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                    </button>
                  </div>
                </div>

                {/* Encryption Type */}
                <div className="space-y-2 mt-4">
                  <label className="block text-sm font-medium text-white">
                    Encryption Type
                  </label>
                  <select
                    value={wifiConfig.encryption}
                    onChange={(e) => handleInputChange('encryption', e.target.value as 'WPA' | 'WEP' | 'nopass')}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/15 backdrop-blur-md border border-white/25 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 hover:bg-white/20 hover:border-white/40 transition-all duration-300 text-white text-sm sm:text-base cursor-pointer shadow-lg shadow-black/20"
                  >
                    <option value="WPA" className="bg-gray-800 text-white">WPA/WPA2/WPA3</option>
                    <option value="WEP" className="bg-gray-800 text-white">WEP</option>
                    <option value="nopass" className="bg-gray-800 text-white">No Password</option>
                  </select>
                </div>

                {/* Hidden Network */}
                <div className="mt-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={wifiConfig.hidden}
                      onChange={(e) => handleInputChange('hidden', e.target.checked)}
                      className="w-4 h-4 text-white bg-white/15 backdrop-blur-md border border-white/25 rounded focus:ring-purple-400/50 hover:border-purple-400/50 transition-all duration-300 cursor-pointer shadow-sm"
                    />
                    <span className="text-sm text-white">Hidden Network</span>
                  </label>
                </div>

                {/* Generate Button with enhanced effects */}
                <button
                  onClick={generateQRCode}
                  disabled={isGenerating || !wifiConfig.ssid}
                  className="w-full mt-4 sm:mt-6 bg-gradient-to-r from-purple-600/30 to-blue-600/30 backdrop-blur-md border border-white/20 hover:from-purple-600/40 hover:to-blue-600/40 disabled:from-gray-700/30 disabled:to-gray-700/30 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/35 hover:scale-105 text-sm sm:text-base"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Wifi className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Generate QR Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* QR Code Display with enhanced glass */}
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent drop-shadow-sm">QR Code</h2>
              
                              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 flex items-center justify-center min-h-[250px] sm:min-h-[300px] shadow-xl shadow-black/30">
                {qrCodeDataUrl ? (
                  <div className="text-center space-y-4">
                                         <div ref={qrRef} className="inline-block p-3 sm:p-4 bg-white/20 backdrop-blur-xl border border-white/30 rounded-xl sm:rounded-2xl shadow-2xl shadow-purple-500/30">
                       <img
                         src={qrCodeDataUrl}
                         alt="Wi-Fi QR Code"
                         className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 drop-shadow-lg"
                       />
                     </div>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                                             <button
                         onClick={downloadQRCode}
                         className="flex items-center space-x-2 bg-gradient-to-r from-purple-600/30 to-blue-600/30 backdrop-blur-md border border-white/20 hover:from-purple-600/40 hover:to-blue-600/40 text-white px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/35 hover:scale-105 text-sm sm:text-base"
                       >
                         <Download className="w-4 h-4 drop-shadow-sm" />
                         <span>Download</span>
                       </button>
                       
                       <button
                         onClick={copyToClipboard}
                         className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl transition-all duration-300 text-sm sm:text-base ${
                           copied 
                             ? 'bg-gradient-to-r from-green-600/30 to-green-500/30 backdrop-blur-md border border-green-400/30 text-green-200 shadow-lg shadow-green-500/25' 
                             : 'bg-gradient-to-r from-purple-600/30 to-blue-600/30 backdrop-blur-md border border-white/20 hover:from-purple-600/40 hover:to-blue-600/40 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/35 hover:scale-105'
                         }`}
                       >
                         <Copy className="w-4 h-4 drop-shadow-sm" />
                         <span>{copied ? 'Copied!' : 'Copy'}</span>
                       </button>
                    </div>
                  </div>
                ) : (
                                                                               <div className="text-center text-gray-200">
                                 <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 bg-white/15 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-black/20">
                                   <Wifi className="w-8 h-8 sm:w-12 sm:h-12 text-gray-300 drop-shadow-sm" />
                                 </div>
                                 <p className="text-xs sm:text-sm drop-shadow-sm">Enter your Wi-Fi details and click "Generate QR Code"</p>
                               </div>
                )}
              </div>

                             {/* Instructions with enhanced glass */}
                                         <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 backdrop-blur-md border border-white/15 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg shadow-black/20">
                             <h3 className="font-semibold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-2 text-sm sm:text-base drop-shadow-sm">How to use:</h3>
                             <ul className="text-xs sm:text-sm text-gray-200 space-y-1 drop-shadow-sm">
                  <li>• Enter your Wi-Fi network name and password</li>
                  <li>• Select the correct encryption type</li>
                  <li>• Generate the QR code</li>
                  <li>• Scan with any smartphone camera to connect</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WifiQRGenerator; 
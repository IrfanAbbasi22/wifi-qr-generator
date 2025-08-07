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
          dark: '#ffffff',
          light: '#000000'
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
      <div className="glass-ultra rounded-2xl sm:rounded-3xl overflow-hidden glow-strong">
        {/* Header with enhanced blur */}
        <div className="glass-dark px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-white/10 blur-layer-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="p-2 sm:p-3 glass-strong rounded-lg sm:rounded-xl glow-strong">
                <Wifi className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold gradient-text">Wi-Fi QR Generator</h1>
                <p className="text-gray-300 text-xs sm:text-sm">Generate QR codes for easy network sharing</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Input Form with enhanced glass effects */}
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Network Information</h2>
                
                {/* SSID Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Network Name (SSID)
                  </label>
                  <input
                    type="text"
                    value={wifiConfig.ssid}
                    onChange={(e) => handleInputChange('ssid', e.target.value)}
                    placeholder="Enter your Wi-Fi network name"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 glass-strong rounded-lg sm:rounded-xl focus:ring-2 focus:ring-white/50 focus:border-white/50 hover:bg-white/10 hover:border-white/30 transition-all duration-300 text-white placeholder-gray-400 blur-layer-1 text-sm sm:text-base"
                  />
                </div>

                {/* Password Input */}
                <div className="space-y-2 mt-4">
                  <label className="block text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={wifiConfig.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Enter your Wi-Fi password"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 sm:pr-12 glass-strong rounded-lg sm:rounded-xl focus:ring-2 focus:ring-white/50 focus:border-white/50 hover:bg-white/10 hover:border-white/30 transition-all duration-300 text-white placeholder-gray-400 blur-layer-1 text-sm sm:text-base"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                    </button>
                  </div>
                </div>

                {/* Encryption Type */}
                <div className="space-y-2 mt-4">
                  <label className="block text-sm font-medium text-gray-300">
                    Encryption Type
                  </label>
                  <select
                    value={wifiConfig.encryption}
                    onChange={(e) => handleInputChange('encryption', e.target.value as 'WPA' | 'WEP' | 'nopass')}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 glass-strong rounded-lg sm:rounded-xl focus:ring-2 focus:ring-white/50 focus:border-white/50 hover:bg-white/10 hover:border-white/30 transition-all duration-300 text-white blur-layer-1 text-sm sm:text-base cursor-pointer"
                  >
                    <option value="WPA" className="bg-black text-white">WPA/WPA2/WPA3</option>
                    <option value="WEP" className="bg-black text-white">WEP</option>
                    <option value="nopass" className="bg-black text-white">No Password</option>
                  </select>
                </div>

                {/* Hidden Network */}
                <div className="mt-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={wifiConfig.hidden}
                      onChange={(e) => handleInputChange('hidden', e.target.checked)}
                      className="w-4 h-4 text-white glass-strong border-white/30 rounded focus:ring-white/50 hover:border-white/50 transition-all duration-300 cursor-pointer"
                    />
                    <span className="text-sm text-gray-300">Hidden Network</span>
                  </label>
                </div>

                {/* Generate Button with enhanced effects */}
                <button
                  onClick={generateQRCode}
                  disabled={isGenerating || !wifiConfig.ssid}
                  className="w-full mt-4 sm:mt-6 glass-dark hover:bg-white/20 disabled:bg-gray-800/50 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 glow-strong hover-lift blur-layer-2 text-sm sm:text-base"
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
              <h2 className="text-lg sm:text-xl font-semibold text-white">QR Code</h2>
              
              <div className="glass-strong rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 flex items-center justify-center min-h-[250px] sm:min-h-[300px] blur-layer-2">
                {qrCodeDataUrl ? (
                  <div className="text-center space-y-4">
                    <div ref={qrRef} className="inline-block p-3 sm:p-4 glass-ultra rounded-xl sm:rounded-2xl glow-strong">
                      <img
                        src={qrCodeDataUrl}
                        alt="Wi-Fi QR Code"
                        className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64"
                      />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                      <button
                        onClick={downloadQRCode}
                        className="flex items-center space-x-2 glass-dark hover:bg-white/20 text-white px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl transition-all duration-300 glow-strong hover-lift text-sm sm:text-base"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                      
                      <button
                        onClick={copyToClipboard}
                        className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl transition-all duration-300 text-sm sm:text-base ${
                          copied 
                            ? 'bg-green-600/20 text-green-300 glow-strong' 
                            : 'glass-dark hover:bg-white/20 text-white glow-strong hover-lift'
                        }`}
                      >
                        <Copy className="w-4 h-4" />
                        <span>{copied ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-400">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 glass-strong rounded-xl sm:rounded-2xl flex items-center justify-center">
                      <Wifi className="w-8 h-8 sm:w-12 sm:h-12 text-gray-500" />
                    </div>
                    <p className="text-xs sm:text-sm">Enter your Wi-Fi details and click "Generate QR Code"</p>
                  </div>
                )}
              </div>

              {/* Instructions with enhanced glass */}
              <div className="glass-dark border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 blur-layer-1">
                <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">How to use:</h3>
                <ul className="text-xs sm:text-sm text-gray-300 space-y-1">
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
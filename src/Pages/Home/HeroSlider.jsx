import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HeroSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  
  const slides = [
    {
      title: "Secure Your Tomorrow Today",
      subtitle: "AI-powered insurance solutions tailored to your life journey",
      icon: "🛡️"
    },
    {
      title: "Protect What Matters Most",
      subtitle: "Comprehensive coverage for your family's future security",
      icon: "❤️"
    },
    {
      title: "Smart Coverage, Simplified",
      subtitle: "Intelligent policies that adapt to your changing needs",
      icon: "💡"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full blur-[100px] opacity-40"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-200 rounded-full blur-[120px] opacity-30"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
        />
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-20 md:py-28 flex flex-col md:flex-row items-center relative z-10">
        {/* Text content */}
        <div className="md:w-1/2 mb-16 md:mb-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className=" px-4 text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Life Insurance
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Reimagined
              </span>
            </h1>
            
            <div className="h-24 md:h-32 overflow-hidden relative mb-6">
              {slides.map((slide, index) => (
                <motion.div
                  key={index}
                  className="absolute top-0 left-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: activeSlide === index ? 1 : 0,
                    y: activeSlide === index ? 0 : 20
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-start">
                    <span className="text-4xl mr-4 mt-1">{slide.icon}</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{slide.title}</h2>
                  </div>
                  <p className="text-lg md:text-xl text-gray-600 mt-4 ml-12 max-w-lg">{slide.subtitle}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4 mt-10 px-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center"
              >
                <span>Get a Free Quote</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-gray-800 font-bold rounded-xl border-2 border-gray-200 shadow-sm hover:shadow-md transition-all"
              >
                How It Works
              </motion.button>
            </div>
            
            <div className="flex items-center mt-12">
              <div className="flex -space-x-3 mr-6">
                {[1, 2, 3, 4].map((item) => (
                  <div 
                    key={item} 
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white shadow-md"
                  />
                ))}
              </div>
              <div>
                <p className="font-semibold text-gray-800">Trusted by 25,000+ families</p>
                <div className="flex items-center mt-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">4.9/5 (2,458 reviews)</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Card slider */}
        <div className="md:w-1/2 w-full relative">
          <div className="relative h-[500px] w-full max-w-md mx-auto">
            {slides.map((slide, index) => (
              <motion.div
                key={index}
                className={`absolute inset-0 bg-white rounded-2xl shadow-xl overflow-hidden border-8 border-white ${
                  index === activeSlide ? 'z-10' : 'z-0'
                }`}
                initial={{ 
                  opacity: 0, 
                  x: index > activeSlide ? 100 : -100,
                  scale: 0.9
                }}
                animate={{ 
                  opacity: index === activeSlide ? 1 : 0.6,
                  x: 0,
                  scale: index === activeSlide ? 1 : 0.9
                }}
                transition={{ duration: 0.7 }}
                style={{
                  transformOrigin: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => setActiveSlide(index)}
              >
                <div className="h-1/4 bg-gradient-to-r from-blue-500 to-purple-600 p-6 relative ">
                  <div className="absolute  top-6 right-6 bg-white/20 p-3 rounded-full">
                    <span className="text-2xl">{slide.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mt-4">{slide.title}</h3>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-700 mb-6">{slide.subtitle}</p>
                  
                  <div className="flex items-center mb-6">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-gray-600">Instant approval</span>
                  </div>
                  
                  <div className="flex items-center mb-6">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-gray-600">Adjustable coverage</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-gray-600">24/7 support</span>
                  </div>
                  
                  <div className="mt-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Estimated monthly</span>
                      <span className="text-sm font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded">SAVE 15%</span>
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-gray-900">$42</span>
                      <span className="text-gray-500 ml-2">/ month</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Navigation dots */}
          <div className="flex justify-center mt-8 space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeSlide === index 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Animated floating elements */}
      <motion.div
        className="absolute bottom-20 left-10 w-8 h-8 rounded-full bg-blue-500/20 backdrop-blur-md"
        animate={{
          y: [0, -30, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
      />
      
      <motion.div
        className="absolute top-32 right-20 w-6 h-6 rounded-full bg-purple-500/20 backdrop-blur-md"
        animate={{
          y: [0, -40, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
        }}
      />
    </div>
  );
};

export default HeroSlider;
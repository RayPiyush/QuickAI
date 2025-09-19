import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets.js';

const Hero = () => {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className='px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center
    bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen'>

      {/* Hero text */}
      <div className='text-center mb-6'>
        <h1 className='text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2]'>
          Create amazing content <br /> with <span className='text-primary'>AI tools</span>
        </h1>
        <p className='mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600'>
          Transform your content creation with our suite of premium AI tools.
          Write articles, generate images, and enhance your workflow.
        </p>
      </div>

      {/* Buttons */}
      <div className='flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs'>
        <button
          onClick={() => navigate('/ai')}
          className='bg-primary text-white px-10 py-3 rounded-lg hover:scale-102 active:scale-95 transition cursor-pointer'
        >
          Start creating now
        </button>
        <button
          onClick={() => setShowVideo(true)}
          className='bg-white px-10 py-3 rounded-lg border border-gray-300 hover:scale-102 active:scale-95 transition cursor-pointer'
        >
          Watch demo
        </button>
      </div>

      {/* Trusted text */}
      <div className='flex items-center gap-4 mt-8 mx-auto text-gray-600'>
        <img src={assets.user_group} alt="" className='h-8' />Trusted by 10k+ People
      </div>

      {/* Video Player */}
        {showVideo && (
    <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="relative w-[90%] md:w-3/4 lg:w-2/3 xl:w-1/2">
        {/* Close button */}
        <button
            onClick={() => setShowVideo(false)}
            className="absolute -top-6 -right-6 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-200"
        >
            ✕
        </button>

        {/* YouTube Embed */}
        <iframe
            width="100%"
            className="rounded-lg shadow-lg
            h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh]"
            src="https://www.youtube.com/embed/nYuU50p28h4"
            title="Demo video"
            frameBorder="0"
            allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
        </div>
    </div>
    )}

    </div>
  );
};

export default Hero;


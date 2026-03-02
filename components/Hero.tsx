/* eslint-disable react-hooks/purity */
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Search, MapPin, ChevronRight, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

// Optimized image URLs with smaller size for faster loading
const heroImages = [
  {
    src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=75',
    blurSrc: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=20',
    alt: 'Luxury modern home with pool'
  },
  {
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=75',
    blurSrc: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=20',
    alt: 'Elegant living room interior'
  },
  {
    src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=75',
    blurSrc: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=20',
    alt: 'Beautiful bedroom with city view'
  },
  {
    src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=75',
    blurSrc: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=20',
    alt: 'Modern kitchen with island'
  },
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    // Preload images
    Promise.all(
      heroImages.map((img) => {
        return new Promise((resolve) => {
          const image = new window.Image();
          image.src = img.src;
          image.onload = resolve;
        });
      })
    ).then(() => setImagesLoaded(true));

    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-cream-50 to-cream-100">
      {/* Background Image Slider with optimized loading */}
      {heroImages.map((image, index) => (
        <div
          key={image.src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImage ? 'opacity-30' : 'opacity-0'
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            priority={index === 0}
            loading={index === 0 ? 'eager' : 'lazy'}
            quality={75}
            placeholder="blur"
            blurDataURL={image.blurSrc}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Light overlay instead of dark */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />

      {/* Animated particles - gold colored */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gold-300 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl animate-slide-up">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-gold-200 shadow-sm">
            <Sparkles className="w-4 h-4 text-gold-500 mr-2" />
            <span className="text-gold-700 font-medium">Premium Real Estate in Lilongwe</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-800">
            Find Your{' '}
            <span className="text-gold-500 relative">
              Dream Property
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0,5 Q25,0 50,5 T100,5" stroke="#e6b800" strokeWidth="3" fill="none" />
              </svg>
            </span>
            <br />in Lilongwe
          </h1>
          
          <p className="text-xl mb-8 text-gray-600 max-w-2xl">
            Discover the finest collection of luxury properties for sale, rent, and short-term stays in Malawi vibrant capital city.
          </p>

          {/* Search Bar - Light theme */}
          <div className="bg-white rounded-2xl p-2 shadow-xl max-w-2xl border border-gold-100">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gold-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Enter location or property type..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-gold-400 text-gray-800 placeholder-gray-400"
                />
              </div>
              <button className="gold-gradient text-white px-8 py-4 rounded-xl font-semibold transition-all hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2 group">
                <span>Search</span>
                <Search className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          </div>

          {/* Stats - Light theme */}
          <div className="grid grid-cols-3 gap-8 mt-12 max-w-2xl">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold text-gold-500">500+</div>
              <div className="text-gray-600">Properties</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold text-gold-500">1000+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold text-gold-500">15+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>

          {/* Scroll indicator - Light theme */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="w-6 h-10 border-2 border-gold-300 rounded-full flex justify-center">
              <div className="w-1 h-2 bg-gold-400 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
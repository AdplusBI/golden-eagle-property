'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface PropertyImageGalleryProps {
  images: string[];
  title: string;
}

export default function PropertyImageGallery({ images, title }: PropertyImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  const placeholderImage = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';

  const validImages = images && images.length > 0 ? images : [placeholderImage];

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % validImages.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  return (
    <>
      {/* Main Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Main Image */}
        <div 
          className="md:col-span-2 relative h-[400px] md:h-[500px] rounded-xl overflow-hidden cursor-pointer"
          onClick={() => setShowLightbox(true)}
        >
          <Image
            src={validImages[selectedImage]}
            alt={`${title} - Main Image`}
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
          {validImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {validImages.length > 1 && (
          <div className="md:col-span-2 grid grid-cols-4 gap-4 mt-4">
            {validImages.map((image, index) => (
              <div
                key={index}
                className={`relative h-24 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                  selectedImage === index ? 'border-gold-500 scale-105' : 'border-transparent hover:border-gold-300'
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image}
                  alt={`${title} - Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {showLightbox && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <button
            onClick={() => setShowLightbox(false)}
            className="absolute top-4 right-4 text-white hover:text-gold-500 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gold-500 transition-colors"
          >
            <ChevronLeft className="w-12 h-12" />
          </button>
          
          <div className="relative w-full max-w-5xl h-[80vh] mx-4">
            <Image
              src={validImages[selectedImage]}
              alt={`${title} - Lightbox`}
              fill
              className="object-contain"
            />
          </div>
          
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gold-500 transition-colors"
          >
            <ChevronRight className="w-12 h-12" />
          </button>

          {/* Lightbox Thumbnails */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {validImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  selectedImage === index ? 'bg-gold-500 w-4' : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
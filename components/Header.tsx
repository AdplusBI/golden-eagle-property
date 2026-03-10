"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Home, Building2, Hotel, Phone, Info, Menu, X, Briefcase, Warehouse, Store, Waves, Building } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { 
      label: 'Buy', 
      icon: Building2,
      submenu: [
        { href: '/properties?type=sale&category=residential', label: 'Homes', icon: Home },
        { href: '/properties?type=sale&category=land', label: 'Land', icon: Building },
        { href: '/properties?type=office-sale&category=warehouse', label: 'Warehouses', icon: Warehouse },
        { href: '/properties?type=office-sale&category=commercial', label: 'Commercial/Office', icon: Briefcase },
        { href: '/properties?type=sale&category=beachfront', label: 'Beach Fronts', icon: Waves },
      ]
    },
    { 
      label: 'Rent', 
      icon: Building2,
      submenu: [
        { href: '/properties?type=rent&category=residential', label: 'Homes', icon: Home },
        { href: '/properties?type=office-rent&category=office', label: 'Offices', icon: Briefcase },
        { href: '/properties?type=rent&category=warehouse', label: 'Warehouses', icon: Warehouse },
        { href: '/properties?type=rent&category=shop', label: 'Shops', icon: Store },
      ]
    },
    { href: '/properties?type=bnb', label: 'Hotels & BnB', icon: Hotel },
    { href: '/about', label: 'About', icon: Info },
    { href: '/contact', label: 'Contact', icon: Phone },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' 
        : 'bg-gradient-to-r from-gold-400 to-gold-500 py-4'
    }`}>
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className={`relative w-12 h-12 transition-all duration-300 ${
              isScrolled ? 'scale-90' : 'scale-100'
            }`}>
              <Image
                src="/logo.png"
                alt="Golden Eagle Properties Ltd Logo"
                fill
                className="object-contain group-hover:rotate-6 transition-transform duration-300"
                priority
              />
            </div>
            <span className={`text-xl font-bold transition-all duration-300 ${
              isScrolled ? 'text-gold-600' : 'text-white'
            }`}>
              Golden Eagle Properties Ltd
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.submenu ? (
                  <>
                    <button
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
                        isScrolled 
                          ? 'text-gray-600 hover:text-gold-600 hover:bg-gold-50' 
                          : 'text-white hover:bg-white/20'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gold-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-gold-600 hover:bg-gold-50 first:rounded-t-xl last:rounded-b-xl transition-colors"
                        >
                          <sub.icon className="w-4 h-4" />
                          <span>{sub.label}</span>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
                      isScrolled 
                        ? 'text-gray-600 hover:text-gold-600 hover:bg-gold-50' 
                        : 'text-white hover:bg-white/20'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'hover:bg-gold-100' : 'hover:bg-white/20'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-gray-600' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-600' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2 animate-slide-down bg-white rounded-xl p-4 shadow-xl border border-gold-100 max-h-[80vh] overflow-y-auto">
            <Link
              href="/"
              className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-gold-600 hover:bg-gold-50 rounded-lg transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </Link>
            
            {/* Buy Section */}
            <div className="px-4 py-2">
              <p className="text-sm font-semibold text-gold-600 mb-2">BUY</p>
              <div className="space-y-1">
                <Link
                  href="/properties?type=sale&category=residential"
                  className="flex items-center space-x-3 px-4 py-2 text-gray-600 hover:text-gold-600 hover:bg-gold-50 rounded-lg transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home className="w-5 h-5" />
                  <span>Homes</span>
                </Link>
                <Link
                  href="/properties?type=sale&category=land"
                  className="flex items-center space-x-3 px-4 py-2 text-gray-600 hover:text-gold-600 hover:bg-gold-50 rounded-lg transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Building className="w-5 h-5" />
                  <span>Land</span>
                </Link>
                <Link
                  href="/properties?type=office-sale&category=warehouse"
                  className="flex items-center space-x-3 px-4 py-2 text-gray-600 hover:text-gold-600 hover:bg-gold-50 rounded-lg transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Warehouse className="w-5 h-5" />
                  <span>Warehouses</span>
                </Link>
                <Link
                  href="/properties?type=office-sale&category=commercial"
                  className="flex items-center space-x-3 px-4 py-2 text-gray-600 hover:text-gold-600 hover:bg-gold-50 rounded-lg transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Briefcase className="w-5 h-5" />
                  <span>Commercial/Office</span>
                </Link>
                <Link
                  href="/properties?type=sale&category=beachfront"
                  className="flex items-center space-x-3 px-4 py-2 text-gray-600 hover:text-gold-600 hover:bg-gold-50 rounded-lg transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Waves className="w-5 h-5" />
                  <span>Beach Fronts</span>
                </Link>
              </div>
            </div>

            {/* Rent Section */}
            <div className="px-4 py-2">
              <p className="text-sm font-semibold text-gold-600 mb-2">RENT</p>
              <div className="space-y-1">
                <Link
                  href="/properties?type=rent&category=residential"
                  className="flex items-center space-x-3 px-4 py-2 text-gray-600 hover:text-gold-600 hover:bg-gold-50 rounded-lg transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home className="w-5 h-5" />
                  <span>Homes</span>
                </Link>
                <Link
                  href="/properties?type=office-rent&category=office"
                  className="flex items-center space-x-3 px-4 py-2 text-gray-600 hover:text-gold-600 hover:bg-gold-50 rounded-lg transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Briefcase className="w-5 h-5" />
                  <span>Offices</span>
                </Link>
                <Link
                  href="/properties?type=rent&category=warehouse"
                  className="flex items-center space-x-3 px-4 py-2 text-gray-600 hover:text-gold-600 hover:bg-gold-50 rounded-lg transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Warehouse className="w-5 h-5" />
                  <span>Warehouses</span>
                </Link>
                <Link
                  href="/properties?type=rent&category=shop"
                  className="flex items-center space-x-3 px-4 py-2 text-gray-600 hover:text-gold-600 hover:bg-gold-50 rounded-lg transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Store className="w-5 h-5" />
                  <span>Shops</span>
                </Link>
              </div>
            </div>

            <Link
              href="/properties?type=bnb"
              className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-gold-600 hover:bg-gold-50 rounded-lg transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              <Hotel className="w-5 h-5" />
              <span className="font-medium">Hotels & BnB</span>
            </Link>
            
            <Link
              href="/about"
              className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-gold-600 hover:bg-gold-50 rounded-lg transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              <Info className="w-5 h-5" />
              <span className="font-medium">About</span>
            </Link>
            
            <Link
              href="/contact"
              className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-gold-600 hover:bg-gold-50 rounded-lg transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              <Phone className="w-5 h-5" />
              <span className="font-medium">Contact</span>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
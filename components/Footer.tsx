import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gold-100 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo.png"
                  alt="Golden Eagle Properties Ltd Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold text-gold-600">Golden Eagle Properties Ltd</span>
            </div>
            <p className="text-gray-600 mb-4">
              Your trusted partner for premium properties in Lilongwe, Malawi.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold-600">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/properties?type=sale&category=residential" className="text-gray-600 hover:text-gold-500 transition-colors">
                  Homes for Sale
                </Link>
              </li>
              <li>
                <Link href="/properties?type=rent&category=residential" className="text-gray-600 hover:text-gold-500 transition-colors">
                  Homes for Rent
                </Link>
              </li>
              <li>
                <Link href="/properties?type=office-sale" className="text-gray-600 hover:text-gold-500 transition-colors">
                  Commercial Properties
                </Link>
              </li>
              <li>
                <Link href="/properties?type=bnb" className="text-gray-600 hover:text-gold-500 transition-colors">
                  Hotels & BnB
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gold-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gold-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold-600">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gold-400 flex-shrink-0 mt-1" />
                <span className="text-gray-600">Area 3, Lilongwe, Malawi</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gold-400" />
                <span className="text-gray-600">+265 1 234 567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gold-400" />
                <span className="text-gray-600">info@goldeneagle.mw</span>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold-600">Business Hours</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Monday - Friday: 8:00 AM - 5:00 PM</li>
              <li>Saturday: 9:00 AM - 1:00 PM</li>
              <li>Sunday: Closed</li>
              <li className="mt-4 text-gold-500 font-semibold">24/7 Online Booking Available</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gold-100 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Golden Eagle Properties Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
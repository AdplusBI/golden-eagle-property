'use client';

import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+265 1 234 567', '+265 2 345 678'],
      action: 'Call us now'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@goldeneagle.mw', 'sales@goldeneagle.mw'],
      action: 'Send us an email'
    },
    {
      icon: MapPin,
      title: 'Office',
      details: ['Area 3, Lilongwe', 'Malawi'],
      action: 'Get directions'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon-Fri: 8:00 AM - 5:00 PM', 'Sat: 9:00 AM - 1:00 PM'],
      action: '24/7 online booking'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">
          Contact <span className="text-gold-500">Us</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Get in touch with our team for any inquiries about properties in Lilongwe.
        </p>
      </div>

      {/* Contact Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {contactInfo.map((info, index) => (
          <div 
            key={index} 
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center group border border-gold-100"
          >
            <div className="w-16 h-16 bg-gold-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-gold-500 transition-colors duration-300">
              <info.icon className="w-8 h-8 text-gold-600 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">{info.title}</h3>
            {info.details.map((detail, i) => (
              <p key={i} className="text-gray-600 mb-1">{detail}</p>
            ))}
            <button className="mt-6 text-gold-600 font-semibold hover:text-gold-700 transition-colors inline-flex items-center group/btn">
              <span>{info.action}</span>
              <span className="ml-2 group-hover/btn:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        ))}
      </div>

      {/* Additional Contact Info */}
      <div className="text-center mt-16">
        <p className="text-gray-600">
          Prefer to talk? Call us at <span className="text-gold-600 font-semibold">+265 1 234 567</span>
        </p>
        <p className="text-gray-600 mt-2">
          Or email us at <span className="text-gold-600 font-semibold">info@goldeneagle.mw</span>
        </p>
      </div>
    </div>
  );
}
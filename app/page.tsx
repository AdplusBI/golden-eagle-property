import Hero from '@/components/Hero';
import PropertyGrid from '@/components/PropertyGrid';
import { properties } from '@/data/properties';
import Link from 'next/link';
import Image from 'next/image';
import { Home as HomeIcon, Building2, Hotel, TrendingUp, Users, Star, ArrowRight, Shield, Clock, Award } from 'lucide-react';

// Optimized image URLs
const serviceImages = {
  buy: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=75',
  rent: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=75',
  bnb: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=75',
  stats: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=75',
};

export default function Home() {
  const featuredProperties = properties.slice(0, 6);

  const stats = [
    { label: 'Properties Sold', value: '500+', icon: TrendingUp, color: 'from-blue-400 to-blue-500' },
    { label: 'Happy Clients', value: '1000+', icon: Users, color: 'from-green-400 to-green-500' },
    { label: '5-Star Reviews', value: '250+', icon: Star, color: 'from-yellow-400 to-yellow-500' },
  ];

  const services = [
    {
      title: 'Buy Properties',
      description: 'Find your dream home or investment property in prime locations across Lilongwe.',
      icon: HomeIcon,
      link: '/properties?type=sale',
      image: serviceImages.buy,
    },
    {
      title: 'Rent Properties',
      description: 'Quality rental properties for both residential and commercial purposes.',
      icon: Building2,
      link: '/properties?type=rent',
      image: serviceImages.rent,
    },
    {
      title: 'BnB Stays',
      description: 'Comfortable short-term accommodations for tourists and business travelers.',
      icon: Hotel,
      link: '/properties?type=bnb',
      image: serviceImages.bnb,
    },
  ];

  const features = [
    { icon: Shield, title: 'Secure Transactions', description: '100% safe and verified deals', color: 'bg-blue-50 text-blue-600' },
    { icon: Clock, title: 'Fast Process', description: 'Quick and efficient service', color: 'bg-green-50 text-green-600' },
    { icon: Award, title: 'Best Prices', description: 'Competitive market rates', color: 'bg-purple-50 text-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-cream-50">
      <Hero />

      {/* Features Section - Light */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 text-center hover-lift border border-gold-100"
              >
                <div className={`w-20 h-20 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform`}>
                  <feature.icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Light with Images */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-gold-500 font-semibold tracking-wider uppercase">Our Services</span>
            <h2 className="section-title mt-4">
              Everything You Need in{' '}
              <span className="text-gold-500 relative">
                One Place
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 Q25,0 50,5 T100,5" stroke="#e6b800" strokeWidth="3" fill="none" />
                </svg>
              </span>
            </h2>
            <p className="section-subtitle">
              Comprehensive real estate solutions tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link
                key={index}
                href={service.link}
                className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    quality={75}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="w-16 h-16 bg-gold-500 rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                      <service.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                    <p className="text-gray-100 mb-4 line-clamp-2">{service.description}</p>
                    <div className="flex items-center text-gold-300 font-semibold">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties - Light */}
      <section className="py-20 bg-gradient-to-b from-cream-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-gold-500 font-semibold tracking-wider uppercase">Featured Listings</span>
            <h2 className="section-title mt-4">
              Hand-Picked{' '}
              <span className="text-gold-500">Properties</span>
            </h2>
            <p className="section-subtitle">
              Discover our most exclusive properties in prime locations
            </p>
          </div>

          <PropertyGrid properties={featuredProperties} />
          
          <div className="text-center mt-12">
            <Link
              href="/properties"
              className="inline-flex items-center gold-gradient text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all group"
            >
              <span>Explore All Properties</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section - Light with Image */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={serviceImages.stats}
            alt="Luxury property"
            fill
            className="object-cover opacity-10"
            loading="lazy"
            quality={60}
          />
        </div>

        <div className="relative container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gold-100"
              >
                <div className={`inline-block p-5 rounded-2xl bg-gradient-to-br ${stat.color} mb-6 shadow-lg`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Light Gold Gradient */}
      <section className="py-20 gold-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let us help you find the perfect property in Lilongwe. Our experts are here to guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-gold-600 px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center justify-center group"
            >
              <span>Contact Us Today</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link
              href="/properties"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 hover:scale-105 transition-all"
            >
              Browse Properties
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
import { Building2, Award, Users, Target, Shield, Clock } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: 'Trust & Integrity',
      description: 'We operate with the highest ethical standards, ensuring transparent and honest dealings with all our clients.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our service, from property selection to customer support.'
    },
    {
      icon: Users,
      title: 'Client-Focused',
      description: 'Your needs and preferences are at the heart of everything we do.'
    },
    {
      icon: Target,
      title: 'Local Expertise',
      description: 'Deep understanding of Lilongwe\'s real estate market and communities.'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock assistance for all your property needs.'
    },
    {
      icon: Building2,
      title: 'Diverse Portfolio',
      description: 'Wide range of properties to suit every need and budget.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          About <span className="text-gold-500">Golden Eagle Properties</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your trusted partner in real estate, dedicated to helping you find the perfect property in Lilongwe, Malawi.
        </p>
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Founded in 2010, Golden Eagle Properties has grown to become one of Lilongwe is most respected real estate agencies. Our journey began with a simple mission: to provide exceptional property services with integrity and professionalism.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Over the years, weve helped thousands of clients find their dream homes, secure profitable investments, and enjoy comfortable short-term stays in Malawi&rsquo;s beautiful capital city.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Today, we continue to build on our legacy of excellence, combining local market expertise with modern technology to deliver the best possible experience for our clients.
          </p>
        </div>
        <div className="bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl p-8 text-white">
          <blockquote className="text-2xl italic mb-4">
            You are dream property is not just a transaction - it iss the beginning of a new chapter in your life.
          </blockquote>
          <p className="font-semibold">- John Banda, Founder & CEO</p>
        </div>
      </div>

      {/* Values Section */}
      <h2 className="text-3xl font-bold text-center mb-12">
        Our <span className="text-gold-500">Values</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {values.map((value, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center mb-4">
              <value.icon className="w-6 h-6 text-gold-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
            <p className="text-gray-600">{value.description}</p>
          </div>
        ))}
      </div>

      {/* Team Section */}
      <h2 className="text-3xl font-bold text-center mb-12">
        Our <span className="text-gold-500">Team</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="text-center">
            <div className="w-48 h-48 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-4xl font-bold">JD</span>
            </div>
            <h3 className="text-xl font-semibold">John Doe</h3>
            <p className="text-gold-600 mb-2">Senior Agent</p>
            <p className="text-gray-600">10+ years experience in Lilongwe real estate</p>
          </div>
        ))}
      </div>
    </div>
  );
}
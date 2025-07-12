
import { Search, MapPin, Users, Star, Phone, Mail, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const featuredBusinesses = [
    {
      id: 1,
      name: "Green Valley Coffee",
      category: "Restaurant & Café",
      location: "Downtown District",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
      description: "Locally roasted coffee and fresh pastries in the heart of downtown.",
      phone: "(555) 123-4567",
      email: "hello@greenvalleycoffee.com",
      website: "www.greenvalleycoffee.com",
      tags: ["Coffee", "Pastries", "Local Roasting"]
    },
    {
      id: 2,
      name: "TechStart Solutions",
      category: "Technology Services",
      location: "Business Park",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
      description: "Web development and digital marketing for small businesses.",
      phone: "(555) 234-5678",
      email: "contact@techstartsolutions.com",
      website: "www.techstartsolutions.com",
      tags: ["Web Development", "Marketing", "Consulting"]
    },
    {
      id: 3,
      name: "Mountain View Fitness",
      category: "Health & Wellness",
      location: "Riverside Area",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop",
      description: "Personal training and group fitness classes with scenic mountain views.",
      phone: "(555) 345-6789",
      email: "info@mountainviewfitness.com",
      website: "www.mountainviewfitness.com",
      tags: ["Fitness", "Personal Training", "Wellness"]
    }
  ];

  const categories = [
    "Restaurant & Food",
    "Technology Services",
    "Health & Wellness",
    "Retail & Shopping",
    "Professional Services",
    "Home & Garden",
    "Arts & Entertainment",
    "Education & Training"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">LocalConnect</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/directory" className="text-gray-700 hover:text-blue-600 transition-colors">Directory</Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</Link>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Join Network
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            Connect With Local
            <span className="text-blue-600"> Businesses</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in">
            Discover, connect, and collaborate with businesses in your community. 
            Build meaningful partnerships that help everyone grow together.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12 animate-fade-in">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search businesses, services, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500 shadow-lg"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-blue-600 hover:bg-blue-700">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.slice(0, 6).map((category) => (
              <Badge
                key={category}
                variant="secondary"
                className="px-4 py-2 text-sm hover:bg-blue-100 hover:text-blue-700 cursor-pointer transition-colors"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Local Businesses
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover established businesses in your community that are ready to connect and collaborate.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBusinesses.map((business) => (
              <Card key={business.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={business.image}
                    alt={business.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold mb-2">{business.name}</CardTitle>
                      <div className="flex items-center space-x-2 text-gray-600 mb-2">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{business.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{business.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Badge variant="outline" className="text-blue-600 border-blue-200">
                    {business.category}
                  </Badge>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {business.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {business.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-2 pt-4 border-t">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>{business.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span>{business.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Globe className="h-4 w-4" />
                      <span>{business.website}</span>
                    </div>
                  </div>

                  <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                    Connect & Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              View All Businesses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Grow Your Business Network?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of local businesses already connecting and collaborating in our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              List Your Business
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Explore Directory
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">LocalConnect</span>
              </div>
              <p className="text-gray-400">
                Connecting local businesses for stronger communities and mutual growth.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2 text-gray-400">
                <Link to="/" className="block hover:text-white transition-colors">Home</Link>
                <Link to="/directory" className="block hover:text-white transition-colors">Business Directory</Link>
                <Link to="/about" className="block hover:text-white transition-colors">About Us</Link>
                <Link to="/contact" className="block hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Categories</h3>
              <div className="space-y-2 text-gray-400 text-sm">
                <div className="hover:text-white transition-colors cursor-pointer">Restaurant & Food</div>
                <div className="hover:text-white transition-colors cursor-pointer">Technology Services</div>
                <div className="hover:text-white transition-colors cursor-pointer">Health & Wellness</div>
                <div className="hover:text-white transition-colors cursor-pointer">Professional Services</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400 text-sm">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>hello@localconnect.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Your City, State 12345</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LocalConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

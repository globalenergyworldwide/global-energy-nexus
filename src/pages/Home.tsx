import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Globe, Droplet, TrendingUp, Shield, Users, Zap } from "lucide-react";
import heroImage from "@/assets/hero-refinery.jpg";
import drillingImage from "@/assets/drilling-operations.jpg";
import exportImage from "@/assets/export-import.jpg";
import p2pImage from "@/assets/p2p-trading.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/70 to-navy/90"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-background mb-6 animate-fade-in">
            Fueling the Future Through
            <span className="block text-gold">Innovation & Global Connection</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Leading international oil and energy operations with cutting-edge technology, sustainable practices, and a global P2P trading network.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/about">
              <Button size="lg" className="bg-gold hover:bg-gold-light text-navy font-semibold">
                Explore Our Operations <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/p2p-platform">
              <Button size="lg" variant="outline" className="border-gold text-black hover:bg-gold/10">
                P2P Energy Exchange
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Global Energy Leadership
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Over 20 years of excellence in oil refining, resource exploration, and international trade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Droplet className="h-12 w-12 text-gold" />,
                title: "Oil Refining",
                description: "State-of-the-art refinery operations producing premium petroleum products including EN590, Jet A1, and various crude oil grades.",
                link: "/refinery"
              },
              {
                icon: <TrendingUp className="h-12 w-12 text-gold" />,
                title: "Resource Surveying",
                description: "Advanced geological surveying and exploratory drilling with cutting-edge technology for onshore and offshore operations.",
                link: "/surveying"
              },
              {
                icon: <Globe className="h-12 w-12 text-gold" />,
                title: "Export & Import",
                description: "Comprehensive international shipping, storage, and logistics with compliance across Africa, Middle East, Europe, and Asia.",
                link: "/export-import"
              },
              {
                icon: <Zap className="h-12 w-12 text-gold" />,
                title: "P2P Trading Platform",
                description: "Revolutionary peer-to-peer energy exchange connecting global buyers, sellers, and brokers with secure transactions.",
                link: "/p2p-platform"
              },
              {
                icon: <Shield className="h-12 w-12 text-gold" />,
                title: "Quality Assurance",
                description: "Certified operations with international compliance, safety systems, and sustainability standards.",
                link: "/about"
              },
              {
                icon: <Users className="h-12 w-12 text-gold" />,
                title: "Global Network",
                description: "Strategic partnerships with governments, corporations, and suppliers across multiple continents.",
                link: "/contact"
              }
            ].map((capability, index) => (
              <Card key={index} className="border-border hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
                <CardContent className="p-6">
                  <div className="mb-4">{capability.icon}</div>
                  <h3 className="text-2xl font-semibold mb-3 text-primary">{capability.title}</h3>
                  <p className="text-muted-foreground mb-4">{capability.description}</p>
                  <Link to={capability.link}>
                    <Button variant="link" className="text-gold hover:text-gold-light p-0">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Operations */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Our Operations
            </h2>
            <p className="text-xl text-muted-foreground">
              Delivering excellence across the energy value chain
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                image: drillingImage,
                title: "Drilling & Surveying",
                description: "Advanced resource evaluation with state-of-the-art equipment and engineering excellence."
              },
              {
                image: exportImage,
                title: "International Trade",
                description: "Seamless export and import operations with strategic hubs across key global markets."
              },
              {
                image: p2pImage,
                title: "P2P Platform",
                description: "Innovative trading system with real-time pricing, secure escrow, and KYC verification."
              },
              {
                image: heroImage,
                title: "Refinery Excellence",
                description: "Premium product output with cutting-edge automation and quality certifications."
              }
            ].map((operation, index) => (
              <Card key={index} className="overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={operation.image} 
                    alt={operation.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-primary mb-3">{operation.title}</h3>
                  <p className="text-muted-foreground">{operation.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Certifications */}
      <section className="py-20 bg-navy text-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">
            Trusted by Industry Leaders Worldwide
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {[
              { label: "Years Experience", value: "20+" },
              { label: "Countries Served", value: "45+" },
              { label: "Annual Capacity", value: "5M+" },
              { label: "Global Partners", value: "200+" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-gold mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
          <Link to="/contact">
            <Button size="lg" className="bg-gold hover:bg-gold-light text-navy font-semibold">
              Partner With Us <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

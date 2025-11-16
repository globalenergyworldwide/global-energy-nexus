import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Target, Lightbulb, Globe } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-navy via-navy-light to-navy py-20 text-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About Oil & Energy Corp</h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Two decades of excellence in global energy solutions, powered by innovation and sustainable practices
            </p>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-primary mb-8">Our Story</h2>
              <div className="space-y-6 text-lg text-foreground">
                <p>
                  Founded over 20 years ago, Oil & Energy Corp has grown from a regional refinery operator into a global energy powerhouse. Our journey has been defined by unwavering commitment to excellence, innovation, and sustainability in every aspect of our operations.
                </p>
                <p>
                  Today, we operate across multiple continents with a comprehensive portfolio spanning oil refining, resource surveying, drilling operations, and international trade. Our revolutionary P2P trading platform has transformed how energy commodities are bought and sold globally.
                </p>
                <p>
                  We serve governments, corporations, and private organizations worldwide, maintaining the highest standards of quality, safety, and environmental responsibility. Our global network of partners and suppliers enables us to deliver reliable, efficient energy solutions wherever they're needed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-border">
                <CardContent className="p-8">
                  <Target className="h-16 w-16 text-gold mb-6" />
                  <h3 className="text-2xl font-bold text-primary mb-4">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To deliver world-class energy solutions that power progress while maintaining the highest standards of safety, quality, and environmental stewardship.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-8">
                  <Lightbulb className="h-16 w-16 text-gold mb-6" />
                  <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
                  <p className="text-muted-foreground">
                    To be the world's most trusted and innovative energy company, leading the transition to a sustainable energy future through technology and global collaboration.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-8">
                  <Award className="h-16 w-16 text-gold mb-6" />
                  <h3 className="text-2xl font-bold text-primary mb-4">Our Values</h3>
                  <p className="text-muted-foreground">
                    Excellence, integrity, innovation, sustainability, and partnership drive everything we do. We're committed to creating value for all stakeholders.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Global Presence */}
        <section className="py-20 bg-navy text-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Globe className="h-20 w-20 text-gold mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Global Presence</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Operating across continents with strategic hubs in key energy markets
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {[
                { region: "Middle East", operations: "Refining & Export" },
                { region: "Africa", operations: "Surveying & Drilling" },
                { region: "Europe", operations: "Trading & Distribution" },
                { region: "Asia", operations: "Import & Partnership" }
              ].map((region, index) => (
                <Card key={index} className="bg-navy-light border-gold/20">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-2xl font-bold text-gold mb-2">{region.region}</h3>
                    <p className="text-muted-foreground">{region.operations}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-primary mb-4">Certifications & Compliance</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Maintaining the highest international standards across all operations
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                "ISO 9001:2015",
                "ISO 14001:2015",
                "OHSAS 18001",
                "API Certifications",
                "Environmental Compliance",
                "Safety Standards",
                "Quality Assurance",
                "International Trade"
              ].map((cert, index) => (
                <Card key={index} className="border-border hover:border-gold transition-colors">
                  <CardContent className="p-6 text-center">
                    <Award className="h-8 w-8 text-gold mx-auto mb-3" />
                    <p className="font-semibold text-primary">{cert}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;

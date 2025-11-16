import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Droplet, Gauge, Shield, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-refinery.jpg";

const Refinery = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative h-96 flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-navy/80"></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-background mb-4">
              Oil Refinery Operations
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              State-of-the-art refining capabilities producing premium petroleum products
            </p>
          </div>
        </section>

        {/* Capabilities Overview */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto mb-16">
              <h2 className="text-4xl font-bold text-primary mb-6">Refining Excellence</h2>
              <p className="text-lg text-foreground">
                Our advanced refinery facilities utilize cutting-edge technology and automation to produce high-quality petroleum products that meet and exceed international standards. With decades of experience and continuous innovation, we ensure optimal efficiency, safety, and environmental responsibility in every stage of the refining process.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Droplet className="h-12 w-12 text-gold" />,
                  title: "Premium Products",
                  description: "EN590 Diesel, Jet A1, Various Crude Oil Grades, LPG, and Lubricants"
                },
                {
                  icon: <Gauge className="h-12 w-12 text-gold" />,
                  title: "Advanced Technology",
                  description: "Automated systems, real-time monitoring, and process optimization"
                },
                {
                  icon: <Shield className="h-12 w-12 text-gold" />,
                  title: "Safety First",
                  description: "Comprehensive safety protocols and emergency response systems"
                },
                {
                  icon: <CheckCircle className="h-12 w-12 text-gold" />,
                  title: "Quality Certified",
                  description: "ISO certified operations with rigorous quality control"
                }
              ].map((item, index) => (
                <Card key={index} className="border-border">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">{item.icon}</div>
                    <h3 className="text-xl font-semibold text-primary mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-primary text-center mb-12">Refined Products</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "EN590 Diesel",
                  description: "Ultra-low sulfur diesel meeting European standards, ideal for modern engines and commercial transportation.",
                  specs: ["Sulfur: <10 ppm", "Cetane Number: 51+", "Density: 820-845 kg/m³"]
                },
                {
                  name: "Jet A1 Fuel",
                  description: "Aviation turbine fuel conforming to international aviation fuel specifications.",
                  specs: ["Flash Point: 38°C min", "Freeze Point: -47°C", "Smoke Point: 25mm min"]
                },
                {
                  name: "Crude Oil Grades",
                  description: "Various crude oil classifications including light, medium, and heavy grades.",
                  specs: ["API Gravity: Varied", "Sulfur Content: Custom", "Quality Assured"]
                },
                {
                  name: "Liquefied Petroleum Gas",
                  description: "Clean-burning LPG for residential, commercial, and industrial applications.",
                  specs: ["Propane/Butane Mix", "High Purity", "Safe Storage"]
                },
                {
                  name: "Lubricants",
                  description: "Premium industrial and automotive lubricants for various applications.",
                  specs: ["Viscosity Grades", "Additive Packages", "Performance Tested"]
                },
                {
                  name: "Petrochemicals",
                  description: "Base petrochemical products for manufacturing and industrial processes.",
                  specs: ["Various Grades", "Customizable", "Bulk Available"]
                }
              ].map((product, index) => (
                <Card key={index} className="border-border hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-primary mb-3">{product.name}</h3>
                    <p className="text-foreground mb-4">{product.description}</p>
                    <div className="space-y-1">
                      {product.specs.map((spec, i) => (
                        <div key={i} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-gold mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 bg-navy text-background">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Refining Process</h2>
            
            <div className="max-w-5xl mx-auto space-y-6">
              {[
                { step: 1, title: "Crude Oil Reception", description: "Secure receipt and storage of crude oil from various sources with quality verification" },
                { step: 2, title: "Distillation", description: "Separation of crude oil into different fractions based on boiling points" },
                { step: 3, title: "Conversion & Treatment", description: "Processing fractions through cracking, reforming, and treatment units" },
                { step: 4, title: "Quality Control", description: "Rigorous testing and quality assurance at every stage" },
                { step: 5, title: "Storage & Distribution", description: "Safe storage and preparation for export and distribution" }
              ].map((process) => (
                <Card key={process.step} className="bg-navy-light border-gold/20">
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-bold text-navy">{process.step}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gold mb-2">{process.title}</h3>
                      <p className="text-muted-foreground">{process.description}</p>
                    </div>
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

export default Refinery;

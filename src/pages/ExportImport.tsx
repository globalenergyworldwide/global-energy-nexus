import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Ship, Globe, Package, CheckCircle } from "lucide-react";
import exportImage from "@/assets/export-import.jpg";

const ExportImport = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative h-96 flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${exportImage})` }}
          >
            <div className="absolute inset-0 bg-navy/80"></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-background mb-4">
              Export & Import Operations
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Global petroleum trade with comprehensive logistics and compliance
            </p>
          </div>
        </section>

        {/* Overview */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto mb-16">
              <h2 className="text-4xl font-bold text-primary mb-6">Global Trade Excellence</h2>
              <p className="text-lg text-foreground mb-6">
                Our export and import division handles the complex logistics of international petroleum trade with precision and reliability. We manage every aspect from documentation and compliance to shipping and delivery, ensuring your products reach their destination safely and on time.
              </p>
              <p className="text-lg text-foreground">
                With strategic hubs across Africa, the Middle East, Europe, and Asia, we provide seamless international trade solutions for governments, refineries, and private organizations worldwide.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Ship className="h-12 w-12 text-gold" />,
                  title: "International Shipping",
                  description: "Efficient maritime transport with reliable carrier partnerships"
                },
                {
                  icon: <Globe className="h-12 w-12 text-gold" />,
                  title: "Global Network",
                  description: "Strategic hubs across major continents and markets"
                },
                {
                  icon: <Package className="h-12 w-12 text-gold" />,
                  title: "Storage Solutions",
                  description: "Secure storage facilities at key international locations"
                },
                {
                  icon: <CheckCircle className="h-12 w-12 text-gold" />,
                  title: "Full Compliance",
                  description: "Complete documentation and regulatory adherence"
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

        {/* Services */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-primary text-center mb-12">Comprehensive Trade Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Export Services",
                  description: "Complete export management for petroleum products with full documentation, customs clearance, and international shipping coordination.",
                  features: [
                    "Product sourcing and quality verification",
                    "Export documentation and permits",
                    "Customs clearance and compliance",
                    "International shipping arrangements",
                    "Insurance and risk management",
                    "Delivery tracking and confirmation"
                  ]
                },
                {
                  title: "Import Services",
                  description: "Streamlined import processes ensuring timely delivery of petroleum products with complete regulatory compliance and quality assurance.",
                  features: [
                    "Supplier identification and verification",
                    "Import permits and documentation",
                    "Quality inspection and testing",
                    "Customs clearance services",
                    "Inland transportation",
                    "Storage and distribution"
                  ]
                },
                {
                  title: "Logistics Management",
                  description: "End-to-end logistics solutions optimizing the supply chain for maximum efficiency and cost-effectiveness.",
                  features: [
                    "Route planning and optimization",
                    "Carrier selection and management",
                    "Real-time shipment tracking",
                    "Warehousing and inventory",
                    "Supply chain consulting",
                    "Emergency response support"
                  ]
                },
                {
                  title: "Bulk Supply Programs",
                  description: "Long-term supply agreements tailored for governments, refineries, and large-scale commercial operations.",
                  features: [
                    "Contract negotiation support",
                    "Flexible delivery schedules",
                    "Volume-based pricing",
                    "Quality guarantees",
                    "Dedicated account management",
                    "Performance reporting"
                  ]
                }
              ].map((service, index) => (
                <Card key={index} className="border-border hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-primary mb-4">{service.title}</h3>
                    <p className="text-foreground mb-6">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-gold mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Regional Hubs */}
        <section className="py-20 bg-navy text-background">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Global Regional Hubs</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  region: "Middle East",
                  locations: ["UAE", "Saudi Arabia", "Qatar"],
                  services: "Primary refining and export hub with extensive storage facilities"
                },
                {
                  region: "Africa",
                  locations: ["Nigeria", "South Africa", "Egypt"],
                  services: "Regional distribution and import/export coordination"
                },
                {
                  region: "Europe",
                  locations: ["Netherlands", "UK", "Spain"],
                  services: "European market access and trading operations"
                },
                {
                  region: "Asia",
                  locations: ["Singapore", "China", "India"],
                  services: "Asian market penetration and strategic partnerships"
                }
              ].map((hub, index) => (
                <Card key={index} className="bg-navy-light border-gold/20">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-gold mb-3">{hub.region}</h3>
                    <div className="mb-4">
                      {hub.locations.map((location, i) => (
                        <span key={i} className="inline-block bg-gold/20 text-gold text-xs px-2 py-1 rounded mr-2 mb-2">
                          {location}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{hub.services}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-primary mb-6">Compliance & Documentation</h2>
              <p className="text-lg text-foreground mb-12">
                We handle all aspects of international trade compliance, ensuring smooth transactions that meet all regulatory requirements across different jurisdictions.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Documentation",
                    items: ["Bills of Lading", "Commercial Invoices", "Certificates of Origin", "Inspection Certificates"]
                  },
                  {
                    title: "Regulatory",
                    items: ["Export Licenses", "Import Permits", "Customs Declarations", "Safety Data Sheets"]
                  },
                  {
                    title: "Quality",
                    items: ["Product Specifications", "Quality Certificates", "Lab Test Results", "Conformity Documents"]
                  }
                ].map((category, index) => (
                  <Card key={index} className="border-gold">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-primary mb-4">{category.title}</h3>
                      <ul className="space-y-2">
                        {category.items.map((item, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start">
                            <span className="text-gold mr-2">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default ExportImport;

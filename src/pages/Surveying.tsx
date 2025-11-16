import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Hammer, Map, BarChart } from "lucide-react";
import drillingImage from "@/assets/drilling-operations.jpg";

const Surveying = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative h-96 flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${drillingImage})` }}
          >
            <div className="absolute inset-0 bg-navy/80"></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-background mb-4">
              Resource Surveying & Drilling
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced exploration and drilling operations for onshore and offshore resources
            </p>
          </div>
        </section>

        {/* Overview */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto mb-16">
              <h2 className="text-4xl font-bold text-primary mb-6">Exploration Excellence</h2>
              <p className="text-lg text-foreground mb-6">
                Our surveying and drilling division combines cutting-edge technology with decades of expertise to identify and extract oil and gas resources safely and efficiently. From initial geological assessment to full-scale production, we provide comprehensive solutions for resource development.
              </p>
              <p className="text-lg text-foreground">
                With operations spanning both onshore and offshore environments, our team of expert geologists, engineers, and technicians deliver accurate resource evaluations and sustainable extraction strategies tailored to each unique location.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Search className="h-12 w-12 text-gold" />,
                  title: "Geological Surveys",
                  description: "Advanced seismic analysis and geological mapping"
                },
                {
                  icon: <Hammer className="h-12 w-12 text-gold" />,
                  title: "Exploratory Drilling",
                  description: "State-of-the-art drilling technology and techniques"
                },
                {
                  icon: <Map className="h-12 w-12 text-gold" />,
                  title: "Resource Evaluation",
                  description: "Comprehensive assessment and feasibility studies"
                },
                {
                  icon: <BarChart className="h-12 w-12 text-gold" />,
                  title: "Data Analysis",
                  description: "Advanced analytics and reporting systems"
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
            <h2 className="text-4xl font-bold text-primary text-center mb-12">Our Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Seismic Surveying",
                  description: "Utilizing advanced 3D and 4D seismic imaging technology to map subsurface geological structures with exceptional accuracy. Our surveys provide critical data for identifying potential oil and gas reservoirs.",
                  features: ["3D/4D Seismic Imaging", "Real-time Data Processing", "Geological Modeling", "Risk Assessment"]
                },
                {
                  title: "Exploratory Drilling",
                  description: "Conducting exploratory drilling operations to confirm the presence and quality of oil and gas reserves. Our experienced teams use cutting-edge equipment to minimize environmental impact.",
                  features: ["Vertical & Directional Drilling", "Well Logging Services", "Formation Testing", "Core Sampling"]
                },
                {
                  title: "Offshore Operations",
                  description: "Specialized expertise in offshore oil and gas exploration with proven track record in deep-water environments. Safety and environmental protection are our top priorities.",
                  features: ["Deep-water Drilling", "Platform Operations", "Subsea Technology", "Marine Logistics"]
                },
                {
                  title: "Resource Evaluation",
                  description: "Comprehensive analysis and reporting of discovered resources including reserve estimation, production forecasting, and economic feasibility studies.",
                  features: ["Reserve Estimation", "Production Modeling", "Economic Analysis", "Technical Reports"]
                }
              ].map((service, index) => (
                <Card key={index} className="border-border hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-primary mb-4">{service.title}</h3>
                    <p className="text-foreground mb-6">{service.description}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-gold rounded-full"></div>
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Equipment & Technology */}
        <section className="py-20 bg-navy text-background">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Advanced Technology & Equipment</h2>
            
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    category: "Seismic Equipment",
                    items: ["Advanced Sensor Arrays", "Real-time Processing Units", "GPS Positioning Systems", "Data Acquisition Systems"]
                  },
                  {
                    category: "Drilling Technology",
                    items: ["Automated Drilling Rigs", "Mud Logging Systems", "Downhole Measurement Tools", "Blowout Prevention Systems"]
                  },
                  {
                    category: "Analysis Systems",
                    items: ["3D Geological Modeling", "Reservoir Simulation Software", "Production Forecasting Tools", "Economic Evaluation Systems"]
                  }
                ].map((tech, index) => (
                  <Card key={index} className="bg-navy-light border-gold/20">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-gold mb-4">{tech.category}</h3>
                      <ul className="space-y-2">
                        {tech.items.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-gold mr-2">•</span>
                            <span className="text-muted-foreground">{item}</span>
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

        {/* Safety & Environment */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-primary mb-6">Safety & Environmental Commitment</h2>
              <p className="text-lg text-foreground mb-8">
                We maintain the highest safety standards and environmental protection measures in all our surveying and drilling operations. Our commitment to responsible resource development ensures minimal environmental impact and maximum safety for our teams and surrounding communities.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                {[
                  { label: "Zero Harm Policy", value: "100%" },
                  { label: "Environmental Compliance", value: "Full" },
                  { label: "Safety Training Hours", value: "10,000+" }
                ].map((stat, index) => (
                  <Card key={index} className="border-gold">
                    <CardContent className="p-6">
                      <div className="text-4xl font-bold text-gold mb-2">{stat.value}</div>
                      <div className="text-muted-foreground">{stat.label}</div>
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

export default Surveying;

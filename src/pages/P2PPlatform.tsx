import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Network, Shield, TrendingUp, Users, Lock, CheckCircle, ArrowRight } from "lucide-react";
import p2pImage from "@/assets/p2p-trading.jpg";

const P2PPlatform = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative h-96 flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${p2pImage})` }}
          >
            <div className="absolute inset-0 bg-navy/80"></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-background mb-4">
              P2P Global Energy Exchange
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Revolutionary peer-to-peer trading platform connecting energy markets worldwide
            </p>
          </div>
        </section>

        {/* Platform Overview */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto mb-16 text-center">
              <h2 className="text-4xl font-bold text-primary mb-6">The Future of Energy Trading</h2>
              <p className="text-lg text-foreground mb-6">
                Our innovative P2P Global Energy Exchange platform transforms how energy commodities are traded worldwide. By directly connecting suppliers, buyers, brokers, and governments, we eliminate unnecessary intermediaries and create a more efficient, transparent, and secure trading environment.
              </p>
              <p className="text-lg text-foreground">
                Experience real-time pricing, secure escrow services, comprehensive KYC verification, and intelligent dispute resolution—all in one powerful platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Network className="h-12 w-12 text-gold" />,
                  title: "Direct Connection",
                  description: "Connect with verified global buyers and sellers instantly"
                },
                {
                  icon: <Shield className="h-12 w-12 text-gold" />,
                  title: "Secure Transactions",
                  description: "Escrow protection and verified payment systems"
                },
                {
                  icon: <TrendingUp className="h-12 w-12 text-gold" />,
                  title: "Real-time Pricing",
                  description: "Live market data and competitive pricing transparency"
                },
                {
                  icon: <Users className="h-12 w-12 text-gold" />,
                  title: "Global Network",
                  description: "Access to verified suppliers and buyers worldwide"
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

        {/* Key Features */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-primary text-center mb-12">Platform Features</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[
                {
                  icon: <Lock className="h-10 w-10 text-gold" />,
                  title: "KYC Verification",
                  description: "Comprehensive identity verification and business validation for all platform participants. Our rigorous KYC process ensures you're always trading with verified, legitimate entities.",
                  benefits: ["Identity Verification", "Business Documentation", "Credit Checks", "Ongoing Monitoring"]
                },
                {
                  icon: <Shield className="h-10 w-10 text-gold" />,
                  title: "Secure Escrow",
                  description: "Protected payments through our secure escrow system that holds funds until delivery confirmation. Both buyers and sellers are protected throughout the transaction.",
                  benefits: ["Payment Protection", "Delivery Confirmation", "Automated Release", "Dispute Support"]
                },
                {
                  icon: <TrendingUp className="h-10 w-10 text-gold" />,
                  title: "Live Market Data",
                  description: "Access real-time pricing, market trends, and analytics to make informed trading decisions. Stay ahead with up-to-the-minute market intelligence.",
                  benefits: ["Real-time Prices", "Market Analytics", "Price Alerts", "Historical Data"]
                },
                {
                  icon: <CheckCircle className="h-10 w-10 text-gold" />,
                  title: "Smart Dispute Resolution",
                  description: "Intelligent dispute resolution system with expert mediators and clear processes to resolve conflicts fairly and efficiently.",
                  benefits: ["Expert Mediators", "Clear Processes", "Fair Resolution", "Quick Turnaround"]
                }
              ].map((feature, index) => (
                <Card key={index} className="border-border hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="p-3 bg-gold/10 rounded-lg">{feature.icon}</div>
                      <div>
                        <h3 className="text-2xl font-bold text-primary mb-2">{feature.title}</h3>
                      </div>
                    </div>
                    <p className="text-foreground mb-6">{feature.description}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {feature.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-gold flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-navy text-background">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
            
            <div className="max-w-5xl mx-auto space-y-6">
              {[
                {
                  step: 1,
                  title: "Register & Verify",
                  description: "Create your account and complete KYC verification. Our team reviews your documentation to ensure platform integrity."
                },
                {
                  step: 2,
                  title: "Browse Listings",
                  description: "Access real-time listings from verified sellers worldwide. Filter by product type, quantity, location, and price."
                },
                {
                  step: 3,
                  title: "Negotiate & Order",
                  description: "Communicate directly with counterparties, negotiate terms, and place your order with confidence."
                },
                {
                  step: 4,
                  title: "Secure Payment",
                  description: "Funds are held in secure escrow until delivery is confirmed, protecting both buyer and seller."
                },
                {
                  step: 5,
                  title: "Track & Receive",
                  description: "Monitor your shipment in real-time through our tracking dashboard. Confirm delivery to release payment."
                }
              ].map((step) => (
                <Card key={step.step} className="bg-navy-light border-gold/20">
                  <CardContent className="p-6 flex items-start space-x-6">
                    <div className="w-14 h-14 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold text-navy">{step.step}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-gold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground text-lg">{step.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-primary text-center mb-12">Platform Benefits</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="border-border">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-primary mb-4">For Sellers</h3>
                    <ul className="space-y-3">
                      {[
                        "Access global buyer network",
                        "Competitive pricing transparency",
                        "Secure payment guarantee",
                        "Reduced intermediary costs",
                        "Real-time market visibility"
                      ].map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-gold mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-primary mb-4">For Buyers</h3>
                    <ul className="space-y-3">
                      {[
                        "Verified supplier network",
                        "Best market prices",
                        "Payment protection",
                        "Quality assurance",
                        "Simplified procurement"
                      ].map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-gold mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-navy via-navy-light to-navy text-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Energy Trading?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of verified traders on the world's most advanced P2P energy exchange platform
            </p>
            <Button size="lg" className="bg-gold hover:bg-gold-light text-navy font-semibold">
              Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="mt-6 text-sm text-muted-foreground">
              Platform access subject to KYC verification • Available globally
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default P2PPlatform;

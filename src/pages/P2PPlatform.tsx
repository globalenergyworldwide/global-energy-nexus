import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Network, Shield, TrendingUp, Users, Lock, CheckCircle, ArrowRight, ShoppingCart, Package, Clock, AlertCircle, DollarSign } from "lucide-react";
import p2pImage from "@/assets/p2p-trading.jpg";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface Trade {
  id: string;
  product_type: string;
  quantity: number;
  unit: string;
  price_per_unit: number;
  total_amount: number;
  status: string;
  escrow_status: string;
  payment_method: string;
  delivery_location: string | null;
  expected_delivery_date: string | null;
  created_at: string;
}

const P2PPlatform = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [publicListings, setPublicListings] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [tradingTab, setTradingTab] = useState("buy");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPublicListings();
    if (user) {
      fetchUserTrades();
    }
  }, [user]);

  const fetchPublicListings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('trades')
      .select('*')
      .is('buyer_id', null)
      .eq('status', 'pending')
      .order('created_at', { ascending: false });
    
    if (error) {
      toast.error('Failed to load listings');
    } else {
      setPublicListings(data || []);
    }
    setLoading(false);
  };

  const fetchUserTrades = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('trades')
      .select('*')
      .or(`seller_id.eq.${user.id},buyer_id.eq.${user.id}`)
      .order('created_at', { ascending: false });
    
    if (error) {
      toast.error('Failed to load trades');
    } else {
      setTrades(data || []);
    }
  };

  const handleTradeAction = () => {
    if (!user) {
      toast.error('Please login to trade');
      navigate('/auth');
      return;
    }
  };

  const statusIcons = {
    pending: <Clock className="h-4 w-4" />,
    accepted: <CheckCircle className="h-4 w-4" />,
    in_progress: <Package className="h-4 w-4" />,
    completed: <CheckCircle className="h-4 w-4" />,
    cancelled: <AlertCircle className="h-4 w-4" />,
    disputed: <AlertCircle className="h-4 w-4" />
  };

  const paymentMethods = {
    usdt: { name: 'USDT (Crypto)', icon: <DollarSign className="h-4 w-4" />, available: true },
    wire_transfer: { name: 'Wire Transfer', icon: <Lock className="h-4 w-4" />, available: false },
    bank_transfer: { name: 'Bank Transfer', icon: <Lock className="h-4 w-4" />, available: false }
  };

  const sampleChecklist = {
    seller: [
      { id: '1', label: 'Product quality certification uploaded', completed: false },
      { id: '2', label: 'Export documentation prepared', completed: false },
      { id: '3', label: 'Shipping arrangements confirmed', completed: false },
      { id: '4', label: 'Insurance documents submitted', completed: false },
      { id: '5', label: 'Loading port confirmed', completed: false }
    ],
    buyer: [
      { id: '1', label: 'Payment transferred to escrow', completed: false },
      { id: '2', label: 'Import permits obtained', completed: false },
      { id: '3', label: 'Destination port confirmed', completed: false },
      { id: '4', label: 'Receiving facilities ready', completed: false },
      { id: '5', label: 'Quality inspection arranged', completed: false }
    ]
  };

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

        {/* Main Tabs */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="overview">Platform Overview</TabsTrigger>
                <TabsTrigger value="dashboard">Trading Dashboard</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="space-y-16">
                  {/* Platform Overview */}
                  <div>
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

                  {/* Key Features */}
                  <div className="bg-muted py-16 -mx-4 px-4 rounded-lg">
                    <div className="container mx-auto">
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
                  </div>

                  {/* How It Works */}
                  <div className="bg-navy text-background py-16 -mx-4 px-4 rounded-lg">
                    <div className="container mx-auto">
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
                  </div>

                  {/* Benefits */}
                  <div>
                    <div className="container mx-auto">
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
                  </div>

                  {/* CTA */}
                  <div className="bg-gradient-to-br from-navy via-navy-light to-navy text-background py-16 -mx-4 px-4 rounded-lg">
                    <div className="container mx-auto text-center">
                      <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Ready to Transform Your Energy Trading?
                      </h2>
                      <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Join thousands of verified traders on the world's most advanced P2P energy exchange platform
                      </p>
                      <Button size="lg" className="bg-gold hover:bg-gold-light text-navy font-semibold" onClick={() => setActiveTab("dashboard")}>
                        Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                      <p className="mt-6 text-sm text-muted-foreground">
                        Platform access subject to KYC verification • Available globally
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="dashboard">
                {/* Trading Dashboard */}
                <Card className="mb-8">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="h-16 w-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3">
                          <DollarSign className="h-8 w-8 text-gold" />
                        </div>
                        <h3 className="font-semibold mb-2">USDT Payments</h3>
                        <p className="text-sm text-muted-foreground">Primary payment method - Fast & secure crypto payments</p>
                        <Badge variant="default" className="mt-2">Available Now</Badge>
                      </div>
                      <div className="text-center">
                        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                          <Lock className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="font-semibold mb-2">Wire Transfer</h3>
                        <p className="text-sm text-muted-foreground">International wire transfers for large transactions</p>
                        <Badge variant="secondary" className="mt-2">Coming Soon</Badge>
                      </div>
                      <div className="text-center">
                        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                          <Lock className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="font-semibold mb-2">Bank Transfer</h3>
                        <p className="text-sm text-muted-foreground">Direct bank-to-bank transfers</p>
                        <Badge variant="secondary" className="mt-2">Coming Soon</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Tabs value={tradingTab} onValueChange={setTradingTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="buy">Buy</TabsTrigger>
                    <TabsTrigger value="sell">Sell</TabsTrigger>
                    <TabsTrigger value="my-trades">My Trades</TabsTrigger>
                  </TabsList>

                  <TabsContent value="buy" className="mt-6">
                    {loading ? (
                      <div className="text-center py-12">Loading listings...</div>
                    ) : publicListings.length === 0 ? (
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center py-12">
                            <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">No Available Listings</h3>
                            <p className="text-muted-foreground">Check back soon for new trading opportunities</p>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {publicListings.map((listing) => (
                          <Card key={listing.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                              <div className="flex justify-between items-start">
                                <div>
                                  <CardTitle className="text-lg">{listing.product_type}</CardTitle>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {listing.quantity} {listing.unit}
                                  </p>
                                </div>
                                <Badge variant="default">
                                  <TrendingUp className="h-3 w-3 mr-1" />
                                  Available
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div className="flex justify-between items-center py-2 border-b">
                                  <span className="text-sm text-muted-foreground">Price per {listing.unit}</span>
                                  <span className="font-semibold text-gold">${listing.price_per_unit.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b">
                                  <span className="text-sm text-muted-foreground">Total Amount</span>
                                  <span className="text-xl font-bold text-gold">${listing.total_amount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                  <span className="text-sm text-muted-foreground">Payment</span>
                                  <Badge variant="secondary">
                                    {paymentMethods[listing.payment_method as keyof typeof paymentMethods].name}
                                  </Badge>
                                </div>
                                {listing.delivery_location && (
                                  <div className="flex justify-between items-center py-2">
                                    <span className="text-sm text-muted-foreground">Location</span>
                                    <span className="text-sm">{listing.delivery_location}</span>
                                  </div>
                                )}
                              </div>
                              <div className="flex gap-2 mt-6">
                                <Button variant="outline" className="flex-1" onClick={handleTradeAction}>
                                  View Details
                                </Button>
                                <Button className="flex-1" onClick={handleTradeAction}>
                                  <ShoppingCart className="h-4 w-4 mr-2" />
                                  Trade Now
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="sell" className="mt-6">
                    <Card>
                      <CardContent className="pt-6">
                        {!user ? (
                          <div className="text-center py-12">
                            <Lock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Login Required</h3>
                            <p className="text-muted-foreground mb-6">Please login to create listings</p>
                            <Button onClick={() => navigate('/auth')}>Login to Sell</Button>
                          </div>
                        ) : (
                          <div className="text-center py-12">
                            <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Create a Listing</h3>
                            <p className="text-muted-foreground mb-6">List your products for global buyers</p>
                            <Button disabled>Create Listing (Coming Soon)</Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="my-trades" className="mt-6">
                    {!user ? (
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center py-12">
                            <Lock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Login Required</h3>
                            <p className="text-muted-foreground mb-6">Please login to view your trades</p>
                            <Button onClick={() => navigate('/auth')}>Login</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ) : trades.length === 0 ? (
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center py-12">
                            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">No Active Trades</h3>
                            <p className="text-muted-foreground">Start trading to see your transactions here</p>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="space-y-6">
                        {trades.map((trade) => (
                          <Card key={trade.id}>
                            <CardHeader>
                              <div className="flex justify-between items-start">
                                <div>
                                  <CardTitle>{trade.product_type}</CardTitle>
                                  <p className="text-sm text-muted-foreground">
                                    {trade.quantity} {trade.unit} @ ${trade.price_per_unit}/{trade.unit}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <Badge variant={trade.status === 'completed' ? 'default' : 'secondary'}>
                                    {statusIcons[trade.status as keyof typeof statusIcons]}
                                    <span className="ml-2">{trade.status}</span>
                                  </Badge>
                                  <p className="text-sm text-muted-foreground mt-2">
                                    Escrow: {trade.escrow_status}
                                  </p>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <h4 className="font-semibold mb-3">Seller Checklist</h4>
                                  <div className="space-y-2">
                                    {sampleChecklist.seller.map((item) => (
                                      <div key={item.id} className="flex items-start space-x-2">
                                        <Checkbox checked={item.completed} disabled />
                                        <label className="text-sm">{item.label}</label>
                                      </div>
                                    ))}
                                  </div>
                                  <Progress value={20} className="mt-4" />
                                  <p className="text-sm text-muted-foreground mt-2">1 of 5 completed</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-3">Buyer Checklist</h4>
                                  <div className="space-y-2">
                                    {sampleChecklist.buyer.map((item) => (
                                      <div key={item.id} className="flex items-start space-x-2">
                                        <Checkbox checked={item.completed} disabled />
                                        <label className="text-sm">{item.label}</label>
                                      </div>
                                    ))}
                                  </div>
                                  <Progress value={0} className="mt-4" />
                                  <p className="text-sm text-muted-foreground mt-2">0 of 5 completed</p>
                                </div>
                              </div>
                              <div className="mt-6 pt-6 border-t flex justify-between items-center">
                                <div>
                                  <p className="text-sm text-muted-foreground">Total Amount</p>
                                  <p className="text-2xl font-bold text-gold">${trade.total_amount.toLocaleString()}</p>
                                  <p className="text-sm text-muted-foreground">
                                    Payment: {paymentMethods[trade.payment_method as keyof typeof paymentMethods].name}
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  <Button variant="outline" disabled>View Details</Button>
                                  <Button disabled>Update Progress</Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default P2PPlatform;
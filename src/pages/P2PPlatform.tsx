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
import TradeDialog from "@/components/TradeDialog";

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
  const [activeTab, setActiveTab] = useState("dashboard");
  const [tradingTab, setTradingTab] = useState("buy");
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);
  const [tradeDialogOpen, setTradeDialogOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    activeListings: 89,
    totalVolume: "3.2M",
    verifiedTraders: 267,
    globalPorts: 178
  });

  // Fluctuate numbers to simulate real-time activity
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        activeListings: 89 + Math.floor(Math.random() * 5) - 2, // 87-93
        totalVolume: (3.2 + (Math.random() * 0.3 - 0.15)).toFixed(1) + "M", // 3.05-3.35M
        verifiedTraders: 267 + Math.floor(Math.random() * 7) - 3, // 264-273
        globalPorts: 178 + Math.floor(Math.random() * 4) - 2 // 176-181
      }));
    }, 4000); // Update every 4 seconds

    return () => clearInterval(interval);
  }, []);

  // Mock data for demonstration
  const mockTrades: any[] = [
    { id: '1', product_type: 'Crude Oil - Brent', quantity: 50000, unit: 'barrels', price_per_unit: 85.40, total_amount: 4270000, delivery_location: 'Rotterdam Port, Netherlands', expected_delivery_date: '2024-02-15', status: 'pending', escrow_status: 'available', created_at: new Date().toISOString() },
    { id: '2', product_type: 'Diesel - Ultra Low Sulfur', quantity: 75000, unit: 'barrels', price_per_unit: 92.15, total_amount: 6911250, delivery_location: 'Singapore Port', expected_delivery_date: '2024-02-20', status: 'pending', escrow_status: 'available', created_at: new Date().toISOString() },
    { id: '3', product_type: 'Jet Fuel - A1', quantity: 30000, unit: 'barrels', price_per_unit: 98.50, total_amount: 2955000, delivery_location: 'Dubai International Airport', expected_delivery_date: '2024-02-18', status: 'pending', escrow_status: 'available', created_at: new Date().toISOString() },
    { id: '4', product_type: 'LPG - Propane Mix', quantity: 25000, unit: 'tons', price_per_unit: 680, total_amount: 17000000, delivery_location: 'Tokyo Bay, Japan', expected_delivery_date: '2024-02-25', status: 'pending', escrow_status: 'available', created_at: new Date().toISOString() },
    { id: '5', product_type: 'Crude Oil - WTI', quantity: 100000, unit: 'barrels', price_per_unit: 82.30, total_amount: 8230000, delivery_location: 'Houston Port, USA', expected_delivery_date: '2024-02-12', status: 'pending', escrow_status: 'available', created_at: new Date().toISOString() },
    { id: '6', product_type: 'Heating Oil', quantity: 40000, unit: 'barrels', price_per_unit: 88.75, total_amount: 3550000, delivery_location: 'New York Harbor, USA', expected_delivery_date: '2024-02-22', status: 'pending', escrow_status: 'available', created_at: new Date().toISOString() },
    { id: '7', product_type: 'Crude Oil - Dubai', quantity: 60000, unit: 'barrels', price_per_unit: 84.20, total_amount: 5052000, delivery_location: 'Jebel Ali Port, UAE', expected_delivery_date: '2024-02-28', status: 'pending', escrow_status: 'available', created_at: new Date().toISOString() },
    { id: '8', product_type: 'Marine Fuel Oil', quantity: 20000, unit: 'tons', price_per_unit: 520, total_amount: 10400000, delivery_location: 'Antwerp Port, Belgium', expected_delivery_date: '2024-02-17', status: 'pending', escrow_status: 'available', created_at: new Date().toISOString() },
    { id: '9', product_type: 'Gasoline - Premium 93', quantity: 50000, unit: 'barrels', price_per_unit: 95.60, total_amount: 4780000, delivery_location: 'Mumbai Port, India', expected_delivery_date: '2024-02-19', status: 'pending', escrow_status: 'available', created_at: new Date().toISOString() },
    { id: '10', product_type: 'Diesel - B20 Blend', quantity: 35000, unit: 'barrels', price_per_unit: 89.40, total_amount: 3129000, delivery_location: 'Santos Port, Brazil', expected_delivery_date: '2024-02-21', status: 'pending', escrow_status: 'available', created_at: new Date().toISOString() },
    { id: '11', product_type: 'Crude Oil - Oman', quantity: 80000, unit: 'barrels', price_per_unit: 83.90, total_amount: 6712000, delivery_location: 'Port of Sohar, Oman', expected_delivery_date: '2024-02-16', status: 'pending', escrow_status: 'available', created_at: new Date().toISOString() },
    { id: '12', product_type: 'Jet Fuel - JP-8', quantity: 25000, unit: 'barrels', price_per_unit: 99.80, total_amount: 2495000, delivery_location: 'Seoul Incheon Airport', expected_delivery_date: '2024-02-24', status: 'pending', escrow_status: 'available', created_at: new Date().toISOString() },
    { id: '13', product_type: 'LNG - Liquefied Natural Gas', quantity: 15000, unit: 'tons', price_per_unit: 1250, total_amount: 18750000, delivery_location: 'Yokohama Port, Japan', expected_delivery_date: '2024-03-01', status: 'pending', escrow_status: 'available', created_at: new Date().toISOString() },
    { id: '14', product_type: 'Crude Oil - Bonny Light', quantity: 70000, unit: 'barrels', price_per_unit: 86.50, total_amount: 6055000, delivery_location: 'Lagos Port, Nigeria', expected_delivery_date: '2024-02-23', status: 'pending', escrow_status: 'available', created_at: new Date().toISOString() },
    { id: '15', product_type: 'Kerosene', quantity: 30000, unit: 'barrels', price_per_unit: 91.20, total_amount: 2736000, delivery_location: 'Cape Town Port, South Africa', expected_delivery_date: '2024-02-26', status: 'pending', escrow_status: 'available', created_at: new Date().toISOString() },
    { id: '16', product_type: 'Crude Oil - Urals', quantity: 90000, unit: 'barrels', price_per_unit: 81.70, total_amount: 7353000, delivery_location: 'Novorossiysk Port, Russia', expected_delivery_date: '2024-02-14', status: 'pending', escrow_status: 'available', created_at: new Date().toISOString() },
    { id: '17', product_type: 'Naphtha', quantity: 45000, unit: 'barrels', price_per_unit: 87.30, total_amount: 3928500, delivery_location: 'Busan Port, South Korea', expected_delivery_date: '2024-02-27', status: 'pending', escrow_status: 'available', created_at: new Date().toISOString() },
    { id: '18', product_type: 'Bitumen', quantity: 10000, unit: 'tons', price_per_unit: 420, total_amount: 4200000, delivery_location: 'Alexandria Port, Egypt', expected_delivery_date: '2024-03-02', status: 'pending', escrow_status: 'available', created_at: new Date().toISOString() },
    { id: '19', product_type: 'Crude Oil - Maya', quantity: 65000, unit: 'barrels', price_per_unit: 79.80, total_amount: 5187000, delivery_location: 'Veracruz Port, Mexico', expected_delivery_date: '2024-02-20', status: 'pending', escrow_status: 'available', created_at: new Date().toISOString() },
    { id: '20', product_type: 'Gasoline - Regular 87', quantity: 55000, unit: 'barrels', price_per_unit: 90.25, total_amount: 4963750, delivery_location: 'Los Angeles Port, USA', expected_delivery_date: '2024-02-25', status: 'pending', escrow_status: 'available', created_at: new Date().toISOString() }
  ];

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
      setPublicListings(mockTrades);
    } else {
      // Use mock data if no real listings, otherwise use real data
      setPublicListings(data && data.length > 0 ? data : mockTrades);
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

  const handleTradeAction = (trade: Trade) => {
    if (!user) {
      toast.error('Please login to trade');
      navigate('/auth');
      return;
    }
    setSelectedTrade(trade);
    setTradeDialogOpen(true);
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-4">
              Global Oil P2P Marketplace
            </h1>
            <p className="text-xl md:text-2xl text-background/90 font-semibold mb-2">
              Simple, Secure & Built for Everyone
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A smart and modern system that connects verified buyers and sellers from different parts of the world
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
                      <h2 className="text-4xl font-bold text-primary mb-6">Welcome to Our International P2P Oil Trading Platform</h2>
                      <p className="text-lg text-foreground mb-6">
                        A smart and modern system that connects verified buyers and sellers from different parts of the world. Whether you deal in crude oil, refined products, LPG, lubricants, or specialized petroleum commodities, our platform makes global trading easy, transparent, and secure.
                      </p>
                      <p className="text-lg text-foreground font-semibold">
                        Here's how the system works:
                      </p>
                    </div>

                    {/* Quick Overview Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                      {[
                        {
                          icon: <Shield className="h-10 w-10 text-gold" />,
                          title: "Verified Traders",
                          description: "Strict identity verification for all users"
                        },
                        {
                          icon: <Lock className="h-10 w-10 text-gold" />,
                          title: "Secure Escrow",
                          description: "Protected transactions with escrow guarantee"
                        },
                        {
                          icon: <Network className="h-10 w-10 text-gold" />,
                          title: "Global Reach",
                          description: "Trade across continents and major ports"
                        }
                      ].map((item, index) => (
                        <Card key={index} className="border-border hover:shadow-lg transition-shadow">
                          <CardContent className="p-6 text-center">
                            <div className="flex justify-center mb-4">{item.icon}</div>
                            <h3 className="text-xl font-semibold text-primary mb-3">{item.title}</h3>
                            <p className="text-muted-foreground">{item.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* 7 Key Features */}
                  <div className="bg-muted py-16 -mx-4 px-4 rounded-lg">
                    <div className="container mx-auto">
                      <h2 className="text-4xl font-bold text-primary text-center mb-12">How Our P2P System Works</h2>
                      
                      <div className="space-y-8">
                        {[
                          {
                            number: "1",
                            icon: <Shield className="h-10 w-10 text-gold" />,
                            title: "Verified Global Users Only",
                            description: "Every trader on the platform goes through a strict identity and business verification process. This ensures that buyers and sellers are real, trusted, and compliant with international trade standards.",
                            features: ["Identity verification", "Business documentation", "Compliance checks", "Ongoing monitoring"]
                          },
                          {
                            number: "2",
                            icon: <ShoppingCart className="h-10 w-10 text-gold" />,
                            title: "Post Offers or Browse Deals",
                            description: "Just like a marketplace, registered users can post their own offers or browse offers from sellers worldwide. Full control over trading partners and pricing.",
                            features: ["Post product offers", "Browse global listings", "Filter by location & specs", "Compare prices"]
                          },
                          {
                            number: "3",
                            icon: <Network className="h-10 w-10 text-gold" />,
                            title: "Smart P2P Matching System",
                            description: "Our system instantly matches buyers and sellers based on product availability, payment methods, port locations, quality specifications, and order size.",
                            features: ["Intelligent matching", "Product availability", "Payment preferences", "Location optimization"]
                          },
                          {
                            number: "4",
                            icon: <Lock className="h-10 w-10 text-gold" />,
                            title: "Secure Escrow Protection",
                            description: "We use an escrow-style trade guarantee where sellers lock in product availability and buyers secure funds through the platform. Product or documentation is released only when both sides meet all conditions.",
                            features: ["Escrow protection", "Funds security", "Delivery confirmation", "Fraud elimination"]
                          },
                          {
                            number: "5",
                            icon: <Users className="h-10 w-10 text-gold" />,
                            title: "Real-Time Communication Hub",
                            description: "A built-in messaging and call feature allows traders to negotiate terms, clarify product specs, share documents safely, and stay updated throughout the transaction.",
                            features: ["Encrypted messaging", "Document sharing", "Price negotiation", "Real-time updates"]
                          },
                          {
                            number: "6",
                            icon: <CheckCircle className="h-10 w-10 text-gold" />,
                            title: "Trade Completion & Ratings",
                            description: "Once delivery and payment are completed, both parties rate each other. A transparent reputation score is added to their profile, building trust and long-term trading relationships.",
                            features: ["Mutual ratings", "Reputation scores", "Trust building", "Performance tracking"]
                          },
                          {
                            number: "7",
                            icon: <TrendingUp className="h-10 w-10 text-gold" />,
                            title: "Global Coverage Across Ports & Terminals",
                            description: "Our P2P platform supports trades across Africa, Middle East, Europe, Asia, and the Americas. From major crude terminals to small regional depots, traders can connect seamlessly.",
                            features: ["Worldwide coverage", "Major ports", "Regional depots", "Cross-border trades"]
                          }
                        ].map((feature, index) => (
                          <Card key={index} className="border-border hover:shadow-lg transition-shadow">
                            <CardContent className="p-8">
                              <div className="flex items-start space-x-6">
                                <div className="flex-shrink-0">
                                  <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mb-4">
                                    <span className="text-2xl font-bold text-gold">{feature.number}</span>
                                  </div>
                                  <div className="p-3 bg-gold/10 rounded-lg inline-block">{feature.icon}</div>
                                </div>
                                <div className="flex-1">
                                  <h3 className="text-2xl font-bold text-primary mb-3">{feature.title}</h3>
                                  <p className="text-foreground mb-6">{feature.description}</p>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {feature.features.map((item, i) => (
                                      <div key={i} className="flex items-center space-x-2">
                                        <CheckCircle className="h-4 w-4 text-gold flex-shrink-0" />
                                        <span className="text-sm text-muted-foreground">{item}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Why Traders Love Our System */}
                  <div className="bg-navy text-background py-16 -mx-4 px-4 rounded-lg">
                    <div className="container mx-auto">
                      <h2 className="text-4xl font-bold text-center mb-12">🌟 Why Traders Love Our P2P System</h2>
                      
                      <div className="max-w-5xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {[
                            { title: "No intermediaries", icon: <Users className="h-8 w-8" /> },
                            { title: "Lower trading costs", icon: <DollarSign className="h-8 w-8" /> },
                            { title: "Direct global access", icon: <Network className="h-8 w-8" /> },
                            { title: "Fast negotiation", icon: <Clock className="h-8 w-8" /> },
                            { title: "Secure transactions", icon: <Shield className="h-8 w-8" /> },
                            { title: "Transparent verification", icon: <CheckCircle className="h-8 w-8" /> },
                          ].map((benefit, index) => (
                            <Card key={index} className="bg-navy-light border-gold/20 hover:border-gold/40 transition-colors">
                              <CardContent className="p-6 text-center">
                                <div className="flex justify-center mb-4 text-gold">{benefit.icon}</div>
                                <h3 className="text-lg font-semibold text-background">{benefit.title}</h3>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                        
                        <Card className="mt-8 bg-gold/10 border-gold/30">
                          <CardContent className="p-8 text-center">
                            <p className="text-xl font-semibold text-background">
                              Smart matching similar to top crypto P2P systems—adapted for the oil world
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>

                  {/* Product Types Supported */}
                  <div>
                    <div className="container mx-auto">
                      <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold text-primary text-center mb-12">Supported Products</h2>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {[
                            "Crude Oil",
                            "Refined Products",
                            "LPG",
                            "Diesel",
                            "Gasoline",
                            "Jet Fuel",
                            "Lubricants",
                            "Petroleum Commodities"
                          ].map((product, i) => (
                            <Card key={i} className="border-border hover:shadow-md transition-shadow">
                              <CardContent className="p-4 text-center">
                                <Package className="h-6 w-6 text-gold mx-auto mb-2" />
                                <span className="text-sm font-medium text-foreground">{product}</span>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="bg-gradient-to-br from-navy via-navy-light to-navy text-background py-16 -mx-4 px-4 rounded-lg">
                    <div className="container mx-auto text-center">
                      <h2 className="text-4xl md:text-5xl font-bold mb-6">🔥 The Future of Oil Trading Is Peer-to-Peer</h2>
                      <p className="text-xl mb-8 max-w-3xl mx-auto text-muted-foreground">
                        We bring the speed, simplicity and transparency of digital marketplaces into the global oil industry — while maintaining the highest level of security and compliance.
                      </p>
                      <Button 
                        size="lg" 
                        className="bg-gold hover:bg-gold/90 text-navy font-semibold text-lg px-8 py-6"
                        onClick={() => setActiveTab("dashboard")}
                      >
                        Start Trading Today
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                      <p className="mt-6 text-sm text-muted-foreground">
                        Platform access subject to KYC verification • Available globally
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="dashboard">
                {/* Title */}
                <div className="mb-8 text-center">
                  <h2 className="text-4xl font-bold text-primary mb-3">Trading Dashboard</h2>
                  <p className="text-lg text-muted-foreground">Live global oil marketplace with verified traders</p>
                </div>

                {/* Live Market Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  <Card className="border-border bg-card animate-fade-in hover-scale">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">Active Listings</p>
                          <p className="text-2xl font-bold text-primary">{stats.activeListings}</p>
                          <Badge variant="secondary" className="mt-1 text-xs">
                            <span className="relative flex h-2 w-2 mr-1">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
                            </span>
                            Live
                          </Badge>
                        </div>
                        <Package className="h-8 w-8 text-gold" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-border bg-card animate-fade-in hover-scale" style={{ animationDelay: '0.1s' }}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">Total Volume</p>
                          <p className="text-2xl font-bold text-primary">{stats.totalVolume}</p>
                          <p className="text-xs text-gold">barrels/MT</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-gold" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-border bg-card animate-fade-in hover-scale" style={{ animationDelay: '0.2s' }}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">Verified Traders</p>
                          <p className="text-2xl font-bold text-primary">{stats.verifiedTraders}</p>
                          <Badge variant="outline" className="mt-1 text-xs bg-gold/10 border-gold/30">
                            <Shield className="h-3 w-3 mr-1" />
                            KYC Verified
                          </Badge>
                        </div>
                        <Shield className="h-8 w-8 text-gold" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-border bg-card animate-fade-in hover-scale" style={{ animationDelay: '0.3s' }}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">Global Ports</p>
                          <p className="text-2xl font-bold text-primary">{stats.globalPorts}</p>
                          <p className="text-xs text-muted-foreground">5 continents</p>
                        </div>
                        <Network className="h-8 w-8 text-gold" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Live Market Offers Header */}
                <div className="mb-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-primary flex items-center gap-2">
                        Live Market Offers
                        <Badge variant="secondary" className="animate-pulse">
                          <span className="relative flex h-2 w-2 mr-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
                          </span>
                          Live
                        </Badge>
                      </h3>
                      <p className="text-sm text-muted-foreground">Real-time listings from verified sellers worldwide</p>
                    </div>
                  </div>
                  
                  {/* Payment Methods Info */}
                  <Card className="bg-muted/50 border-border">
                    <CardContent className="p-4">
                      <div className="flex flex-wrap items-center gap-6 justify-center">
                        <div className="flex items-center gap-2">
                          <div className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center">
                            <DollarSign className="h-5 w-5 text-gold" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Primary Payment</p>
                            <p className="font-semibold text-sm">USDT Crypto</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center">
                            <Lock className="h-5 w-5 text-gold" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Security</p>
                            <p className="font-semibold text-sm">Escrow Protected</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center">
                            <Shield className="h-5 w-5 text-gold" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">All Sellers</p>
                            <p className="font-semibold text-sm">KYC Verified</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading live market data...</p>
                  </div>
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
                  <div className="grid gap-4">
                    {publicListings.map((listing, index) => (
                      <Card key={listing.id} className="border-border hover:shadow-lg transition-all hover-scale animate-fade-in group" style={{ animationDelay: `${index * 0.05}s` }}>
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1 space-y-3">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h4 className="text-xl font-bold text-primary">{listing.product_type}</h4>
                                    <Badge variant="outline" className="bg-gold/10 text-gold border-gold/30 animate-fade-in">
                                      <Shield className="h-3 w-3 mr-1" />
                                      Verified
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge variant="secondary" className="text-xs">
                                      <Lock className="h-3 w-3 mr-1" />
                                      Escrow Protected
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                      <Clock className="h-3 w-3 mr-1" />
                                      {listing.expected_delivery_date 
                                        ? `Delivery ${new Date(listing.expected_delivery_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                                        : 'Delivery TBD'}
                                    </Badge>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-3xl font-bold text-gold">${listing.price_per_unit.toFixed(2)}</p>
                                  <p className="text-xs text-muted-foreground">per {listing.unit}</p>
                                  <Badge variant="secondary" className="mt-1 text-xs">USDT</Badge>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Available Quantity</p>
                                  <p className="font-bold text-foreground text-lg">{listing.quantity.toLocaleString()} {listing.unit}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Total Value</p>
                                  <p className="font-bold text-foreground text-lg">${listing.total_amount.toLocaleString()}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground mb-1">Delivery Port</p>
                                  <p className="font-bold text-foreground text-sm">{listing.delivery_location || 'International'}</p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-col gap-2 min-w-[140px]">
                              <Button 
                                onClick={() => handleTradeAction(listing)} 
                                className="bg-gold hover:bg-gold/90 text-navy font-bold group-hover:scale-105 transition-transform"
                                size="lg"
                              >
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Buy Now
                              </Button>
                              <Button variant="outline" size="sm" className="font-semibold">
                                Contact Seller
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Additional Tabs */}
                <Card className="mt-8">
                  <CardContent className="p-6">
                    <Tabs value={tradingTab} onValueChange={setTradingTab} className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="sell">Create Listing</TabsTrigger>
                        <TabsTrigger value="my-trades">My Trades</TabsTrigger>
                      </TabsList>

                      <TabsContent value="sell" className="mt-6">
                        {!user ? (
                          <div className="text-center py-12">
                            <Lock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Login Required</h3>
                            <p className="text-muted-foreground mb-6">Please login to create listings</p>
                            <Button onClick={() => navigate('/auth')} className="bg-gold hover:bg-gold/90 text-navy">
                              Login to Sell
                            </Button>
                          </div>
                        ) : (
                          <div className="text-center py-12">
                            <TrendingUp className="h-16 w-16 text-gold mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Create Your Listing</h3>
                            <p className="text-muted-foreground mb-6">List your oil products for verified buyers worldwide</p>
                            <Button disabled className="bg-muted">Create Listing (Coming Soon)</Button>
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent value="my-trades" className="mt-6">
                        {!user ? (
                          <div className="text-center py-12">
                            <Lock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Login Required</h3>
                            <p className="text-muted-foreground mb-6">Please login to view your trades</p>
                            <Button onClick={() => navigate('/auth')} className="bg-gold hover:bg-gold/90 text-navy">
                              Login
                            </Button>
                          </div>
                        ) : trades.length === 0 ? (
                          <div className="text-center py-12">
                            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">No Active Trades</h3>
                            <p className="text-muted-foreground">Start trading to see your transactions here</p>
                          </div>
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
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
      
      <Footer />

      <TradeDialog
        open={tradeDialogOpen}
        onOpenChange={setTradeDialogOpen}
        trade={selectedTrade}
        userId={user?.id || ""}
      />
    </div>
  );
};

export default P2PPlatform;